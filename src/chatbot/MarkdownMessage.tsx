import React from 'react';

interface MarkdownMessageProps {
  content: string;
}

/**
 * Lightweight, robust Markdown renderer tailored for luxury concierge replies.
 * Handles bold, italics, inline code, lists, internal app links, mailto links, and paragraphs.
 */
export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => {
  if (!content) return null;

  // Split into paragraphs / list blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-2 text-sm leading-relaxed text-[#e6e0d4]">
      {blocks.map((block, blockIdx) => {
        const lines = block.split('\n');

        // Check if block is a bullet list
        const isBulletList = lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '));
        if (isBulletList) {
          return (
            <ul key={blockIdx} className="space-y-1.5 my-1.5 pl-4 list-disc marker:text-[#c5a059]">
              {lines.map((line, lineIdx) => {
                const itemText = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li key={lineIdx} className="text-xs sm:text-sm pl-1">
                    {renderInlineFormattedText(itemText)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Check if block is a numbered list
        const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line.trim()));
        if (isNumberedList) {
          return (
            <ol key={blockIdx} className="space-y-1.5 my-1.5 pl-4 list-decimal marker:text-[#c5a059] marker:font-mono">
              {lines.map((line, lineIdx) => {
                const itemText = line.trim().replace(/^\d+\.\s+/, '');
                return (
                  <li key={lineIdx} className="text-xs sm:text-sm pl-1">
                    {renderInlineFormattedText(itemText)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Normal paragraph (lines joined with <br /> if single newlines exist)
        return (
          <p key={blockIdx} className="text-xs sm:text-sm">
            {lines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {renderInlineFormattedText(line)}
                {lineIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

/**
 * Parses inline elements: links, emails, bold, italics, inline code
 */
function renderInlineFormattedText(text: string): React.ReactNode[] {
  // Regex to detect:
  // 1. Markdown link: [text](url)
  // 2. Bare URL: https?://...
  // 3. Email: [\w.-]+@[\w.-]+\.\w+
  // 4. Bold: \*\*([^*]+)\*\*
  // 5. Italic: \*([^*]+)\* or _([^_]+)_
  // 6. Code: `([^`]+)`
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`)/g;

  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // 1. Markdown link: [text](url)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLinkMatch) {
      const linkText = mdLinkMatch[1];
      const linkUrl = mdLinkMatch[2].trim();
      return renderLink(linkText, linkUrl, idx);
    }

    // 2. Email address
    const emailMatch = part.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (emailMatch) {
      return (
        <a
          key={idx}
          href={`mailto:${part}`}
          className="text-[#c5a059] hover:text-[#dfc182] underline font-medium transition-colors"
        >
          {part}
        </a>
      );
    }

    // 3. Bare URL
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5a059] hover:text-[#dfc182] underline font-medium transition-colors"
        >
          {part}
        </a>
      );
    }

    // 4. Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={idx} className="font-semibold text-[#faf8f5]">
          {boldText}
        </strong>
      );
    }

    // 5. Italic: *text* or _text_
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
    ) {
      const italicText = part.slice(1, -1);
      return (
        <em key={idx} className="italic text-[#dcd6ca]">
          {italicText}
        </em>
      );
    }

    // 6. Inline Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-black/40 text-[#c5a059] font-mono text-[11px] border border-[#c5a059]/20"
        >
          {codeText}
        </code>
      );
    }

    // Plain text
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function renderLink(text: string, url: string, key: number | string) {
  const isInternal = url.startsWith('/') || url.startsWith('#') || url.includes('blacklabel.life');
  const isEmail = url.startsWith('mailto:') || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(url);

  if (isEmail) {
    const mailto = url.startsWith('mailto:') ? url : `mailto:${url}`;
    return (
      <a
        key={key}
        href={mailto}
        className="text-[#c5a059] hover:text-[#dfc182] underline font-medium transition-colors"
      >
        {text}
      </a>
    );
  }

  if (isInternal) {
    // Internal app route
    return (
      <a
        key={key}
        href={url}
        onClick={(e) => {
          // If already on the same origin, navigate directly
          e.preventDefault();
          window.location.href = url;
        }}
        className="text-[#c5a059] hover:text-[#dfc182] underline font-medium transition-colors"
      >
        {text}
      </a>
    );
  }

  // External link
  return (
    <a
      key={key}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#c5a059] hover:text-[#dfc182] underline font-medium transition-colors"
    >
      {text}
    </a>
  );
}
