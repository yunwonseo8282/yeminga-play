import { auth } from '/js/firebase-init.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';

let loginBtn = null;
let clickHandler = null;

function setClickHandler(handler) {
  if (!loginBtn) return;
  if (clickHandler) {
    loginBtn.removeEventListener('click', clickHandler);
  }
  clickHandler = handler;
  loginBtn.addEventListener('click', clickHandler);
}

function bindLoggedOut() {
  if (!loginBtn) return;
  loginBtn.textContent = '로그인';
  loginBtn.disabled = false;
  setClickHandler(async function () {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log('로그인 성공:', result.user.displayName || result.user.email);
    } catch (e) {
      console.error('로그인 실패:', e.code || e.message, e.message);
    }
  });
}

function bindLoggedIn(user) {
  if (!loginBtn) return;
  loginBtn.textContent = user.displayName || '로그아웃';
  loginBtn.disabled = false;
  setClickHandler(async function () {
    try {
      await signOut(auth);
      console.log('로그아웃 성공');
    } catch (e) {
      console.error('로그아웃 실패:', e.code || e.message, e.message);
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
