// 產生 sitemap.xml（給 Google 的網站地圖）：列出每一頁，和每一個地點頁 place.html?id=…
// 新增頁面或地點以後，在網站資料夾執行一次：node tools/make_sitemap.mjs
// （404.html 不列；地圖上的地名〈小說裡沒有寫到〉沒有自己的內容，也不列。）
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';

const BASE = 'https://jiayi0910.github.io/qingqiu_website/';
const root = new URL('..', import.meta.url);
const path = (p) => new URL(p, root);

// 最後修改日期：用 git 的紀錄（改了還沒提交的檔案就用今天）
const today = new Date().toISOString().slice(0, 10);
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
function lastmod(...files) {
  const dates = files.map((f) => {
    try {
      return git('status', '--porcelain', '--', f) ? today : git('log', '-1', '--format=%cs', '--', f);
    } catch {
      return '';
    }
  }).filter(Boolean);
  return dates.sort().at(-1) || today;
}

// 讀地點資料（js/data/places.js 是給瀏覽器用的，這裡用 vm 跑一次拿到 QQ.places）
const ctx = { window: {} };
ctx.window.QQ = {};
ctx.QQ = ctx.window.QQ;
vm.createContext(ctx);
vm.runInContext(readFileSync(path('js/data/places.js'), 'utf8'), ctx);
const places = ctx.QQ.places.filter((p) => p.kind !== 'map');

const urls = [];
const pages = readdirSync(root).filter((f) => f.endsWith('.html') && !['404.html', 'place.html'].includes(f)).sort();
// 首頁放第一個，網址用資料夾本身
urls.push({ loc: BASE, lastmod: lastmod('index.html', 'js/map.js', 'js/data/places.js') });
for (const f of pages.filter((f) => f !== 'index.html')) {
  urls.push({ loc: BASE + f, lastmod: lastmod(f) });
}
const placeDate = lastmod('place.html', 'js/place.js', 'js/data/places.js', 'js/data/chapters.js');
for (const p of places) {
  urls.push({ loc: `${BASE}place.html?id=${encodeURIComponent(p.id)}`, lastmod: placeDate });
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- 這個檔案是 tools/make_sitemap.mjs 產生的，不要手動改 -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(path('sitemap.xml'), xml);
console.log(`sitemap.xml：${urls.length} 個網址（${pages.length} 頁＋${places.length} 個地點）`);
