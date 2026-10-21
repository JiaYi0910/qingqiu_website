// 新手引導：第一次來的人，由糯米帶著逛一圈（隨時可以跳過，看完或跳過就不會再出現）。
// 頁尾的「再看一次新手引導」、或網址加上 ?tour=1，可以再看一次（?tour=3 = 從第三步開始）。
// 要改步驟或文字，改下面的 steps()。
(function () {
  const QQ = window.QQ;
  const KEY = 'qq-tour';

  // 記住「看過了」：存不了的瀏覽器（例如無痕模式擋掉）就不主動跳出來，免得每一頁都出現
  const seen = {
    get() {
      try { return localStorage.getItem(KEY) === 'done'; } catch (e) { return true; }
    },
    set() {
      try { localStorage.setItem(KEY, 'done'); } catch (e) { /* 存不了就算了 */ }
    },
  };

  const shown = (el) => !!el && el.getClientRects().length > 0;

  function steps() {
    const home = !!document.getElementById('map');
    const pageId = document.body.dataset.page;
    const pageName = document.getElementById('place') ? '地點介紹'
      : ((QQ.pages || []).find((p) => p.id === pageId) || {}).label;
    const list = [];
    list.push({
      mascot: 'nuomi_hi',
      title: '歡迎來到青丘！',
      text: home
        ? '這裡是昭昭⋆.˚✮的原創小說《墨染櫻雪》的設定網站：把小說裡的青丘做成可以逛的地圖，還有角色、地點、章節和時間軸。我是糯米，帶你逛一圈，只要半分鐘！'
        : `這裡是昭昭⋆.˚✮的原創小說《墨染櫻雪》的設定網站${pageName ? `，你現在在「${pageName}」` : ''}。我是糯米，帶你看看怎麼逛，只要半分鐘！`,
    });
    if (home) {
      list.push({
        target: '#map', mascot: 'nuomi_happy', title: '點地名，走進青丘',
        text: '地圖上每一個木牌都可以點，會跳出那個地方的介紹、發生過的章節，和會在那裡遇到的人。手機上，地圖可以左右滑。',
      });
      list.push({
        target: '#route-start', mascot: 'nuomi_love', title: '跟著故事走一遍',
        text: '按這顆按鈕，地圖上只會亮起那一章走過的地方，照順序標上號碼，還能一章一章往下翻。',
      });
    }
    list.push({
      target: '.site-nav', mascot: 'nuomi_eat', title: '想看更多',
      text: '「角色」看大家的介紹；「故事」裡有章節、時間軸和名句；「世界」有信物和青丘小百科；「畫廊」有番外和周邊設計。',
    });
    list.push({
      target: '.search-btn', mascot: 'nuomi_what', title: '找東西',
      text: '按放大鏡，可以搜尋地點、角色、章節和名句。只會找你讀到的章節，不會劇透。',
    });
    if (home) {
      list.push({
        target: '#links', mascot: 'nuomi_thanks', title: '讀小說、來聊天',
        text: '想讀《墨染櫻雪》，就去 KadoKado；想跟大家聊天，來 Discord 找我們！',
      });
    } else {
      list.push({
        target: '.site-header .brand', mascot: 'nuomi_thanks', title: '回到地圖',
        text: '點左上角的「墨染櫻雪」，隨時回到青丘地圖。',
      });
    }
    const banner = document.querySelector('.progress-banner');
    list.push(shown(banner)
      ? {
        target: '.progress-banner', mascot: 'nuomi_scared', title: '最後，怕被劇透嗎？', last: '去選章節', focus: '.progress-banner select',
        text: '在這裡選你讀到哪一章，後面的內容會先藏起來，想看再一個一個點開。還沒開始讀的話，選「序章」就好。',
      }
      : {
        target: '.progress-btn', mascot: 'nuomi_shy', title: '防劇透', last: '開始逛',
        text: '右上角這顆按鈕，可以改你讀到哪一章。後面的內容會先藏起來，想看再點開。',
      });
    return list.filter((s) => !s.target || shown(document.querySelector(s.target)));
  }

  function start(from) {
    if (document.querySelector('.tour')) return;
    const list = steps();
    let i = Math.min(Math.max(0, (from || 1) - 1), list.length - 1);
    const root = document.createElement('div');
    root.className = 'tour';
    root.innerHTML = `<div class="tour__block"></div><div class="tour__spot" aria-hidden="true"></div>
      <div class="tour__card" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-text">
        <div class="tour__head"><span class="tour__mascot"></span><h2 class="tour__title" id="tour-title"></h2></div>
        <p class="tour__text" id="tour-text"></p>
        <div class="tour__foot">
          <span class="tour__dots" aria-hidden="true">${list.map(() => '<i></i>').join('')}</span>
          <button type="button" class="tour__skip">跳過引導</button>
          <button type="button" class="btn btn--ghost tour__prev">上一步</button>
          <button type="button" class="btn tour__next">下一步</button>
        </div>
      </div>`;
    document.body.appendChild(root);
    const spot = root.querySelector('.tour__spot');
    const card = root.querySelector('.tour__card');
    const prev = root.querySelector('.tour__prev');
    const next = root.querySelector('.tour__next');
    const lastFocus = document.activeElement;

    // 把亮框放到目標上、對話框放在目標的下面（放不下就放上面，再放不下就貼在畫面底下）
    function place() {
      const s = list[i];
      const el = s.target && document.querySelector(s.target);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;
      const gap = 12;
      if (!el) {
        root.classList.add('tour--center');
        spot.style.cssText = '';
        card.style.left = `${Math.max(12, (vw - cw) / 2)}px`;
        card.style.top = `${Math.max(12, (vh - ch) / 2)}px`;
        return;
      }
      root.classList.remove('tour--center');
      const r = el.getBoundingClientRect();
      const pad = 6;
      const top = Math.max(4, r.top - pad);
      const bottom = Math.min(vh - 4, r.bottom + pad);
      spot.style.cssText = `left:${Math.max(4, r.left - pad)}px;top:${top}px;width:${Math.min(vw - 8, r.width + pad * 2)}px;height:${Math.max(0, bottom - top)}px`;
      let y;
      if (bottom + gap + ch <= vh - 8) y = bottom + gap;
      else if (top - gap - ch >= 8) y = top - gap - ch;
      else {
        // 上下都放不下：貼在畫面最上面或最下面，選蓋住比較少的那一邊
        const coverTop = Math.max(0, 8 + ch - top);
        const coverBottom = Math.max(0, bottom - (vh - ch - 8));
        y = coverTop < coverBottom ? 8 : vh - ch - 8;
      }
      const x = Math.min(Math.max(12, r.left + r.width / 2 - cw / 2), vw - cw - 12);
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
    }

    function show() {
      const s = list[i];
      root.querySelector('.tour__mascot').innerHTML = QQ.icon(s.mascot || 'nuomi_hi');
      root.querySelector('.tour__title').textContent = s.title;
      root.querySelector('.tour__text').textContent = s.text;
      root.querySelectorAll('.tour__dots i').forEach((d, j) => d.classList.toggle('on', j === i));
      prev.hidden = i === 0;
      next.textContent = i === 0 ? '好，帶我逛' : i === list.length - 1 ? (s.last || '開始逛') : '下一步';
      const el = s.target && document.querySelector(s.target);
      // 先把目標捲進畫面：小的放上方；大地圖從頁首下面開始，對話框才放得下（頁首是固定在上面的，要扣掉它的高度）
      if (el) {
        const header = document.querySelector('.site-header');
        const r = el.getBoundingClientRect();
        if (el.closest('.site-header')) {
          // 頁首裡的東西：手機上頁首不會固定，捲出畫面了就捲回最上面
          if (r.top < 0 || r.bottom > window.innerHeight) window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          const sticky = header && /sticky|fixed/.test(getComputedStyle(header).position);
          const headH = sticky ? header.offsetHeight : 0;
          // 小的目標放在畫面上方，下面剛好留給對話框（照對話框的實際高度算）
          const room = window.innerHeight - headH - card.offsetHeight - 36;
          const want = Math.max(8, Math.min((window.innerHeight - headH) * 0.22, room - r.height));
          const y = r.height > (window.innerHeight - headH) * 0.6
            ? r.top + window.scrollY - headH - 12
            : r.top + window.scrollY - headH - want;
          window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
        }
      }
      place();
      next.focus({ preventScroll: true });
    }

    function end() {
      seen.set();
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
      document.removeEventListener('keydown', onKey, true);
      const s = list[i];
      const finished = i === list.length - 1;
      root.remove();
      const focusEl = finished && s.focus && document.querySelector(s.focus);
      if (focusEl) focusEl.focus();
      else if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }

    function go(d) {
      if (i + d >= list.length) { end(); return; }
      i = Math.max(0, i + d);
      show();
    }

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); end(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Tab') {
        // 鍵盤只在對話框的按鈕之間移動
        const btns = [...card.querySelectorAll('button')].filter((b) => !b.hidden);
        const k = btns.indexOf(document.activeElement);
        e.preventDefault();
        btns[(k + (e.shiftKey ? -1 : 1) + btns.length) % btns.length].focus();
      }
    }

    next.addEventListener('click', () => go(1));
    prev.addEventListener('click', () => go(-1));
    root.querySelector('.tour__skip').addEventListener('click', end);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    document.addEventListener('keydown', onKey, true);
    show();
  }
  QQ.startTour = start;

  // 頁面準備好就開始（不用等全部的圖片載完）；圖片載完以後，如果引導還開著，再對準一次位置
  window.addEventListener('load', () => { if (document.querySelector('.tour')) window.dispatchEvent(new Event('resize')); });
  document.addEventListener('DOMContentLoaded', () => {
    // 頁尾：再看一次（標題列不加東西）
    document.querySelectorAll('.site-footer').forEach((f) => {
      const copy = f.querySelector('.copyright');
      const html = `<p class="tour-again"><button type="button">${QQ.icon('nuomi_hi')}再看一次新手引導</button></p>`;
      if (copy) copy.insertAdjacentHTML('beforebegin', html);
      else f.insertAdjacentHTML('beforeend', html);
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('.tour-again button')) start(1);
    });
    // 第一次來（或網址有 ?tour=1）才自動開始；從「在地圖上看」的連結進來的人已經在用網站了，不打擾
    const forced = parseInt(QQ.param('tour'), 10);
    if (forced > 0) setTimeout(() => start(forced), 500);
    else if (!seen.get() && !QQ.param('ch')) setTimeout(() => start(1), 500);
  });
})();
