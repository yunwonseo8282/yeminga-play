/**
 * 테스트 목록 데이터
 *
 * 새 테스트를 추가하려면 아래 배열에 객체 하나를 추가하면 됨.
 * 필드 설명:
 *   id            - 테스트 고유 식별자 (participants.js 의 더미 데이터 키와 일치시킬 것)
 *   name          - 카드에 표시될 테스트 이름
 *   thumbnail     - 카드 썸네일 이미지 경로 (/images/ 하위에 넣을 것)
 *   desc          - 카드 한 줄 설명
 *   duration      - 예상 소요 시간 (예: "3분")
 *   questionCount - 문항 수 표시용 문자열 (예: "30문항")
 *   url           - 테스트 시작 페이지 경로
 *   introText     - 인트로 화면 소개문 (테스트 상세 페이지에서 표시)
 */
window.TESTS = [
  {
    id: "spending-type",
    name: "MBUY 소비 유형 테스트",
    thumbnail: "/images/thumb-spending-type.png",
    desc: "네 소비엔 이유가 있어",
    duration: "3분",
    questionCount: "30문항",
    url: "/test/spending-type.html",
    introText: "딱 3분이면 돼\n행동경제학 기반으로 설계된 32가지 소비 유형 중\n네가 어디에 속하는지 알려줄게",
    introImage: "/images/intro-spending-type.png"
  },
  {
    id: "friendship-code",
    name: "FC코드 우정 케미 테스트",
    thumbnail: "/images/thumb-friendship-code.png",
    desc: "너의 우정엔 코드가 있어",
    duration: "3분",
    questionCount: "30문항",
    url: "/test/friendship-code.html",
    introText: "딱 3분이면 돼\n사회심리학 기반으로 설계된 32가지 우정 유형 중\n네가 어디에 속하는지 알려줄게",
    introImage: "/images/intro-friendship-code.png"
  }
];
