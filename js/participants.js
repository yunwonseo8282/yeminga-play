/**
 * 테스트별 참여자 수 조회 함수
 *
 * TODO: 나중에 이 함수 내부를 Firestore 조회로 교체
 *
 * 현재는 Firebase 세팅 전이므로 더미 숫자를 반환한다.
 * 교체 시 함수 시그니처(testId → number)는 그대로 유지할 것.
 */

/** 더미 참여자 수 데이터 (testId: count) */
const DUMMY_PARTICIPANTS = {
  "spending-type": 12345
};

/**
 * @param {string} testId - TESTS 배열의 id 와 일치하는 테스트 식별자
 * @returns {number} 참여자 수 (알 수 없는 id 면 0)
 */
function getParticipantCount(testId) {
  return DUMMY_PARTICIPANTS[testId] ?? 0;
}

window.getParticipantCount = getParticipantCount;
