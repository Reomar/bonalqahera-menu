# Bon Alqahera menu

A small GitHub Pages site that displays the PDF menu directly on the page, without a header, buttons, or other surrounding interface. It uses PDF.js to render the PDF consistently in mobile and desktop browsers. Visitors can use their browser's pinch or page zoom.

## Preview

Run `python3 -m http.server 8000` from this directory and open `http://localhost:8000`. A web server is needed so the PDF renderer can load its local files.

## Update the menu

Replace `menu.pdf` with the new menu. To avoid serving a cached older menu, replace the version in `viewer.mjs`, the viewer script URL, and the PDF links in `index.html` with the first 12 characters of `shasum -a 256 menu.pdf`. Preview the menu and commit the change. Keep the filename `menu.pdf`; the viewer renders each page automatically. The PDF is also available at `/menu.pdf`.

## GitHub Pages and domain

Publish the repository from the root of its default branch. `CNAME` specifies `menu.bonalqahera.com`. Add a DNS-only CNAME record in Cloudflare for `menu` pointing to `Reomar.github.io` (not a repository path), configure the same custom domain in the repository's Pages settings, and enable HTTPS when the certificate is available.

`vendor/` contains the official PDF.js 6.5.438 browser distribution and its license.
