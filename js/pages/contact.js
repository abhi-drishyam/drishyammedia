/* ═══════════════════════════════════════════════════════════
   DRISHYAM MEDIA — Contact Page JS
   Loaded by: contact.html
═══════════════════════════════════════════════════════════ */

/* ── FORM SUBMISSION ── */
(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    form.reset();
  });
})();
