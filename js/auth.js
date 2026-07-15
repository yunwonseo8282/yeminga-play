import { auth } from '/js/firebase-init.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
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
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log('로그인 성공:', result.user.displayName || result.user.email);
  } catch (e) {
    console.error('로그인 실패:', e.code || e.message, e.message);
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

document.addEventListener('DOMContentLoaded', function () {
  loginBtn = document.querySelector('.play-login-btn');
  if (!loginBtn) return;

  onAuthStateChanged(auth, function (user) {
    if (user) {
      console.log('로그인 상태:', user.displayName || user.email);
      bindLoggedIn(user);
    } else {
      console.log('로그아웃 상태');
      bindLoggedOut();
    }
  });
});
