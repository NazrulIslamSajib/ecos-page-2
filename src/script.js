document.addEventListener('DOMContentLoaded', function () { 
 /* header*/ 
 /* header*/ 
  const toggle = document.getElementById('menu-toggle');
      const closeBtn = document.getElementById('menu-close');
      const menu = document.getElementById('mobile-menu');
      const submenuToggles = menu.querySelectorAll('.submenu-toggle');

      /* ---------- Open / close the drawer ---------- */
      function setMenu(open, { restoreFocus = false } = {}) {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', open);
        document.body.classList.toggle('overflow-hidden', open); // lock page scroll behind the drawer

        if (open) {
          closeBtn.focus();
        } else {
          closeAllSubmenus();
          if (restoreFocus) toggle.focus();
        }
      }

      toggle.addEventListener('click', () => setMenu(true));
      closeBtn.addEventListener('click', () => setMenu(false, { restoreFocus: true }));

      /* ---------- Accordion submenus ---------- */
      function setSubmenu(button, open) {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        button.setAttribute('aria-expanded', open);
        button.querySelector('.chevron').classList.toggle('rotate-180', open);
        panel.hidden = !open;
      }

      function closeAllSubmenus() {
        submenuToggles.forEach((btn) => setSubmenu(btn, false));
      }

      submenuToggles.forEach((btn) => {
        btn.addEventListener('click', () => {
          const willOpen = btn.getAttribute('aria-expanded') !== 'true';
          closeAllSubmenus();          // only one open at a time
          setSubmenu(btn, willOpen);
        });
      });

      /* ---------- Close on Escape ---------- */
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.hidden) {
          setMenu(false, { restoreFocus: true });
        }
      });

      /* ---------- Close when clicking outside the drawer ---------- */
      document.addEventListener('click', (e) => {
        if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) {
          setMenu(false);
        }
      });

      /* ---------- Close when resizing up to desktop ---------- */
      window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
        if (e.matches) setMenu(false);
      });




  /* ---------- Product gallery (second page) ---------- */
  var mainEl = document.querySelector('#main-slider');
  var thumbEl = document.querySelector('#thumb-slider');

  if (mainEl && thumbEl) {

    // Build thumbnails from the main images (skip the first one)
    var thumbList = thumbEl.querySelector('.splide__list');
    // Build thumbnails from the main images (skip the first one)
    var thumbList = thumbEl.querySelector('.splide__list');
    mainEl.querySelectorAll('.splide__slide img').forEach(function (img, i) {
      if (i === 0) return;

      var li = document.createElement('li');
      li.className = 'splide__slide overflow-hidden rounded-xl';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'thumb-btn block h-full w-full cursor-pointer ' +
        'focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-blue';
      btn.setAttribute('aria-label', 'Show image ' + (i + 1) + ': ' + img.alt);
      btn.dataset.index = i; // index in the MAIN slider

      var t = document.createElement('img');
      t.src = img.getAttribute('src');
      t.alt = '';
      t.className = 'block h-full w-full object-cover';

      btn.appendChild(t);
      li.appendChild(btn);
      thumbList.appendChild(li);
    });

    var main = new Splide('#main-slider', {
      type: 'fade',
      rewind: true,
      arrows: false,
      pagination: false,
    }).mount();

    var thumbs = new Splide('#thumb-slider', {
      direction: 'ttb',
      height: '100%',
      fixedHeight: 124,
      gap: 10,
      arrows: false,
      pagination: false,
      cover: true,
      rewind: true,
      breakpoints: {
        639: {
          direction: 'ltr',
          height: 'auto',
          fixedWidth: 100,
          fixedHeight: 100,
        },
      },
    }).mount();

    // Thumbnail click -> matching main image (offset 1 because the first image has no thumbnail)
    thumbEl.querySelectorAll('.thumb-btn').forEach(function (btn, n) {
      btn.addEventListener('click', function () {
        main.go(Number(btn.dataset.index));
      });

      // Keep the focused thumbnail scrolled into view when tabbing
      btn.addEventListener('focus', function () {
        thumbs.go(n);
      });
    });

    // Cyan arrow scrolls the thumbnails
    document.getElementById('thumb-next').addEventListener('click', function () {
      thumbs.go('+1');
    });
  }

  /* ---------- Social section (first page) ---------- */
  if (document.querySelector('#social-slider')) {
    new Splide('#social-slider', {
      type: 'loop',
      perPage: 6,
      perMove: 1,
      gap: '0.75rem',
      arrows: false,
      pagination: false,
      drag: 'free',
      padding: { left: '0.5rem', right: '0.5rem' },
      breakpoints: {
        1280: { perPage: 5 },
        1024: { perPage: 4 },
        768: { perPage: 3 },
        480: { perPage: 2 },
      },
    }).mount();
  }

  const variantButtons = document.querySelectorAll('.variant-btn');

  variantButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      variantButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
    });
  });
});