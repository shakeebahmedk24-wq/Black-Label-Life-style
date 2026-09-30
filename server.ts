import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { handleChatApi } from './src/chatbot/serverChatHandler.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

/**
 * Accurately maps any clean or decorated URL path to its corresponding HTML file.
 */
function resolveHtmlPath(baseDir: string, rawUrl: string): string {
  const pathname = rawUrl.split('?')[0].split('#')[0];
  const clean = pathname.replace(/^\/|\/$/g, '');

  if (!clean || clean === '') {
    return path.join(baseDir, 'index.html');
  }

  // Check if requested with .html
  if (clean.endsWith('.html')) {
    const directFile = path.join(baseDir, clean);
    if (fs.existsSync(directFile)) return directFile;
  }

  // Check clean directory containing index.html (e.g. "social" -> "social/index.html")
  const dirIndex = path.join(baseDir, clean, 'index.html');
  if (fs.existsSync(dirIndex)) return dirIndex;

  // Check direct .html file (e.g. "404" -> "404.html")
  const directHtml = path.join(baseDir, `${clean}.html`);
  if (fs.existsSync(directHtml)) return directHtml;

  // Handle nested index.html (e.g. "social/index.html")
  const cleanNoIndex = clean.replace(/\/index\.html$/, '');
  const dirIndex2 = path.join(baseDir, cleanNoIndex, 'index.html');
  if (fs.existsSync(dirIndex2)) return dirIndex2;

  // Fallback to 404.html if available, else index.html
  const notFound = path.join(baseDir, '404.html');
  if (fs.existsSync(notFound)) return notFound;

  return path.join(baseDir, 'index.html');
}

async function startServer() {
  const app = express();

  // Parse JSON bodies for API requests
  app.use(express.json());

  // AI Chat streaming endpoint
  app.post('/api/chat', (req, res) => {
    handleChatApi(req, res);
  });

  if (!isProduction) {
    // Development mode: mount Vite middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    // Development HTML serving with Vite transformIndexHtml
    app.use('*', async (req, res, next) => {
      // Don't intercept API routes or Vite internal/asset requests
      if (
        req.originalUrl.startsWith('/api/') ||
        req.originalUrl.startsWith('/@') ||
        req.originalUrl.startsWith('/node_modules/') ||
        req.originalUrl.startsWith('/src/') ||
        /\.[a-zA-Z0-9]+$/.test(req.path.replace(/\.html$/, ''))
      ) {
        return next();
      }

      const url = req.originalUrl;
      try {
        const templatePath = resolveHtmlPath(__dirname, url);

        if (fs.existsSync(templatePath)) {
          let template = fs.readFileSync(templatePath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(templatePath.endsWith('404.html') ? 404 : 200).set({ 'Content-Type': 'text/html' }).end(template);
          return;
        }

        next();
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Production mode: serve built static files from dist
    const distPath = path.resolve(__dirname, 'dist');

    // Static asset serving
    app.use(express.static(distPath, { index: false }));

    // Handle clean URLs for MPA routes
    app.get('*', (req, res) => {
      const filePath = resolveHtmlPath(distPath, req.originalUrl);
      if (fs.existsSync(filePath)) {
        return res.status(filePath.endsWith('404.html') ? 404 : 200).sendFile(filePath);
      }
      return res.status(404).send('Not Found');
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Black Label server listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
