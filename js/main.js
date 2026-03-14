/* ═══════════════════════════════════════════════════════════
   DRISHYAM MEDIA — SHARED JAVASCRIPT
   Handles:
     • Auto-highlight active nav tab based on current page URL
     • Mobile hamburger / drawer toggle
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── AUTO-ACTIVE NAV ITEM ──────────────────────────────── */
  (function setActiveNav() {
    var filename = window.location.pathname.split('/').pop() || 'index.html';
    // Treat empty string (root URL) as index.html
    if (!filename || filename === '') filename = 'index.html';

    document.querySelectorAll('.nav-tab').forEach(function (tab) {
      var href = tab.getAttribute('href');
      if (href === filename) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.removeAttribute('aria-selected');
      }
    });
  })();


  /* ── HAMBURGER MENU ────────────────────────────────────── */
  (function initHamburger() {
    var btn    = document.getElementById('hamburgerBtn');
    var drawer = document.getElementById('mobileDrawer');
    var close  = document.getElementById('drawerClose');
    if (!btn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', openDrawer);
    if (close) close.addEventListener('click', closeDrawer);

    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeDrawer();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  })();


  /* ── PORTFOLIO DROPDOWN ─────────────────────────────────── */
  (function initDropdowns() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');
    if (!dropdowns.length) return;

    dropdowns.forEach(function (dd) {
      var trigger = dd.querySelector('.nav-dropdown-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dd.classList.contains('open');
        // Close all other dropdowns first
        dropdowns.forEach(function (other) {
          other.classList.remove('open');
          var t = other.querySelector('.nav-dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          dd.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function () {
      dropdowns.forEach(function (dd) {
        dd.classList.remove('open');
        var trigger = dd.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdowns.forEach(function (dd) {
          dd.classList.remove('open');
          var trigger = dd.querySelector('.nav-dropdown-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });
  })();

})();
