import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

const mpaRoutes = [
  'social',
  'entertainment',
  'trading',
  'lifestyle',
  'design',
  'business-services',
  'investments',
  'luxury',
  'concierge',
  'contact',
  'admin',
];

function mpaCleanUrlsPlugin(): Plugin {
  return {
    name: 'mpa-clean-urls',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const pathname = req.url.split('?')[0];

        for (const route of mpaRoutes) {
          if (pathname === `/${route}` || pathname === `/${route}/`) {
            const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
            req.url = `/${route}/index.html${query}`;
            return next();
          }
        }

        if (pathname === '/404' || pathname === '/404/') {
          const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
          req.url = `/404.html${query}`;
          return next();
        }

        next();
      });
    },
  };
}

function apiChatPlugin(): Plugin {
  return {
    name: 'api-chat-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/chat')) {
          const { handleChatApi } = await import('./src/chatbot/serverChatHandler.ts');
          return handleChatApi(req, res);
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mpaCleanUrlsPlugin(), apiChatPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          social: path.resolve(__dirname, 'social/index.html'),
          entertainment: path.resolve(__dirname, 'entertainment/index.html'),
          trading: path.resolve(__dirname, 'trading/index.html'),
          lifestyle: path.resolve(__dirname, 'lifestyle/index.html'),
          design: path.resolve(__dirname, 'design/index.html'),
          businessServices: path.resolve(__dirname, 'business-services/index.html'),
          investments: path.resolve(__dirname, 'investments/index.html'),
          luxury: path.resolve(__dirname, 'luxury/index.html'),
          concierge: path.resolve(__dirname, 'concierge/index.html'),
          contact: path.resolve(__dirname, 'contact/index.html'),
          admin: path.resolve(__dirname, 'admin/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
