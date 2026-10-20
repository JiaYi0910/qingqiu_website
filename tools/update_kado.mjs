// 從 KadoKado 抓《墨染櫻雪》已經上架的章節，把每一章的編號寫進 js/data/chapters.js 的 kado:
// 章節頁的「去 KadoKado 讀這一章」和首頁的「KadoKado 上架到第幾章」就會跟著更新。
//
// GitHub 每天下午會自動跑（.github/workflows/kado.yml），平常不用管。
// 想自己跑的話，在網站資料夾執行：node tools/update_kado.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const BOOK = 92097; // https://www.kadokado.com.tw/book/92097
const FILE = new URL('../js/data/chapters.js', import.meta.url);

// 「序章」→ 0、「第三十七章」→ 37、「終章」或「尾聲」→ 99
const DIGITS = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
function chapterNo(name) {
  if (name.startsWith('序章')) return 0;
  if (name.startsWith('終章') || name.startsWith('尾聲')) return 99;
  const m = name.match(/^第([一二三四五六七八九十百]+)章/);
  if (!m) return null;
  const s = m[1];
  if (s === '十') return 10;
  if (s.startsWith('十')) return 10 + DIGITS[s[1]];
  if (s.includes('十')) {
    const [a, b] = s.split('十');
    return DIGITS[a] * 10 + (b ? DIGITS[b] : 0);
  }
  return DIGITS[s];
}

const res = await fetch(`https://api.kadokado.com.tw/v3/title/${BOOK}/collection`, {
  headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0 (qingqiu_website; KadoKado chapter sync)' },
});
if (!res.ok) {
  console.error(`KadoKado 回應 ${res.status}，這次先不更新。`);
  process.exit(1);
}
const published = (await res.json()).flatMap((c) => c.chapters || []);

let src = readFileSync(FILE, 'utf8');
const added = [];
for (const ch of published) {
  const no = chapterNo(ch.chapterDisplayName);
  if (no == null) {
    console.log(`看不懂這個章名，跳過：${ch.chapterDisplayName}`);
    continue;
  }
  // chapters.js 裡每一章的第一行：    no: 7, title: '…', vol: 'v1', line: 'past', written: true, kado: 123,
  const re = new RegExp(`^(    no: ${no}, title: '([^']*)',.*?)(, kado: (\\d+))?,$`, 'm');
  const m = src.match(re);
  if (!m) {
    console.log(`chapters.js 裡找不到第 ${no} 章，跳過：${ch.chapterDisplayName}`);
    continue;
  }
  if (m[4] === String(ch.chapterId)) continue;
  const kadoTitle = (ch.chapterDisplayName.match(/〈(.+)〉/) || [])[1];
  if (kadoTitle && kadoTitle !== m[2]) console.log(`提醒：第 ${no} 章的章名不一樣（網站：${m[2]}，KadoKado：${kadoTitle}）`);
  src = src.replace(re, `${m[1]}, kado: ${ch.chapterId},`);
  added.push(ch.chapterDisplayName);
}

if (!added.length) {
  console.log(`沒有新章節。KadoKado 上架到：${published.at(-1)?.chapterDisplayName || '（還沒有）'}`);
} else {
  writeFileSync(FILE, src);
  console.log(`補上 ${added.length} 章：${added.join('、')}`);
  // 給 GitHub Actions 用的提交說明
  if (process.env.RUNNER_TEMP) {
    writeFileSync(`${process.env.RUNNER_TEMP}/kado-msg.txt`, `KadoKado 上架：${added.join('、')}（自動更新）\n`);
  }
}
