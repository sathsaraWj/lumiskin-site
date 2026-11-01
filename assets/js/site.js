(function () {
  'use strict';

  var config = window.LUMISKIN_CONFIG || {};
  var root = document.documentElement;

  // ── Store links ────────────────────────────────────────────────────────
  // Every Android CTA is marked [data-download="<placement>"] and gets its URL
  // from config.js. Clicks emit a "lumiskin:download" event with the
  // placement; no analytics is loaded by this site.
  var androidUrl = config.android && config.android.url;
  document.querySelectorAll('[data-download]').forEach(function (link) {
    if (androidUrl) link.href = androidUrl;
    link.addEventListener('click', function () {
      var detail = { store: 'google_play', placement: link.getAttribute('data-download') };
      document.dispatchEvent(new CustomEvent('lumiskin:download', { detail: detail }));
    });
  });

  var iosLabel = (config.ios && config.ios.statusLabel) || 'iOS coming soon';
  document.querySelectorAll('[data-ios-status]').forEach(function (el) {
    el.textContent = iosLabel;
  });

  // ── Platform hints (messaging only — never redirects) ─────────────────
  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  root.setAttribute('data-platform', isIOS ? 'ios' : isAndroid ? 'android' : 'desktop');

  // ── Header: scrolled state ────────────────────────────────────────────
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile menu ───────────────────────────────────────────────────────
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.getElementById('site-menu');
  var mobileQuery = window.matchMedia('(max-width: 859px)');

  // In DOM order: the panel's links come first, the toggle button last.
  function focusables() {
    return Array.prototype.slice.call(panel.querySelectorAll('a[href], button:not([disabled])')).concat(toggle);
  }

  function setMenu(open, opts) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) {
      var first = panel.querySelector('a[href]');
      if (first) first.focus();
    } else if (opts && opts.returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  panel.addEventListener('click', function (e) {
    if (e.target.closest('a') && mobileQuery.matches) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') {
      setMenu(false, { returnFocus: true });
      return;
    }
    if (e.key === 'Tab') {
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener('click', function (e) {
    if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(e.target)) setMenu(false);
  });

  mobileQuery.addEventListener('change', function (e) {
    if (!e.matches) setMenu(false);
  });

  // ── Scroll reveal ─────────────────────────────────────────────────────
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    root.classList.add('js-reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { observer.observe(el); });
  }

  // ── Footer year ───────────────────────────────────────────────────────
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
