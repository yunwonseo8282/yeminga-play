(function () {
  'use strict';

  var params   = new URLSearchParams(location.search);
  var typeCode = params.get('type') || '';
  var percent  = params.get('p')    || '';
  var root     = document.getElementById('detail-root');

  if (!typeCode) {
    showError();
    return;
  }

  var fileName = typeCode.replace(/[^a-zA-Z]/g, '').toLowerCase();
  var backUrl  = '/result/spending-type.html?type='
    + encodeURIComponent(typeCode) + '&p=' + encodeURIComponent(percent);

  fetch('/data/types/' + fileName + '.json')
    .then(function (res) {
      if (!res.ok) throw new Error('not found');
      return res.json();
    })
    .then(renderDetail)
    .catch(showError);

  function showError() {
    root.innerHTML =
      '<div class="result-error-state">'
      + '<p>리포트를 불러올 수 없어요</p>'
      + '<a class="btn btn--secondary btn--sm" href="/test/spending-type.html">테스트 하러 가기</a>'
      + '</div>';
  }

  function renderDetail(data) {
    root.innerHTML =
      '<p class="result-detail-back">'
      +   '<a href="' + backUrl + '">← 결과로 돌아가기</a>'
      + '</p>'
      + '<header class="result-detail-header">'
      +   '<h1 class="result-detail-code">' + esc(data.code) + '</h1>'
      +   '<p class="result-detail-nickname">' + esc(data.nickname) + '</p>'
      + '</header>'
      + buildReport(data.sections);

    setupAccordions();
  }

  function buildReport(sections) {
    if (!Array.isArray(sections) || !sections.length) {
      return '<section class="result-report"><p>리포트 내용이 없어요</p></section>';
    }

    var items = sections.map(function (sec) {
      return '<div class="accordion-item">'
        + '<button class="accordion-header" aria-expanded="false">'
        +   '<span class="accordion-title">' + sec.emoji + ' ' + esc(sec.title) + '</span>'
        +   '<span class="accordion-arrow" aria-hidden="true"></span>'
        + '</button>'
        + '<div class="accordion-body">'
        +   '<div class="accordion-body-inner">'
        +     renderBody(sec.body)
        +   '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    return '<section class="result-report" id="rReport">'
      + '<h2 class="result-report-title">심층 리포트</h2>'
      + items
      + '</section>';
  }

  function renderBody(text) {
    var lines  = text.split('\n');
    var html   = '';
    var inPara = false;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.slice(0, 5) === '#### ') {
        if (inPara) { html += '</p>'; inPara = false; }
        html += '<h4 class="rpt-h4">' + fmt(line.slice(5)) + '</h4>';
      } else if (line.slice(0, 4) === '### ') {
        if (inPara) { html += '</p>'; inPara = false; }
        html += '<h3 class="rpt-h3">' + fmt(line.slice(4)) + '</h3>';
      } else if (line === '') {
        if (inPara) { html += '</p>'; inPara = false; }
      } else {
        if (!inPara) { html += '<p>'; inPara = true; }
        else { html += '<br>'; }
        html += fmt(line);
      }
    }
    if (inPara) html += '</p>';
    return html;
  }

  function setupAccordions() {
    document.querySelectorAll('.accordion-header').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var body   = this.nextElementSibling;
        var isOpen = this.classList.contains('is-open');
        if (!isOpen) {
          body.style.maxHeight = body.scrollHeight + 'px';
          this.classList.add('is-open');
          this.setAttribute('aria-expanded', 'true');
        } else {
          body.style.maxHeight = '0';
          this.classList.remove('is-open');
          this.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function fmt(str) {
    return esc(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
