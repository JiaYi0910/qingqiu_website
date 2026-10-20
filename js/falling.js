// 首頁：淡淡飄落的雪花和櫻花
// 系統設定「減少動態」的人不會看到；右下角的按鈕可以關掉，會記在這台電腦上。
(function () {
  const KEY = 'qq-falling';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let off = false;
  try { off = localStorage.getItem(KEY) === 'off'; } catch (e) { /* 存不了就算了 */ }

  function build() {
    const layer = document.createElement('div');
    layer.className = 'falling';
    layer.setAttribute('aria-hidden', 'true');
    const count = window.innerWidth < 720 ? 14 : 26;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      const petal = i % 3 !== 0; // 三片裡有兩片是櫻花，一片是雪
      s.className = petal ? 'falling__petal' : 'falling__snow';
      const size = petal ? 8 + Math.random() * 8 : 4 + Math.random() * 5;
      s.style.left = `${Math.random() * 100}%`;
      s.style.width = `${size}px`;
      s.style.height = `${petal ? size * 0.75 : size}px`;
      s.style.animationDuration = `${11 + Math.random() * 12}s, ${3 + Math.random() * 3}s`;
      s.style.animationDelay = `${-Math.random() * 20}s, ${-Math.random() * 4}s`;
      s.style.opacity = String(0.45 + Math.random() * 0.4);
      layer.appendChild(s);
    }
    return layer;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (reduce) return;
    let layer = off ? null : build();
    if (layer) document.body.appendChild(layer);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'falling-toggle';
    const label = () => `${window.QQ.icon(layer ? 'snowflake' : 'sakura')}${layer ? '關掉飄落' : '打開飄落'}`;
    btn.innerHTML = label();
    btn.addEventListener('click', () => {
      if (layer) { layer.remove(); layer = null; } else { layer = build(); document.body.appendChild(layer); }
      try { localStorage.setItem(KEY, layer ? 'on' : 'off'); } catch (e) { /* 存不了就算了 */ }
      btn.innerHTML = label();
    });
    document.body.appendChild(btn);
  });
})();
