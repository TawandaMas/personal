/**
 * Site-wide motion orchestration.
 * Handles scroll reveals, staggered entrances, and page-load choreography.
 */
(function () {
  var revealObserver = null;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function revealAll(elements) {
    elements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  function setupStaggerContainers() {
    document.querySelectorAll('[data-reveal-stagger]').forEach(function (container) {
      Array.from(container.children).forEach(function (child, index) {
        child.style.setProperty('--stagger-index', String(index));
      });
    });
  }

  function revealAboveFold() {
    var threshold = window.innerHeight * 0.92;
    var delay = 0;

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (el.classList.contains('is-visible')) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < threshold) {
        var customDelay = el.dataset.revealDelay
          ? parseFloat(el.dataset.revealDelay)
          : delay;
        setTimeout(function (target) {
          target.classList.add('is-visible');
        }, customDelay * 1000, el);
        delay += 0.09;
      }
    });

    document.querySelectorAll('[data-reveal-stagger]').forEach(function (container) {
      if (container.classList.contains('is-visible')) return;
      var rect = container.getBoundingClientRect();
      if (rect.top < threshold) {
        var staggerDelay = container.dataset.revealDelay
          ? parseFloat(container.dataset.revealDelay)
          : 0;
        setTimeout(function (target) {
          target.classList.add('is-visible');
        }, staggerDelay * 1000, container);
      }
    });
  }

  function setupRevealObserver() {
    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (!el.classList.contains('is-visible')) {
        var rect = el.getBoundingClientRect();
        if (rect.top >= window.innerHeight * 0.92) {
          revealObserver.observe(el);
        }
      }
    });

    document.querySelectorAll('[data-reveal-stagger]').forEach(function (container) {
      if (!container.classList.contains('is-visible')) {
        var rect = container.getBoundingClientRect();
        if (rect.top >= window.innerHeight * 0.92) {
          revealObserver.observe(container);
        }
      }
    });
  }

  function initMotion() {
    if (prefersReducedMotion()) {
      revealAll(document.querySelectorAll('[data-reveal], [data-reveal-stagger]'));
      document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
        el.classList.add('active');
      });
      return;
    }

    setupStaggerContainers();
    revealAboveFold();
    setupRevealObserver();
  }

  document.addEventListener('astro:page-load', initMotion);
  document.addEventListener('DOMContentLoaded', initMotion);
})();
