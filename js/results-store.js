import { db, auth } from '/js/firebase-init.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

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
 * 로그인 사용자의 저장된 테스트 결과 전체 조회.
 * 비로그인 시 빈 배열 반환.
 *
 * @returns {Promise<Array<{ testId: string, typeCode: string, percent: string, createdAt: * }>>}
 */
export async function getMyResults() {
  const user = await waitForAuthUser();
  if (!user) return [];

  try {
    const snap = await getDocs(collection(db, 'users', user.uid, 'results'));
    const results = snap.docs.map(function (docSnap) {
      const data = docSnap.data();
      return {
        testId: data.testId,
        typeCode: data.typeCode,
        percent: data.percent,
        createdAt: data.createdAt
      };
    });
    console.log('결과 조회 성공:', results.length, '건');
    return results;
  } catch (e) {
    console.error('결과 조회 실패:', e.code || e.message, e.message);
    return [];
  }
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

/**
 * 결과 페이지 URL의 type/p 파라미터를 읽어 로그인 계정에 저장.
 * 외부 브라우저 전환 후 로그인 시 익명 uid 유실 보완용.
 */
export async function saveResultFromUrl() {
  const params = new URLSearchParams(location.search);
  const typeCode = params.get('type') || '';
  const percent = params.get('p') || '';

  const isResultPage =
    location.pathname.indexOf('/result/') !== -1 || params.has('type');
  if (!isResultPage || !typeCode) return;

  const pathSegment = location.pathname.split('/').pop() || '';
  const testId = pathSegment.replace(/\.html$/i, '');
  if (!testId) return;

  // 새 테스트 추가 시 KNOWN_TEST_IDS 에 슬러그를 등록할 것
  const KNOWN_TEST_IDS = ['spending-type', 'friendship-code'];
  if (!KNOWN_TEST_IDS.includes(testId)) {
    console.warn('URL 결과 재저장 skip: 알 수 없는 testId', testId);
    return;
  }

  try {
    console.log('URL 결과 재저장 시작:', testId, typeCode, percent);
    await saveResult(testId, { typeCode: typeCode, percent: percent });
    console.log('URL 결과 재저장 완료:', testId, typeCode, percent);
  } catch (e) {
    console.error('URL 결과 재저장 실패:', e.code || e.message, e.message);
  }
}
