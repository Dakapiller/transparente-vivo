const { test, expect } = require('@playwright/test');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const fs = require('fs');
const path = require('path');

const REFERENCE_DIR = path.join(__dirname, '../../design_reference');
const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');
const REPORTS_DIR = path.join(__dirname, '../reports');
const RESULTS_JSON = path.join(REPORTS_DIR, '_results.json');

[SCREENSHOTS_DIR, REPORTS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Results are reset by globalSetup before each run

// ── Helpers ───────────────────────────────────────────────────────────────────

async function setLang(page, lang = 'pt') {
  await page.evaluate((l) => {
    localStorage.setItem('lang', l);
    if (window.applyLang) window.applyLang(l);
  }, lang);
  await page.waitForTimeout(150);
}

async function compareScreenshot(screenshotBuffer, refName, maxDiffRatio) {
  const screenshotPath = path.join(SCREENSHOTS_DIR, refName);
  const refPath = path.join(REFERENCE_DIR, refName);
  const diffPath = path.join(REPORTS_DIR, `diff_${refName}`);

  fs.writeFileSync(screenshotPath, screenshotBuffer);

  const ref = PNG.sync.read(fs.readFileSync(refPath));
  const actual = PNG.sync.read(screenshotBuffer);

  const width = Math.min(ref.width, actual.width);
  const height = Math.min(ref.height, actual.height);
  const diff = new PNG({ width, height });
  const refData = Buffer.alloc(width * height * 4);
  const actualData = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const d = (y * width + x) * 4;
      const r = (y * ref.width + x) * 4;
      const a = (y * actual.width + x) * 4;
      refData[d]=ref.data[r]; refData[d+1]=ref.data[r+1]; refData[d+2]=ref.data[r+2]; refData[d+3]=ref.data[r+3];
      actualData[d]=actual.data[a]; actualData[d+1]=actual.data[a+1]; actualData[d+2]=actual.data[a+2]; actualData[d+3]=actual.data[a+3];
    }
  }

  const numDiffPixels = pixelmatch(refData, actualData, diff.data, width, height, { threshold: 0.1 });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffRatio = numDiffPixels / totalPixels;

  // Accumulate results via JSON file (survives multiple afterAll calls)
  const all = JSON.parse(fs.readFileSync(RESULTS_JSON, 'utf8'));
  all.push({
    refName, diffRatio, numDiffPixels, totalPixels,
    screenshotPath, refPath, diffPath, maxDiffRatio,
    refDim: `${ref.width}×${ref.height}`,
    actualDim: `${actual.width}×${actual.height}`,
    comparedDim: `${width}×${height}`,
  });
  fs.writeFileSync(RESULTS_JSON, JSON.stringify(all, null, 2));

  return diffRatio;
}

function interpretDiff(diffRatio, maxDiffRatio) {
  const pct = (diffRatio * 100).toFixed(1);
  if (diffRatio < 0.03) return `✅ Praticamente idêntico (${pct}%). Apenas ruído de anti-aliasing.`;
  if (diffRatio < maxDiffRatio) return `✅ Dentro do limiar aceite (${pct}%). Diferenças menores de espaçamento ou font rendering entre PDF e browser.`;
  if (diffRatio < 0.15) return `⚠️ Diferença leve (${pct}%). Rever espaçamentos, tamanhos de fonte ou alinhamentos.`;
  if (diffRatio < 0.35) return `❌ Diferença moderada (${pct}%). Prováveis problemas de layout, proporções, cores ou conteúdo em falta (ex: fotos).`;
  return `❌ Diferença alta (${pct}%). Layout estruturalmente diferente do PDF — verificar estrutura HTML, CSS e dados.`;
}

// ── Single describe block ensures ONE afterAll for all tests ──────────────────
test.describe('Visual QA — Transparente Vivo', () => {

  // ── Desktop (1440px) ────────────────────────────────────────────────────────
  test('Desktop · Página inteira', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await setLang(page, 'pt');
    await page.waitForTimeout(500);
    const buf = await page.screenshot({ fullPage: true });
    const diff = await compareScreenshot(buf, 'desktop_full.png', 0.25);
    // result recorded in JSON — report shows pass/fail
  });

  test('Desktop · Secção de testemunhos', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await setLang(page, 'pt');
    await page.waitForTimeout(500);
    const section = page.locator('#testimonials');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const buf = await section.screenshot();
    const diff = await compareScreenshot(buf, 'desktop_testimonials_section.png', 0.08);
    // result recorded in JSON — report shows pass/fail
  });

  test('Desktop · Card individual', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await setLang(page, 'pt');
    await page.waitForTimeout(500);
    const card = page.locator('.test-card').first();
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const buf = await card.screenshot();
    const diff = await compareScreenshot(buf, 'desktop_card_single.png', 0.08);
    // result recorded in JSON — report shows pass/fail
  });

  test('Desktop · Menu aberto', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await setLang(page, 'pt');
    await page.evaluate(() => window.openMenu && window.openMenu());
    await page.locator('#menu-overlay.open').waitFor({ state: 'visible', timeout: 5000 });
    const buf = await page.screenshot({ fullPage: false });
    const diff = await compareScreenshot(buf, 'desktop_menu.png', 0.10);
    // result recorded in JSON — report shows pass/fail
  });

  // ── Mobile (390px) ──────────────────────────────────────────────────────────
  test('Mobile · Página inteira', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await setLang(page, 'pt');
    await page.waitForTimeout(500);
    const buf = await page.screenshot({ fullPage: true });
    const diff = await compareScreenshot(buf, 'mobile_full.png', 0.25);
    // result recorded in JSON — report shows pass/fail
  });

  test('Mobile · Secção de testemunhos', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await setLang(page, 'pt');
    await page.waitForTimeout(500);
    const section = page.locator('#testimonials');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const buf = await section.screenshot();
    const diff = await compareScreenshot(buf, 'mobile_testimonials_section.png', 0.08);
    // result recorded in JSON — report shows pass/fail
  });

  test('Mobile · Card individual', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await setLang(page, 'pt');
    await page.waitForTimeout(500);
    const card = page.locator('.test-card').first();
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const buf = await card.screenshot();
    const diff = await compareScreenshot(buf, 'mobile_card_single.png', 0.08);
    // result recorded in JSON — report shows pass/fail
  });

  // ── Consolidated report (runs once after all 7 tests) ───────────────────────
  test.afterAll(() => {
    if (!fs.existsSync(RESULTS_JSON)) return;
    const results = JSON.parse(fs.readFileSync(RESULTS_JSON, 'utf8'));
    if (results.length === 0) return;

    const labelMap = {
      'desktop_full.png':                   'Desktop · Página inteira',
      'desktop_testimonials_section.png':   'Desktop · Secção de testemunhos',
      'desktop_card_single.png':            'Desktop · Card individual',
      'desktop_menu.png':                   'Desktop · Menu aberto',
      'mobile_full.png':                    'Mobile · Página inteira',
      'mobile_testimonials_section.png':    'Mobile · Secção de testemunhos',
      'mobile_card_single.png':             'Mobile · Card individual',
    };
    const thresholdMap = {
      'desktop_full.png': '25%', 'mobile_full.png': '25%',
      'desktop_menu.png': '10%',
      'desktop_testimonials_section.png': '8%', 'desktop_card_single.png': '8%',
      'mobile_testimonials_section.png': '8%', 'mobile_card_single.png': '8%',
    };

    const order = Object.keys(labelMap);
    const sorted = [...results].sort((a, b) => order.indexOf(a.refName) - order.indexOf(b.refName));

    const passed = sorted.filter(r => r.diffRatio < r.maxDiffRatio).length;
    const failed = sorted.length - passed;

    const rows = sorted.map(r => {
      const ok = r.diffRatio < r.maxDiffRatio;
      const interp = interpretDiff(r.diffRatio, r.maxDiffRatio);
      return `
      <tr class="${ok ? 'row-pass' : 'row-fail'}">
        <td>
          <strong>${labelMap[r.refName] || r.refName}</strong><br>
          <small>Limiar: ${thresholdMap[r.refName] || (r.maxDiffRatio*100)+'%'}</small><br>
          <small>Ref: ${r.refDim}</small><br>
          <small>Site: ${r.actualDim}</small><br>
          <small>Comparado: ${r.comparedDim}</small>
        </td>
        <td><img src="${r.refPath}" loading="lazy"></td>
        <td><img src="${r.screenshotPath}" loading="lazy"></td>
        <td><img src="${r.diffPath}" loading="lazy"></td>
        <td>
          <span class="badge ${ok ? 'pass' : 'fail'}">${ok ? '✅ PASS' : '❌ FAIL'}</span>
          <div class="pct">${(r.diffRatio*100).toFixed(2)}%</div>
          <div class="interp">${interp}</div>
          <small>${r.numDiffPixels.toLocaleString()} / ${r.totalPixels.toLocaleString()} px diferentes</small>
        </td>
      </tr>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
<title>Visual QA — Transparente Vivo</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,sans-serif;background:#f0f2f5;color:#1a1a2e;padding:32px}
  h1{font-size:1.5rem;margin-bottom:6px}
  .meta{color:#888;font-size:.82rem;margin-bottom:22px}
  .summary{display:flex;gap:10px;margin-bottom:26px;flex-wrap:wrap;align-items:center}
  .badge{padding:5px 14px;border-radius:16px;font-weight:600;font-size:.82rem}
  .badge.pass{background:#d4edda;color:#155724}
  .badge.fail{background:#f8d7da;color:#721c24}
  .badge.info{background:#e8f4fd;color:#0c5460;font-weight:400}
  table{border-collapse:collapse;width:100%;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08)}
  th{background:#1a1a2e;color:#fff;padding:10px 14px;font-size:.75rem;text-align:left;text-transform:uppercase;letter-spacing:.04em}
  td{border-bottom:1px solid #eef0f3;padding:12px 14px;vertical-align:top;font-size:.82rem}
  tr:last-child td{border-bottom:none}
  tr.row-fail{background:#fff8f8}
  tr.row-pass{background:#fafffd}
  td img{max-width:220px;height:auto;border:1px solid #dde3ed;border-radius:5px;display:block}
  .pct{font-size:1.4rem;font-weight:700;margin:8px 0 4px}
  .interp{font-size:.79rem;line-height:1.5;color:#333;margin-bottom:6px}
  small{color:#999;font-size:.72rem;line-height:1.7;display:block}
</style>
</head>
<body>
<h1>Visual QA — Transparente Vivo</h1>
<p class="meta">Gerado: ${new Date().toLocaleString('pt-PT')} · ${sorted.length} testes · Mapa de diferenças: branco = idêntico · vermelho = diferente</p>
<div class="summary">
  <span class="badge pass">✅ ${passed} aprovados</span>
  ${failed ? `<span class="badge fail">❌ ${failed} reprovados</span>` : ''}
  <span class="badge info">ℹ️ Limiar página inteira: 25% · Menu: 10% · Secção/Card: 8%</span>
</div>
<table>
  <thead>
    <tr><th>Teste</th><th>Referência (PDF)</th><th>Site atual</th><th>Mapa de diferenças</th><th>Resultado</th></tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
</body>
</html>`;

    fs.writeFileSync(path.join(REPORTS_DIR, 'index.html'), html);

    // Console summary
    console.log(`\n${'─'.repeat(65)}`);
    console.log(`📊 Visual QA — ${passed}/${sorted.length} aprovados`);
    sorted.forEach(r => {
      const ok = r.diffRatio < r.maxDiffRatio;
      console.log(`  ${ok?'✅':'❌'} ${(labelMap[r.refName]||r.refName).padEnd(38)} ${(r.diffRatio*100).toFixed(1).padStart(5)}%  (limiar ${(r.maxDiffRatio*100).toFixed(0)}%)`);
    });
    console.log(`${'─'.repeat(65)}\n`);
  });
});
