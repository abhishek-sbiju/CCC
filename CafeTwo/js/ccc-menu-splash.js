(function () {
  'use strict';

  var MIN_MS = 1100;
  var MAX_MS = 1600;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var splash = document.getElementById('ccc-menu-splash');
    if (!splash) return;

    var triggers = document.querySelectorAll('.js-menu-redirect');
    if (!triggers.length) return;

    function launch(url) {
      splash.classList.add('is-visible');
      document.documentElement.classList.add('ccc-splash-on');

      var delay = MIN_MS + Math.random() * (MAX_MS - MIN_MS);

      window.setTimeout(function () {
        window.location.href = url;
      }, delay);
    }

    Array.prototype.forEach.call(triggers, function (el) {
      el.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        var href = el.getAttribute('href');
        if (!href) return;
        e.preventDefault();
        launch(href);
      });
    });

    window.addEventListener('pageshow', function (evt) {
      if (evt.persisted) {
        splash.classList.remove('is-visible');
        document.documentElement.classList.remove('ccc-splash-on');
      }
    });
  });
})();
