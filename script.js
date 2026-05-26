/* ============================================
   PORTFOLIO JAVASCRIPT
   - Custom cursor
   - Navbar scroll behavior
   - Mobile nav toggle
   - Reveal on scroll (IntersectionObserver)
   - Counter animation
   - Skill bar animation
   - Form submit
============================================ */

document.addEventListener('DOMContentLoaded', () => {

const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  follower.style.left = e.clientX + "px";
  follower.style.top = e.clientY + "px";
});

  // ─── NAVBAR SCROLL ───────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ─── MOBILE NAV TOGGLE ───────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ─── REVEAL ON SCROLL ────────────────────────
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));


  // ─── COUNTER ANIMATION ───────────────────────
  const counters = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step   = target / (duration / 16);
        let current  = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  // ─── SKILL BAR ANIMATION ─────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.dataset.width + '%';
        setTimeout(() => {
          fill.style.width = width;
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(f => skillObserver.observe(f));


  // ─── CONTACT FORM ────────────────────────────
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Mengirim...';
      btn.disabled = true;

      // Simulate async send
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        form.reset();
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1400);
    });
  }


  // ─── SMOOTH ACTIVE NAV HIGHLIGHT ─────────────
  const sections = document.querySelectorAll('section[id]');
  const navA     = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY + 120 >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    navA.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent)'
        : '';
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();


  // ─── HERO PARALLAX (subtle) ───────────────────
  const heroBgText = document.querySelector('.hero-bg-text');

  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    }, { passive: true });
  }

});
