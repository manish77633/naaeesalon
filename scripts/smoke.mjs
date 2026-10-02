import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', error => errors.push(error.stack));

for (const path of ['/', '/about', '/services', '/services/hair', '/services/beauty', '/services/makeup', '/services/bridal', '/services/mens-grooming', '/gallery', '/reviews', '/booking', '/contact']) {
  await page.goto(`http://127.0.0.1:5173${path}`, { waitUntil: 'domcontentloaded' });
  await page.locator('main').waitFor();
  const width = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
  if (width.document > width.viewport) throw new Error(`Horizontal overflow on ${path}: ${width.document}/${width.viewport}`);
  console.log(path, width.document > width.viewport ? `OVERFLOW ${width.document}/${width.viewport}` : 'OK', await page.title());
}
await page.setViewportSize({ width: 375, height: 812 });
for (const path of ['/', '/services/mens-grooming', '/gallery', '/booking']) {
  await page.goto(`http://127.0.0.1:5173${path}`, { waitUntil: 'domcontentloaded' });
  const width = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
  if (width.document > width.viewport) throw new Error(`Horizontal overflow at 375px on ${path}`);
}
await page.setViewportSize({ width: 390, height: 844 });

await page.goto('http://127.0.0.1:5173/contact', { waitUntil: 'domcontentloaded' });
if (!await page.locator('.logo img[src="/images/uplooks-logo.png"]').first().isVisible()) throw new Error('Uplooks logo missing');
for (const detail of ['+91 85295 91122', 'Balaji Paradise', '10:30 PM', '302020']) {
  if (!await page.locator('main').innerText().then(text => text.includes(detail))) throw new Error(`Missing contact detail: ${detail}`);
}
if (!await page.locator('.map-embed iframe').count()) throw new Error('Contact map missing');
if (!await page.locator('a[href="tel:+918529591122"]').count()) throw new Error('Phone link missing');
await page.goto('http://127.0.0.1:5173/booking', { waitUntil: 'domcontentloaded' });
if (!await page.locator('[name="time"] option').allTextContents().then(times => times.includes('10:00 PM'))) throw new Error('Evening booking option missing');

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
console.log('menu toggle', await page.locator('.menu-toggle').isVisible(), await page.locator('.menu-toggle').boundingBox());
await page.locator('.menu-toggle').click();
console.log('mobile menu', await page.locator('.mobile-menu').getAttribute('class'));
await page.locator('.mobile-menu').getByRole('link', { name: 'Gallery' }).click();
if (await page.locator('.gallery-tile').count() !== 14) throw new Error('Gallery did not show all 14 unique salon images');
await page.getByRole('button', { name: 'Bridal', exact: true }).click();
if (await page.locator('.gallery-tile').count() !== 4) throw new Error('Gallery filter did not show four bridal images');
await page.locator('.gallery-tile').first().click();
if (!await page.locator('.lightbox').isVisible()) throw new Error('Gallery lightbox did not open');
await page.keyboard.press('Escape');

await page.goto('http://127.0.0.1:5173/booking', { waitUntil: 'domcontentloaded' });
await page.locator('[name="service"]').selectOption('Hair');
await page.locator('[name="name"]').fill('Test Guest');
await page.locator('[name="phone"]').fill('9999999999');
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
await page.locator('[name="date"]').fill(nextWeek);
await page.locator('[name="time"]').selectOption('10:00 AM');
await page.locator('.form-submit').click();
console.log('booking success', new URL(page.url()).pathname, await page.locator('.success-details').innerText());
if (new URL(page.url()).pathname !== '/booking/success') throw new Error('Booking confirmation route did not open');
if (errors.length) throw new Error(errors.join('\n'));
console.log('No page errors');
await browser.close();
