/* ═══════════════════════════════════════════════════════════
   DRISHYAM MEDIA — Graphic Design Page JS
   Loaded by: graphic.html
═══════════════════════════════════════════════════════════ */

/* ── FILTER PILLS — smooth scroll + active highlight ── */
(function () {
  'use strict';

  var pills    = document.querySelectorAll('.filter-pill');
  var sections = document.querySelectorAll('.cat-block');

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
    });
  });

  function onScroll() {
    var current = '';
    sections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      if (rect.top <= 160) current = sec.id;
    });
    if (!current) return;
    pills.forEach(function (p) {
      var href = (p.getAttribute('href') || '').replace('#', '');
      p.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
