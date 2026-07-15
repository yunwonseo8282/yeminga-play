import { auth } from '/js/firebase-init.js';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  linkWithRedirect,
  getRedirectResult,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';

let loginBtn = null;
let loginWrap = null;
let accountMenu = null;
let clickHandler = null;
let outsideClickHandler = null;

function ensureMenuDom() {
  if (!loginBtn || loginWrap) return;

  loginWrap = document.createElement('div');
  loginWrap.className = 'play-login-wrap';
  loginBtn.parentNode.insertBefore(loginWrap, loginBtn);
  loginWrap.appendChild(loginBtn);

  accountMenu = document.createElement('div');
  accountMenu.className = 'play-account-menu';
  accountMenu.hidden = true;
  accountMenu.innerHTML =
    '<p class="play-account-greet"></p>'
    + '<button type="button" class="play-account-item" data-action="archive">결과 보관함</button>'
    + '<button type="button" class="play-account-item" data-action="logout">로그아웃</button>';
  loginWrap.appendChild(accountMenu);

  accountMenu.addEventListener('click', function (e) {
    var item = e.target.closest('[data-action]');
    if (!item) return;
    var action = item.getAttribute('data-action');
    if (action === 'archive') {
      closeMenu();
      location.href = '/my-results.html';
    } else if (action === 'logout') {
      closeMenu();
      signOut(auth)
        .then(function () {
          console.log('로그아웃 성공');
        })
        .catch(function (e) {
          console.error('로그아웃 실패:', e.code || e.message, e.message);
        });
    }
  });
}

function openMenu() {
  if (!accountMenu) return;
  accountMenu.hidden = false;
  loginBtn.setAttribute('aria-expanded', 'true');
  setTimeout(function () {
    outsideClickHandler = function (e) {
      if (loginWrap && !loginWrap.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('click', outsideClickHandler);
  }, 0);
}

function closeMenu() {
  if (!accountMenu) return;
  accountMenu.hidden = true;
  loginBtn.setAttribute('aria-expanded', 'false');
  if (outsideClickHandler) {
    document.removeEventListener('click', outsideClickHandler);
    outsideClickHandler = null;
  }
}

function setClickHandler(handler) {
  if (!loginBtn) return;
  if (clickHandler) {
    loginBtn.removeEventListener('click', clickHandler);
  }
  clickHandler = handler;
  loginBtn.addEventListener('click', clickHandler);
}

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const user = auth.currentUser;

  try {
    if (user && user.isAnonymous) {
      await linkWithRedirect(user, provider);
    } else {
      await signInWithRedirect(auth, provider);
    }
  } catch (e) {
    if (user && user.isAnonymous) {
      console.error('익명→구글 리디렉션 실패:', e.code || e.message, e.message);
    } else {
      console.error('로그인 리디렉션 실패:', e.code || e.message, e.message);
    }
  }
}

function bindLoggedOut() {
  if (!loginBtn) return;
  closeMenu();
  loginBtn.textContent = '로그인';
  loginBtn.disabled = false;
  loginBtn.setAttribute('aria-expanded', 'false');
  setClickHandler(function () {
    signInWithGoogle();
  });
}

function bindLoggedIn(user) {
  if (!loginBtn) return;
  ensureMenuDom();
  closeMenu();

  var greet = accountMenu.querySelector('.play-account-greet');
  if (greet) {
    greet.textContent = (user.displayName || '회원') + ' 안녕?';
  }

  loginBtn.textContent = '내 정보';
  loginBtn.disabled = false;
  setClickHandler(function (e) {
    e.stopPropagation();
    if (accountMenu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });
}

function setupAuthStateListener() {
  onAuthStateChanged(auth, function (user) {
    if (user && !user.isAnonymous) {
      console.log('로그인 상태:', user.displayName || user.email);
      bindLoggedIn(user);
    } else {
      if (user && user.isAnonymous) {
        console.log('익명 세션:', user.uid);
      } else {
        console.log('로그아웃 상태');
        signInAnonymously(auth)
          .then(function (result) {
            console.log('익명 로그인 성공:', result.user.uid);
          })
          .catch(function (e) {
            console.error('익명 로그인 실패:', e.code || e.message, e.message);
          });
      }
      bindLoggedOut();
    }
  });
}

async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log('구글 연결/로그인 성공:', result.user.displayName || result.user.email);
    }
  } catch (e) {
    if (e.code === 'auth/credential-already-in-use') {
      console.log('이미 존재하는 구글 계정 → 기존 계정으로 로그인');
      try {
        await signInWithRedirect(auth, new GoogleAuthProvider());
      } catch (e2) {
        console.error('기존 계정 리디렉션 실패:', e2.code || e2.message, e2.message);
      }
      return;
    }
    console.error('구글 연결/로그인 실패:', e.code || e.message, e.message);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  loginBtn = document.querySelector('.play-login-btn');
  if (!loginBtn) return;

  await handleRedirectResult();
  setupAuthStateListener();
});
