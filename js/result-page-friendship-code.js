import { saveResult } from '/js/results-store.js';
import { incrementCompleted } from '/js/participants.js';
import { auth } from '/js/firebase-init.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';

(function () {
  'use strict';

  var params   = new URLSearchParams(location.search);
  var typeCode = params.get('type') || '';
  var percent  = params.get('p')    || '';

  // 진입 경로 판별: 테스트 완료(from=test) 또는 내 보관함(from=my) 이면 본인 -> 버튼 숨김
  var fromParam    = params.get('from');
  var isOwnerView  = fromParam === 'test' || fromParam === 'my';

  var root     = document.getElementById('result-root');
  var cardRoot = document.getElementById('result-card-root');
  var matchHint = document.querySelector('.result-match-hint');

  if (!typeCode) {
    showError();
    return;
  }

  var fileName = typeCode.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  fetch('/data/types-friendship-code/' + fileName + '.json')
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
  async function renderResult(data) {
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
      img.src = '/images/results/friendship-code/' + fileName + '.png';
      img.onerror = function () {
        var wrap = document.getElementById('rImgWrap');
        if (wrap) wrap.hidden = true;
      };
    }

    await saveResult('friendship-code', { typeCode: typeCode, percent: percent });
    await incrementCompleted('friendship-code');
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'test_complete', {
        test_id: 'friendship-code',
        result_type: typeCode,
        match_percent: percent
      });
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
    var goTestUrl = '/test/friendship-code';
    return '<div class="result-actions">'
      + '<button type="button" class="btn btn--secondary btn--sm result-action-btn" id="rKakaoShareBtn">💬 카카오톡 공유</button>'
      + '<button type="button" class="btn btn--secondary btn--sm result-action-btn" id="rCopyLinkBtn">🔗 링크 복사</button>'
      + '</div>'
      + '<a class="btn btn--primary btn--lg result-cta-btn"'
      + (isOwnerView ? ' style="display:none"' : '')
      + ' href="' + goTestUrl + '" id="rGoTestBtn">나는 무슨 우정 유형일까?</a>';
  }

  function setupActions(data) {
    var shareUrl = 'https://test.yeminga.com/result/friendship-code.html?type='
      + encodeURIComponent(typeCode) + '&p=' + encodeURIComponent(percent);
    var testUrl = 'https://test.yeminga.com/test/friendship-code';
    var imageUrl = 'https://test.yeminga.com/images/results/friendship-code/' + fileName + '.png';

    var kakaoBtn = document.getElementById('rKakaoShareBtn');
    if (kakaoBtn) {
      kakaoBtn.addEventListener('click', function () {
        if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
          console.warn('Kakao SDK가 초기화되지 않았습니다.');
          return;
        }
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'share_click', {
            test_id: 'friendship-code',
            method: 'kakao'
          });
        }
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '나의 우정 유형은?',
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
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'share_click', {
            test_id: 'friendship-code',
            method: 'link_copy'
          });
        }
        navigator.clipboard.writeText(shareUrl)
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

    // 로그인 저장 안내 - 클릭 시 헤더 로그인 버튼 재사용
    var loginSaveBtn = document.getElementById('rLoginSaveBtn');
    if (loginSaveBtn) {
      loginSaveBtn.addEventListener('click', function () {
        var headerLoginBtn = document.querySelector('.play-login-btn');
        if (headerLoginBtn) headerLoginBtn.click();
      });
    }

    // 구글 로그인 상태면 안내 영역 숨김 (기본은 표시)
    onAuthStateChanged(auth, function (user) {
      if (user && !user.isAnonymous) {
        var box = document.getElementById('rLoginSave');
        if (box) box.style.display = 'none';
      }
    });
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
    var detailUrl = '/result/friendship-code-detail.html?type='
      + encodeURIComponent(typeCode) + '&p=' + encodeURIComponent(percent);
    return '<div class="result-unlock" id="rUnlock">'
      + '<a class="btn btn--primary btn--lg" href="' + detailUrl + '">'
      +   '🔓 상세 리포트 보기'
      + '</a>'
      + '<p class="result-unlock-note">현재 무료 오픈 중 (추후 유료 전환 예정)</p>'
      + '</div>'
      + '<div class="result-login-save" id="rLoginSave">'
      + '<p class="result-login-save-text">💡 로그인하면 내 결과를 언제든 다시 볼 수 있어!</p>'
      + '<button type="button" class="btn btn--secondary btn--sm" id="rLoginSaveBtn">🔒 로그인하기</button>'
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
