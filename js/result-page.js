(function () {
  'use strict';

  var params   = new URLSearchParams(location.search);
  var typeCode = params.get('type') || '';
  var percent  = params.get('p')    || '';
  var root     = document.getElementById('result-root');
  var cardRoot = document.getElementById('result-card-root');
  var matchHint = document.querySelector('.result-match-hint');

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
    if (matchHint) matchHint.hidden = true;
    if (cardRoot) {
      cardRoot.innerHTML =
        '<div class="result-error-state">'
        + '<p>결과를 불러올 수 없어요</p>'
        + '<a class="btn btn--secondary btn--sm" href="/">처음으로 돌아가기</a>'
        + '</div>';
    }
    if (root) root.innerHTML = '';
  }

  /* ── 메인 렌더 ────────────────────────────────── */
  function renderResult(data) {
    if (matchHint) matchHint.hidden = false;
    if (cardRoot) cardRoot.innerHTML = buildCard(data);
    root.innerHTML =
      buildActions()
      + buildSummary(data.summary)
      + buildDetailLink();

    setupActions(data);

    /* 캐릭터 이미지 — crossOrigin을 src보다 먼저 설정 */
    var img = document.getElementById('rImg');
    if (img) {
      img.crossOrigin = 'anonymous';
      img.src = '/images/results/spending-type/' + fileName + '.png';
      img.onerror = function () {
        var wrap = document.getElementById('rImgWrap');
        if (wrap) wrap.hidden = true;
      };
    }

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
      +     ' crossorigin="anonymous"'
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

  /* ── (B) 공유 액션 버튼 ───────────────────────── */
  function buildActions() {
    return '<div class="result-actions">'
      + '<button type="button" class="btn btn--secondary btn--sm result-action-btn" id="rKakaoShareBtn">💬 카카오톡 공유</button>'
      + '<button type="button" class="btn btn--secondary btn--sm result-action-btn" id="rCopyLinkBtn">🔗 링크 복사</button>'
      + '</div>';
  }

  function setupActions(data) {
    var shareUrl = 'https://test.yeminga.com/result/spending-type.html?type='
      + encodeURIComponent(typeCode) + '&p=' + encodeURIComponent(percent);
    var testUrl = 'https://test.yeminga.com/test/spending-type';
    var imageUrl = 'https://test.yeminga.com/images/results/spending-type/' + fileName + '.png';

    var kakaoBtn = document.getElementById('rKakaoShareBtn');
    if (kakaoBtn) {
      kakaoBtn.addEventListener('click', function () {
        if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
          console.warn('Kakao SDK가 초기화되지 않았습니다.');
          return;
        }
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '나의 소비 유형은?',
            description: data.nickname + ' (' + data.code + ')',
            imageUrl: imageUrl,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl
            }
          },
          buttons: [
            {
              title: '친구 결과 보기',
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
              }
            },
            {
              title: '나도 테스트하기',
              link: {
                mobileWebUrl: testUrl,
                webUrl: testUrl
              }
            }
          ]
        });
      });
    }

    var copyBtn = document.getElementById('rCopyLinkBtn');

    if (copyBtn) {
      var originalText = copyBtn.textContent;
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(location.href)
          .then(function () {
            copyBtn.textContent = '복사됨!';
            setTimeout(function () {
              copyBtn.textContent = originalText;
            }, 2000);
          })
          .catch(function (err) {
            console.error('링크 복사 실패:', err);
          });
      });
    }
  }

  /* ── (C) 요약 ─────────────────────────────────── */
  function buildSummary(text) {
    var paras = text.split('\n\n').map(function (para) {
      return '<p>' + inlineFmt(para) + '</p>';
    });
    return '<section class="result-summary">' + paras.join('') + '</section>';
  }

  /* ── (D) 상세 리포트 이동 ─────────────────────── */
  function buildDetailLink() {
    var detailUrl = '/result/spending-type-detail.html?type='
      + encodeURIComponent(typeCode) + '&p=' + encodeURIComponent(percent);
    return '<div class="result-unlock" id="rUnlock">'
      + '<a class="btn btn--primary btn--lg" href="' + detailUrl + '">'
      +   '🔓 상세 리포트 보기'
      + '</a>'
      + '<p class="result-unlock-note">현재 무료 오픈 중 (추후 유료 전환 예정)</p>'
      + '</div>';
  }
  /* ── 포매팅 헬퍼 ──────────────────────────────── */
  function inlineFmt(str) {
    return esc(str)
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
