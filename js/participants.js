import { db } from '/js/firebase-init.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

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

window.getParticipantCount = getParticipantCount;
