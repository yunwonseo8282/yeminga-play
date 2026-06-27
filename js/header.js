(function () {
  const header = document.getElementById('playHeader');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 60) {
      header.classList.remove('is-hidden');
    } else if (currentScrollY > lastScrollY) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
})();
