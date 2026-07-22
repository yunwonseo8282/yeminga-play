import { auth } from '/js/firebase-init.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
import { getMyResults } from '/js/results-store.js';
import { handleInAppBrowser } from '/js/inapp-browser.js';

(function () {
  'use strict';

  var TEST_NAMES = {
    'spending-type': 'MBUY 소비 유형 테스트',
    'friendship-code': 'FC코드 우정 케미 테스트'
  };

  var RESULT_URLS = {
    'spending-type': '/result/spending-type.html',
    'friendship-code': '/result/friendship-code.html'
  };

  var listEl = document.getElementById('myResultsList');
  var promptEl = document.getElementById('myResultsLoginPrompt');
  var loginBtn = document.getElementById('myResultsLoginBtn');

  if (loginBtn) {
    loginBtn.addEventListener('click', async function () {
      if (handleInAppBrowser()) return;
      try {
        var result = await signInWithPopup(auth, new GoogleAuthProvider());
        console.log('로그인 성공:', result.user.displayName || result.user.email);
        await render();
      } catch (e) {
        console.error('로그인 실패:', e.code || e.message, e.message);
      }
    });
  }

  function waitForAuthUser() {
    if (auth.currentUser) {
      return Promise.resolve(auth.currentUser);
    }
    return new Promise(function (resolve) {
      var unsub = onAuthStateChanged(auth, function (user) {
        unsub();
        resolve(user);
      });
    });
  }

  function showPrompt() {
    if (promptEl) promptEl.hidden = false;
    if (listEl) listEl.innerHTML = '';
  }

  function hidePrompt() {
    if (promptEl) promptEl.hidden = true;
  }

  function buildResultUrl(item) {
    var base = RESULT_URLS[item.testId];
    if (!base) return '/';
    return base + '?type=' + encodeURIComponent(item.typeCode)
      + '&p=' + encodeURIComponent(item.percent)
      + '&from=my';
  }

  function renderEmpty() {
    if (!listEl) return;
    listEl.innerHTML =
      '<div class="my-results-empty">'
      + '<p>아직 저장된 결과가 없어!</p>'
      + '<p class="my-results-empty-sub">테스트 하고 결과를 모아봐</p>'
      + '<div class="my-results-empty-actions">'
      + '<a class="btn btn--primary btn--md" href="/test/spending-type.html">테스트 하러 가기</a>'
      + '<a class="btn btn--secondary btn--md" href="/">메인으로</a>'
      + '</div>'
      + '</div>';
  }

  function renderList(results) {
    if (!listEl) return;
    if (!results.length) {
      renderEmpty();
      return;
    }

    listEl.innerHTML = results.map(function (item) {
      var testName = TEST_NAMES[item.testId] || item.testId;
      var url = buildResultUrl(item);
      return '<a class="my-results-card" href="' + esc(url) + '">'
        + '<span class="my-results-card-test">' + esc(testName) + '</span>'
        + '<span class="my-results-card-type">' + esc(item.typeCode) + '</span>'
        + '<span class="my-results-card-percent">일치도 ' + esc(item.percent) + '%</span>'
        + '</a>';
    }).join('');
  }

  async function render() {
    var user = await waitForAuthUser();
    if (!user || user.isAnonymous) {
      showPrompt();
      return;
    }

    hidePrompt();
    if (listEl) {
      listEl.innerHTML =
        '<div class="test-loading">'
        + '<div class="test-loading-spinner"></div>'
        + '<p class="test-loading-text">결과 불러오는 중…</p>'
        + '</div>';
    }

    var results = await getMyResults();
    renderList(results);
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  render();
})();
