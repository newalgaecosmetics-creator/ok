/* ============================================================
   Bio Secretome SL — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Sticky nav shadow on scroll ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav__links');
  const closeMenu = () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---- Current year ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Contact form (client-side, no backend) ---- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      note.classList.remove('ok', 'err');

      if (!name || !validEmail || !message) {
        note.textContent = 'Please complete your name, a valid email, and a message.';
        note.classList.add('err');
        return;
      }

      // No backend configured: open the user's mail client pre-filled.
      const subject = encodeURIComponent(`Website enquiry — ${name}`);
      const company = (data.get('company') || '').toString().trim();
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\n\n${message}`
      );
      window.location.href =
        `mailto:newalgaecosmetics@gmail.com?subject=${subject}&body=${body}`;

      note.textContent = 'Thank you! Your email client should now open to send the message.';
      note.classList.add('ok');
      form.reset();
    });
  }

  /* ---- Smooth-scroll offset for fixed nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
