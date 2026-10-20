// 時間軸頁
(function () {
  const QQ = window.QQ;
  const SNOW_NAMES = ['', '第一場雪', '第二場雪', '第三場雪', '第四場雪'];

  // 一件事要讀到第幾章才知道：level 優先，還沒寫的算 99，其他取相關章節裡最後一章
  const levelOf = (x) => (x.level != null ? x.level : (x.todo ? 99 : QQ.maxCh(x.ch)));

  function linksHtml(x) {
    const ch = (x.ch || []).map((no) => QQ.chapterChip(no, true)).join('');
    const pl = (x.places || []).map(QQ.placeChip).join('');
    return ch || pl ? `<div class="chips tl-links">${ch}${pl}</div>` : '';
  }

  function snowHtml(s) {
    const inner = `<p class="tl-snow__text">${QQ.esc(s.text)}</p>${linksHtml(s)}`;
    return `<section class="tl-snow${s.todo ? ' is-todo' : ''}" id="snow-${s.snow}">
      <div class="tl-snow__flake">${QQ.icon('snowflake', 'icon--big')}</div>
      <div>
        <p class="tl-snow__label">${SNOW_NAMES[s.snow]}${QQ.isRead(levelOf(s)) ? `・${QQ.esc(s.when)}` : ''}${s.todo ? `<span class="tag tag--todo">${QQ.icon('nuomi_sleepy')}還沒寫</span>` : ''}</p>
        ${QQ.guard(levelOf(s), inner)}
      </div>
    </section>`;
  }

  function eventLi(ev) {
    return `<li${ev.todo ? ' class="is-todo"' : ''}>
      <div class="t-head"><span class="t-title">${QQ.esc(ev.when)}</span>${ev.todo ? `<span class="tag tag--todo">${QQ.icon('nuomi_sleepy')}還沒寫</span>` : ''}</div>
      <p class="t-what">${QQ.esc(ev.text)}</p>
      ${linksHtml(ev)}
    </li>`;
  }

  function eraHtml(e) {
    // 連在一起、還沒讀到的事，合成一個「點開看」
    let items = '';
    let hidden = [];
    const flush = () => {
      if (!hidden.length) return;
      const lv = Math.min(...hidden.map(levelOf));
      items += `<li class="tl-locked">${QQ.guard(lv, `<ol class="timeline timeline--inner">${hidden.map(eventLi).join('')}</ol>`, 'block',
        `${hidden.length} 件你還沒讀到的事（${QQ.chapterLabel(lv)}起）`)}</li>`;
      hidden = [];
    };
    e.events.forEach((ev) => {
      if (QQ.isRead(levelOf(ev))) { flush(); items += eventLi(ev); } else hidden.push(ev);
    });
    flush();
    const section = `<section class="tl-era tl-era--${e.line}">
      <div class="tl-era__head"><h2>${QQ.icon(e.icon)}${QQ.esc(e.title)}</h2>${QQ.lineTag(e.line)}<span class="tone">${QQ.esc(e.note || '')}</span></div>
      <ol class="timeline">${items}</ol>
    </section>`;
    // 整段都還沒讀到：連標題一起藏
    const first = Math.min(...e.events.map(levelOf));
    if (QQ.isRead(first)) return section;
    return `<section class="tl-era">${QQ.guard(first, section, 'block', `一段你還沒讀到的故事（${QQ.chapterLabel(first)}起）`)}</section>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const snows = QQ.timeline.filter((x) => x.snow);
    document.getElementById('snow-nav').innerHTML = snows.map((s) =>
      `<a href="#snow-${s.snow}">${QQ.icon('snowflake')}${SNOW_NAMES[s.snow]}</a>`).join('');
    document.getElementById('timeline').innerHTML = QQ.timeline.map((x) => (x.snow ? snowHtml(x) : eraHtml(x))).join('');
  });
})();
