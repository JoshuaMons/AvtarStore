/**
 * Avtar Shop Tilburg - Landing page scripts
 * Handles: sticky navbar, mobile menu, smooth scroll, footer year
 */

(function () {
  'use strict';

  const NAVBAR = document.getElementById('navbar');
  const NAV_MENU = document.getElementById('nav-menu');
  const HAMBURGER = document.getElementById('hamburger');
  const YEAR_EL = document.getElementById('year');

  // ----- Sticky navbar scroll effect -----
  function onScroll() {
    if (window.scrollY > 20) {
      NAVBAR?.classList.add('scrolled');
    } else {
      NAVBAR?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ----- Mobile hamburger menu -----
  function toggleMenu() {
    const isOpen = NAV_MENU?.classList.toggle('is-open');
    HAMBURGER?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    NAV_MENU?.classList.remove('is-open');
    HAMBURGER?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  HAMBURGER?.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link (anchor on same page)
  NAV_MENU?.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (NAV_MENU.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (NAV_MENU?.classList.contains('is-open') && !NAV_MENU.contains(e.target) && !HAMBURGER?.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ----- Smooth scroll for anchor links (when target is on same page) -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Footer year -----
  if (YEAR_EL) {
    YEAR_EL.textContent = new Date().getFullYear();
  }
})();
