document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Product gallery (second page) ---------- */
  var mainEl = document.querySelector('#main-slider');
  var thumbEl = document.querySelector('#thumb-slider');

  if (mainEl && thumbEl) {

    // Build thumbnails from the main images (skip the first one)
    var thumbList = thumbEl.querySelector('.splide__list');
    mainEl.querySelectorAll('.splide__slide img').forEach(function (img, i) {
      if (i === 0) return;
      var li = document.createElement('li');
      li.className = 'splide__slide cursor-pointer overflow-hidden rounded-xl';
      var t = document.createElement('img');
      t.src = img.getAttribute('src');
      t.alt = '';
      t.className = 'block h-full w-full object-cover';
      li.appendChild(t);
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
    thumbs.on('click', function (slide) {
      main.go(slide.index + 1);
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
        768:  { perPage: 3 },
        480:  { perPage: 2 },
      },
    }).mount();
  }

});