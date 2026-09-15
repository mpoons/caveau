// gedeeld: de app laden, de taalkeuze van het eerste bezoek wegdrukken en schoon beginnen
module.exports = async function init(page, url) {
  await page.goto('http://127.0.0.1:8766/README.md');            // een "vorige pagina", zoals wie via een link binnenkomt
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof S === 'object' && typeof render === 'function');
  await page.evaluate(() => { S.settings.taal = 'nl'; save(true); });
  await page.waitForTimeout(800);
  await page.evaluate(() => closeSheet(true));
  await page.waitForTimeout(500);
};
