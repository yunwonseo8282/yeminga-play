(function () {
  'use strict';

  var footer = document.getElementById('playFooter');
  if (!footer) return;

  footer.innerHTML =
    '<div class="container">'
    + '<nav class="play-footer-nav">'
    + '<a href="/about.html">소개</a>'
    + '<a href="/privacy.html">개인정보처리방침</a>'
    + '<a href="/terms.html">이용약관</a>'
    + '<a href="/about.html#contact">문의</a>'
    + '</nav>'
    + '<p class="play-footer-copy">© 2026 예밍아놀자</p>'
    + '</div>';
})();
