const defaultHead = `
<meta charset="utf-8" />
<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossorigin
/>
<link
  href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,700;1,700&family=Merriweather:wght@400;700&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="/styles/reset.css" />
<link rel="stylesheet" href="/styles/tokens.css" />
<link rel="stylesheet" href="/styles/page.css" />
`;

const defaultBody = `<h1>Untitled Page</h1>`;

export default function pageTemplate(partials: {
  head?: string;
  body?: string;
}) {
  const { head = defaultHead, body = defaultBody } = partials;

  return `<!DOCTYPE html>
    <html lang="en">
    <head>${head}</head>
    <body>${body}</body>
    </html>
    `;
}
