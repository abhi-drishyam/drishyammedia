/* ── ATA TIMELINE (FIXED)
   Fixes:
   1. setInterval replaced with timestamp-based rAF loop — no tab-backgrounding drift
   2. Fill bar resets instantly (no-transition class) then re-enables, preventing the
      jarring 97% → 8% jump on wrap-around
   3. Interval is paused when tab is hidden via visibilitychange
   4. No memory leak — single rAF loop, single cleanup handler
─────────────────────────────────────── */
(function () {
  const STEP_DURATION = 1800;
  const TOTAL_STEPS   = 4;

  const nodes   = document.querySelectorAll('.node-circle');
  const cards   = document.querySelectorAll('.step-card');
  const fillBar = document.getElementById('timelineFill');
  const lineFills = ['8%', '36%', '64%', '97%'];

  let currentStep  = 0;
  let stepStart    = null;
  let rafId        = null;
  let isPaused     = false;

  function applyStep(step) {
    nodes.forEach((n, i) => {
      n.classList.remove('visited', 'current');
      if (i < step)  n.classList.add('visited');
      if (i === step) n.classList.add('current');
    });

    fillBar.style.width = lineFills[step];

    cards.forEach((c, i) => {
      c.classList.remove('active', 'visited');
      if (i < step)  c.classList.add('visited');
      if (i === step) c.classList.add('active');
      const bar = c.querySelector('.card-progress-fill');
      if (bar) { bar.style.transition = 'none'; bar.style.width = '0%'; }
    });

    const activeBar = cards[step].querySelector('.card-progress-fill');
    if (activeBar) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          activeBar.style.transition = `width ${STEP_DURATION}ms linear`;
          activeBar.style.width = '100%';
        });
      });
    }
  }

  function advanceToStep(step) {
    const isReset = step === 0 && currentStep === TOTAL_STEPS - 1;

    if (isReset) {
      /* FIX: instant-reset the fill bar before jumping back to step 0
         so we never see the bar animate backwards from 97% → 8% */
      fillBar.classList.add('no-transition');
      fillBar.style.width = '0%';
      // Force reflow so the no-transition class takes effect before we remove it
      void fillBar.offsetWidth;
      fillBar.classList.remove('no-transition');
    }

    currentStep = step;
    applyStep(currentStep);
  }

  function tick(timestamp) {
    if (isPaused) {
      stepStart = timestamp; // don't accumulate paused time
      rafId = requestAnimationFrame(tick);
      return;
    }

    if (stepStart === null) stepStart = timestamp;
    const elapsed = timestamp - stepStart;

    if (elapsed >= STEP_DURATION) {
      stepStart = timestamp;
      const nextStep = (currentStep + 1) % TOTAL_STEPS;
      advanceToStep(nextStep);
    }

    rafId = requestAnimationFrame(tick);
  }

  // Pause when tab is not visible so we don't drift
  document.addEventListener('visibilitychange', () => {
    isPaused = document.hidden;
    if (!isPaused) stepStart = null; // reset timer when coming back
  });

  // Kick off
  applyStep(0);
  rafId = requestAnimationFrame(tick);
})();


/* ── WEBSITE SHOWCASE TAB SWITCHER ── */
(function () {
  const tabs   = document.querySelectorAll('.ws-tab');
  const panels = document.querySelectorAll('.ws-panel');
  const thumbs = document.querySelectorAll('.ws-thumb');
  const urlBar = document.getElementById('wsUrl');

  const urls = {
    ecommerce: 'yourstore.com',
    portfolio: 'yourportfolio.co',
    landing:   'yourbrand.com/launch',
    saas:      'app.yoursaas.io/dashboard'
  };

  function switchTo(cat) {
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.cat === cat);
      t.setAttribute('aria-selected', t.dataset.cat === cat ? 'true' : 'false');
    });
    panels.forEach(p => p.classList.toggle('active', p.dataset.cat === cat));
    thumbs.forEach(t => {
      t.classList.toggle('active', t.dataset.cat === cat);
      t.setAttribute('aria-selected', t.dataset.cat === cat ? 'true' : 'false');
    });
    urlBar.textContent = urls[cat] || 'yoursite.com';
  }

  tabs.forEach(t   => t.addEventListener('click',   () => switchTo(t.dataset.cat)));
  thumbs.forEach(t => t.addEventListener('click',   () => switchTo(t.dataset.cat)));

  // FIX: keyboard support for thumb tabs
  thumbs.forEach(t => t.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      switchTo(t.dataset.cat);
    }
  }));
})();
