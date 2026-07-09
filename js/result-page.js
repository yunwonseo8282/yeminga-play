(function () {
  'use strict';

  var params   = new URLSearchParams(location.search);
  var typeCode = params.get('type') || '';
  var percent  = params.get('p')    || '';
  var root     = document.getElementById('result-root');

  if (!typeCode) {
    showError();
    return;
  }

  var fileName = typeCode.replace(/[^a-zA-Z]/g, '').toLowerCase();

  fetch('/data/types/' + fileName + '.json')
    .then(function (res) {
      if (!res.ok) throw new Error('not found');
      return res.json();
    })
    .then(renderResult)
    .catch(showError);

  /* ── 에러 ─────────────────────────────────────── */
  function showError() {
    root.innerHTML =
      '<div class="result-error-state">'
      + '<p>결과를 불러올 수 없어요</p>'
      + '<a class="btn btn--secondary btn--sm" href="/">처음으로 돌아가기</a>'
      + '</div>';
  }

  /* ── 메인 렌더 ────────────────────────────────── */
  function renderResult(data) {
    root.innerHTML =
      buildCard(data)
      + buildSummary(data.summary)
      + buildUnlock()
      + buildReport(data.sections);

    /* 이미지 onerror 처리 */
    var img = document.getElementById('rImg');
    if (img) {
      img.onerror = function () {
        var wrap = document.getElementById('rImgWrap');
        if (wrap) wrap.hidden = true;
      };
    }

    /* 잠금 해제 버튼 */
    document.getElementById('rUnlockBtn').addEventListener('click', function () {
      document.getElementById('rUnlock').hidden = true;
      var report = document.getElementById('rReport');
      report.removeAttribute('hidden');
      setTimeout(function () {
        report.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });

    /* 아코디언 */
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

  /* ── (A) 수집 카드 (티어별) ──────────────────── */
  function buildCard(data) {
    var tier      = data.tier || 'N';
    var tierClass = 'card-tier-' + tier.replace(/[^A-Za-z]/g, '');

    var tagsHtml = '';
    if (Array.isArray(data.tags) && data.tags.length) {
      tagsHtml = '<div class="rc-tags">'
        + data.tags.map(function (t) {
            return '<span class="rc-tag">' + esc(t) + '</span>';
          }).join('')
        + '</div>';
    }

    return '<div class="result-card ' + tierClass + '">'
      + '<div class="rc-header"><span class="rc-tier-badge">' + esc(tier) + '</span></div>'
      + '<h1 class="rc-code">' + esc(data.code) + '</h1>'
      + '<p class="rc-nickname">' + esc(data.nickname) + '</p>'
      + '<div class="rc-img-wrap" id="rImgWrap">'
      +   '<img class="rc-img" id="rImg"'
      +     ' src="/images/results/spending-type/' + esc(fileName) + '.png"'
      +     ' alt="' + esc(data.code) + '" width="240" height="240">'
      + '</div>'
      + '<blockquote class="rc-quote">' + esc(data.quote) + '</blockquote>'
      + tagsHtml
      + '<div class="rc-match-wrap">'
      +   '<p class="rc-match">일치도 <strong>' + esc(percent) + '%</strong></p>'
      +   '<div class="rc-progress" role="progressbar"'
      +     ' aria-valuenow="' + esc(percent) + '"'
      +     ' aria-valuemin="0" aria-valuemax="100">'
      +     '<div class="rc-progress-fill" style="width:' + (parseFloat(percent) || 0) + '%;"></div>'
      +   '</div>'
      + '</div>'
      + '<p class="rc-source">🔍 검색창에 \'예밍아놀자\'</p>'
      + '</div>';
  }

  /* ── (B) 요약 ─────────────────────────────────── */
  function buildSummary(text) {
    var paras = text.split('\n\n').map(function (para) {
      return '<p>' + inlineFmt(para) + '</p>';
    });
    return '<section class="result-summary">' + paras.join('') + '</section>';
  }

  /* ── (C) 잠금 해제 버튼 ───────────────────────── */
  function buildUnlock() {
    return '<div class="result-unlock" id="rUnlock">'
      + '<button class="btn btn--primary btn--lg" id="rUnlockBtn">'
      +   '🔓 상세 리포트 잠금 해제'
      + '</button>'
      + '<p class="result-unlock-note">현재 무료 오픈 중 (추후 유료 전환 예정)</p>'
      + '</div>';
  }

  /* ── (D) 심층 리포트 아코디언 ─────────────────── */
  function buildReport(sections) {
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

    return '<section class="result-report" id="rReport" hidden>'
      + '<h2 class="result-report-title">심층 리포트</h2>'
      + items
      + '</section>';
  }

  /* ── body 텍스트 → HTML ───────────────────────── */
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

  /* ── 포매팅 헬퍼 ──────────────────────────────── */
  function inlineFmt(str) {
    return esc(str)
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
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
