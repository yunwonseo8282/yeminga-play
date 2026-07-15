import { db } from '/js/firebase-init.js';
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  increment
} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

/**
 * counters/{testId} 문서의 participantCount 필드를 읽어 반환.
 * 문서/필드 없으면 0, 에러 시 console.error 후 0 반환.
 *
 * @param {string} testId - TESTS 배열의 id 와 일치하는 테스트 식별자
 * @returns {Promise<number>}
 */
export async function getParticipantCount(testId) {
  try {
    const snap = await getDoc(doc(db, 'counters', testId));
    if (!snap.exists()) return 0;
    return snap.data().participantCount ?? 0;
  } catch (e) {
    console.error('참여자 수 조회 실패:', e);
    return 0;
  }
}

/**
 * counters/{testId} 문서의 지정 필드를 increment(1).
 * 문서가 없으면 setDoc merge 로 생성.
 *
 * @param {string} testId
 * @param {string} field
 */
async function incrementCounterField(testId, field) {
  const ref = doc(db, 'counters', testId);
  try {
    await updateDoc(ref, { [field]: increment(1) });
  } catch (e) {
    await setDoc(ref, { [field]: increment(1) }, { merge: true });
  }
}

/**
 * 화면용 참여자 수 증가. 브라우저당 같은 테스트는 한 번만 카운트.
 *
 * @param {string} testId
 */
export async function incrementParticipant(testId) {
  const storageKey = 'counted_' + testId;
  try {
    if (localStorage.getItem(storageKey)) return;

    await incrementCounterField(testId, 'participantCount');
    localStorage.setItem(storageKey, '1');
    console.log('참여자 수 증가 성공:', testId);
  } catch (e) {
    console.error('참여자 수 증가 실패:', e.code || e.message, e.message);
  }
}

/**
 * 내부용 완료 수 증가. 완료할 때마다 매번 +1.
 *
 * @param {string} testId
 */
export async function incrementCompleted(testId) {
  try {
    await incrementCounterField(testId, 'completedCount');
    console.log('완료 수 증가 성공:', testId);
  } catch (e) {
    console.error('완료 수 증가 실패:', e.code || e.message, e.message);
  }
}

window.getParticipantCount = getParticipantCount;
