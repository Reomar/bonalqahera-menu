const menu = document.getElementById('menu');
const fallback = document.getElementById('fallback');

try {
  const pdfjs = await import('./vendor/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdf.worker.min.mjs', import.meta.url).href;
  const pdf = await pdfjs.getDocument({ url: 'menu.pdf' }).promise;

  for (let number = 1; number <= pdf.numPages; number += 1) {
    const page = await pdf.getPage(number);
    const original = page.getViewport({ scale: 1 });
    const displayWidth = Math.min(window.innerWidth, 1000);
    const pixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);
    const viewport = page.getViewport({ scale: displayWidth / original.width });
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width * pixelRatio);
    canvas.height = Math.floor(viewport.height * pixelRatio);
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', `Menu, page ${number} of ${pdf.numPages}`);
    menu.append(canvas);
    await page.render({
      canvasContext: canvas.getContext('2d'),
      transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
      viewport,
    }).promise;
  }
} catch (error) {
  console.error('Could not display the menu:', error);
  fallback.hidden = false;
}
