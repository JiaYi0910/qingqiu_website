// 番外・現代校園頁
(function () {
  const QQ = window.QQ;
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('au-intro').textContent = QQ.au.intro;
    document.getElementById('au-grid').innerHTML = QQ.au.items.map((it, i) => `
      <figure class="au-card">
        <img src="${QQ.esc(it.src)}" data-full="${QQ.esc(it.src)}" data-caption="${QQ.esc(it.title)}" alt="${QQ.esc(it.title)}" loading="lazy">
        <figcaption><span class="au-no">${String(i + 1).padStart(2, '0')}</span><strong>${QQ.esc(it.title)}</strong><span>${QQ.esc(it.text)}</span></figcaption>
      </figure>`).join('');
  });
})();
