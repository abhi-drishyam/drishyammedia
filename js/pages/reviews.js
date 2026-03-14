/* ═══════════════════════════════════════════════════════════
   DRISHYAM MEDIA — Reviews Page JS
   Loaded by: reviews.html
═══════════════════════════════════════════════════════════ */

/* ── SMOOTH HORIZONTAL SCROLL FOR TESTIMONIALS ── */
(function () {
  'use strict';

  var track = document.querySelector('.testimonial-track');
  if (!track) return;

  var isDown = false;
  var startX;
  var scrollLeft;

  track.addEventListener('mousedown', function (e) {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', function () {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', function () {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - track.offsetLeft;
    var walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
})();
