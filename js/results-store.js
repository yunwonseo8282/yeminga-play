import { db, auth } from '/js/firebase-init.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
import { doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

const AUTH_WAIT_MS = 5000;

/**
 * Firebase Auth 세션 복원이 끝날 때까지 사용자를 반환.
 * currentUser 가 이미 있으면 즉시 반환, 없으면 onAuthStateChanged 첫 콜백 대기.
 * @returns {Promise<import('firebase/auth').User | null>}
 */
function waitForAuthUser() {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser);
  }

  return new Promise(function (resolve) {
    var settled = false;
    var unsubscribe;

    var timer = setTimeout(function () {
      if (settled) return;
      settled = true;
      if (unsubscribe) unsubscribe();
      resolve(null);
    }, AUTH_WAIT_MS);

    unsubscribe = onAuthStateChanged(auth, function (user) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      unsubscribe();
      resolve(user);
    });
  });
}

/**
 * 로그인 사용자의 테스트 결과를 users/{uid}/results/{testId} 에 저장.
 * 비로그인 시 조용히 return. 문서 ID = testId (재실행 시 덮어쓰기).
 *
 * @param {string} testId
 * @param {{ typeCode: string, percent: string }} resultData
 */
export async function saveResult(testId, resultData) {
  const user = await waitForAuthUser();
  if (!user) {
    console.log('결과 저장 skip: 비로그인');
    return;
  }

  try {
    await setDoc(doc(db, 'users', user.uid, 'results', testId), {
      testId: testId,
      typeCode: resultData.typeCode,
      percent: resultData.percent,
      createdAt: serverTimestamp()
    });
    console.log('결과 저장 성공:', testId, resultData.typeCode, resultData.percent);
  } catch (e) {
    console.error('결과 저장 실패:', e.code || e.message, e.message);
  }
}
