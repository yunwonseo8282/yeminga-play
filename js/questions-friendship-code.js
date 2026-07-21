/**
 * FC코드(Friendship Code) 우정 케미 테스트 — 30문항 데이터
 *
 * 배치 순서표 (같은 차원·축·패턴 연속 없도록 설계):
 * 1=Q1, 2=Q5, 3=Q9, 4=Q10, 5=Q17, 6=Q21, 7=Q22, 8=Q26, 9=Q30, 10=Q13,
 * 11=Q2, 12=Q6, 13=Q7, 14=Q11, 15=Q18, 16=Q19, 17=Q23, 18=Q27, 19=Q28, 20=Q14,
 * 21=Q3, 22=Q4, 23=Q8, 24=Q12, 25=Q16, 26=Q20, 27=Q24, 28=Q25, 29=Q29, 30=Q15
 *
 * 각 항목 구조:
 *   order     - 배치 순서 (1~30)
 *   qid       - 원본 문항 번호
 *   dimension - 차원 번호 (1~10)
 *   axis      - 축 번호 (1~5)
 *   pattern   - "상황극" | "팩폭" | "직설"
 *   text      - 질문 텍스트
 *   choices   - [{ label, text, score }] A=1, B=2, C=3
 *
 * 축↔차원: 축1(dim1,2) 축2(dim3,4) 축3(dim5,6) 축4(dim7,8) 축5(dim9,10)
 * 방향: A=L극단(score1), C=H극단(score3). 역채점 대상 없음(설계 단계에서 방향 정렬 완료).
 */
window.QUESTIONS_FRIENDSHIP_CODE = [
  {
    order: 1, qid: "Q1", dimension: 1, axis: 1, pattern: "상황극",
    text: "요즘 진짜 힘든 일 생겼어, 친구 만나면 어떻게 해?",
    choices: [
      { label: "A", text: "티 안 내고 그냥 평소처럼 웃으면서 넘겨", score: 1 },
      { label: "B", text: "물어보면 조금 말하는데 다는 안 꺼내", score: 2 },
      { label: "C", text: "만나자마자 나 요즘 진짜 힘들다고 다 쏟아내", score: 3 }
    ]
  },
  {
    order: 2, qid: "Q5", dimension: 2, axis: 1, pattern: "팩폭",
    text: "친구 좋은 일 생겼을 때 네 반응은?",
    choices: [
      { label: "A", text: "오 잘됐네 하고 담담하게 축하해", score: 1 },
      { label: "B", text: "오오 진짜? 하고 나름 반가워해", score: 2 },
      { label: "C", text: "꺄악 소리 지르면서 나까지 신나서 방방 뛰어", score: 3 }
    ]
  },
  {
    order: 3, qid: "Q9", dimension: 3, axis: 2, pattern: "직설",
    text: "친한 친구랑 물리적으로 자주 만나야 되는 편이야?",
    choices: [
      { label: "A", text: "아니 연락만 돼도 충분해", score: 1 },
      { label: "B", text: "너무 뜸하면 좀 그렇고 적당히는 봐야지", score: 2 },
      { label: "C", text: "응 자주 봐야 진짜 친하다고 느껴져", score: 3 }
    ]
  },
  {
    order: 4, qid: "Q10", dimension: 4, axis: 2, pattern: "상황극",
    text: "친구가 네 폰 배경화면부터 일정까지 다 궁금해해, 어때?",
    choices: [
      { label: "A", text: "선은 지켜줬으면 해 내 영역은 내 거야", score: 1 },
      { label: "B", text: "어느 정도는 공유하는데 사적인 건 좀 남겨둬", score: 2 },
      { label: "C", text: "다 보여줘 우리 사이에 숨길 게 어딨어", score: 3 }
    ]
  },
  {
    order: 5, qid: "Q17", dimension: 6, axis: 3, pattern: "팩폭",
    text: "너 입 무거운 편이야 가벼운 편이야?",
    choices: [
      { label: "A", text: "솔직히 재밌는 얘긴 참기 힘들어", score: 1 },
      { label: "B", text: "웬만하면 지키는데 가끔 흘릴 때 있어", score: 2 },
      { label: "C", text: "나한테 말하면 그냥 금고에 넣는 거야", score: 3 }
    ]
  },
  {
    order: 6, qid: "Q21", dimension: 7, axis: 4, pattern: "직설",
    text: "모임 분위기 띄우는 거 네 담당이야?",
    choices: [
      { label: "A", text: "아니 난 듣는 쪽이 편해", score: 1 },
      { label: "B", text: "필요할 때만 나서는 정도야", score: 2 },
      { label: "C", text: "응 텐션 올리는 건 내가 제일 잘해", score: 3 }
    ]
  },
  {
    order: 7, qid: "Q22", dimension: 8, axis: 4, pattern: "상황극",
    text: "친구가 웃긴 짤 보냈어, 카톡 반응 어떻게 해?",
    choices: [
      { label: "A", text: "ㅋㅋ 한 번 치고 말아", score: 1 },
      { label: "B", text: "ㅋㅋㅋㅋ 웃기다 정도는 보내줘", score: 2 },
      { label: "C", text: "ㅋㅋㅋㅋㅋㅋㅋㅋ 미쳤나봐 하면서 짤로 도배해", score: 3 }
    ]
  },
  {
    order: 8, qid: "Q26", dimension: 9, axis: 5, pattern: "팩폭",
    text: "친구랑 갈등 생기면 넌 어떤 스타일?",
    choices: [
      { label: "A", text: "부딪히기 싫어서 그냥 피하고 넘겨", score: 1 },
      { label: "B", text: "웬만하면 참다가 진짜 아니면 말해", score: 2 },
      { label: "C", text: "할 말은 해야지 곪는 것보단 낫잖아", score: 3 }
    ]
  },
  {
    order: 9, qid: "Q30", dimension: 10, axis: 5, pattern: "직설",
    text: "다툰 다음에 먼저 손 내미는 편이야?",
    choices: [
      { label: "A", text: "아니 기다리는 쪽이야", score: 1 },
      { label: "B", text: "하루 이틀 지나도 안 풀리면 그때 내가 연락해", score: 2 },
      { label: "C", text: "응 내가 먼저 풀고 넘어가는 게 편해", score: 3 }
    ]
  },
  {
    order: 10, qid: "Q13", dimension: 5, axis: 3, pattern: "상황극",
    text: "친구가 멀리 이사 가서 연락이 확 줄었어, 넌 어때?",
    choices: [
      { label: "A", text: "자연스럽게 멀어지는 거지 뭐 어쩔 수 없어", score: 1 },
      { label: "B", text: "아쉽지만 가끔 연락하면서 유지는 해", score: 2 },
      { label: "C", text: "거리가 뭔 상관이야 내가 먼저 계속 챙겨", score: 3 }
    ]
  },
  {
    order: 11, qid: "Q2", dimension: 1, axis: 1, pattern: "팩폭",
    text: "네 속마음, 친구들이 얼마나 알아?",
    choices: [
      { label: "A", text: "겉만 알지 진짜 속은 아무도 모를걸", score: 1 },
      { label: "B", text: "몇 명한테만 조금씩 나눠서 오픈해", score: 2 },
      { label: "C", text: "나 오늘 기분 어떤지까지 다 실시간으로 알아", score: 3 }
    ]
  },
  {
    order: 12, qid: "Q6", dimension: 2, axis: 1, pattern: "직설",
    text: "감정 표현 겉으로 잘 하는 편이야?",
    choices: [
      { label: "A", text: "속으로 느끼지 겉으론 잘 안 드러나", score: 1 },
      { label: "B", text: "좋은 감정은 티 나는데 속상한 건 잘 안 드러내", score: 2 },
      { label: "C", text: "내 감정은 얼굴이랑 목소리에 다 티 나", score: 3 }
    ]
  },
  {
    order: 13, qid: "Q7", dimension: 3, axis: 2, pattern: "상황극",
    text: "친구가 이번 주에만 세 번 보자는데 어때?",
    choices: [
      { label: "A", text: "한 번이면 충분한데 세 번은 좀 부담돼", score: 1 },
      { label: "B", text: "두 번까지는 좋은데 세 번은 좀 많다 싶어", score: 2 },
      { label: "C", text: "완전 좋지 매일 봐도 안 질리는 사이잖아", score: 3 }
    ]
  },
  {
    order: 14, qid: "Q11", dimension: 4, axis: 2, pattern: "팩폭",
    text: "친해도 이건 안 알려준다 하는 게 있어?",
    choices: [
      { label: "A", text: "당연하지 나만 아는 영역은 꼭 남겨둬", score: 1 },
      { label: "B", text: "몇 개는 있는데 친해지면 좀 풀려", score: 2 },
      { label: "C", text: "없어 친하면 통장 잔고까지 다 오픈해", score: 3 }
    ]
  },
  {
    order: 15, qid: "Q18", dimension: 6, axis: 3, pattern: "직설",
    text: "친구 비밀 지켜달란 거 끝까지 지켜?",
    choices: [
      { label: "A", text: "상황 되면 얘기할 수도 있지 뭐", score: 1 },
      { label: "B", text: "아무한테도 안 하는데 진짜 친한 한 명한텐 샐 때 있어", score: 2 },
      { label: "C", text: "응 죽어도 안 말해 그게 신뢰잖아", score: 3 }
    ]
  },
  {
    order: 16, qid: "Q19", dimension: 7, axis: 4, pattern: "상황극",
    text: "다 같이 모인 자리에서 분위기 축 처졌어, 넌 어때?",
    choices: [
      { label: "A", text: "그냥 조용히 있어 나서는 건 내 스타일 아니야", score: 1 },
      { label: "B", text: "분위기 보다가 필요하면 한마디 던져", score: 2 },
      { label: "C", text: "내가 나서서 게임하자고 분위기 확 살려", score: 3 }
    ]
  },
  {
    order: 17, qid: "Q23", dimension: 8, axis: 4, pattern: "팩폭",
    text: "네 카톡 리액션 톤은?",
    choices: [
      { label: "A", text: "담백해 ㅇㅇ ㅇㅋ 이 정도면 충분해", score: 1 },
      { label: "B", text: "친한 애들한텐 크고 어색한 사이엔 담백해져", score: 2 },
      { label: "C", text: "느낌표랑 이모티콘 없으면 대화가 안 돼", score: 3 }
    ]
  },
  {
    order: 18, qid: "Q27", dimension: 9, axis: 5, pattern: "직설",
    text: "불편한 얘기 친구한테 직접 하는 편이야?",
    choices: [
      { label: "A", text: "아니 마음에 담아두고 말은 안 해", score: 1 },
      { label: "B", text: "타이밍 봐서 돌려서라도 표현은 해", score: 2 },
      { label: "C", text: "응 답답한 건 그날 바로 풀어야 돼", score: 3 }
    ]
  },
  {
    order: 19, qid: "Q28", dimension: 10, axis: 5, pattern: "상황극",
    text: "친구랑 크게 싸우고 며칠째 냉전 중이야, 넌 어때?",
    choices: [
      { label: "A", text: "자존심 있지 상대가 먼저 오기 전엔 안 움직여", score: 1 },
      { label: "B", text: "좀 더 기다려보다가 안 되면 내가 연락해", score: 2 },
      { label: "C", text: "못 참고 내가 먼저 야 우리 이러지 말자 해", score: 3 }
    ]
  },
  {
    order: 20, qid: "Q14", dimension: 5, axis: 3, pattern: "팩폭",
    text: "오래된 친구 관계, 넌 어떻게 관리해?",
    choices: [
      { label: "A", text: "안 맞으면 미련 없이 정리하는 편이야", score: 1 },
      { label: "B", text: "웬만하면 유지하는데 억지로는 안 해", score: 2 },
      { label: "C", text: "한번 친구면 끝까지 간다 웬만해선 안 놔", score: 3 }
    ]
  },
  {
    order: 21, qid: "Q3", dimension: 1, axis: 1, pattern: "직설",
    text: "고민 생기면 친구한테 먼저 털어놓는 편이야?",
    choices: [
      { label: "A", text: "아니 혼자 다 삭이고 정리되면 말해", score: 1 },
      { label: "B", text: "어느 정도 정리되면 그때 슬쩍 얘기해", score: 2 },
      { label: "C", text: "응 생기자마자 바로 전화해서 다 말해", score: 3 }
    ]
  },
  {
    order: 22, qid: "Q4", dimension: 2, axis: 1, pattern: "상황극",
    text: "친구가 울면서 힘든 얘기 하는 중이야, 넌 어때?",
    choices: [
      { label: "A", text: "조용히 듣기만 해 말보단 그냥 옆에 있어", score: 1 },
      { label: "B", text: "고개 끄덕이면서 그랬구나 정도는 해줘", score: 2 },
      { label: "C", text: "같이 울면서 헐 대박 어떡해 하고 리액션 폭발", score: 3 }
    ]
  },
  {
    order: 23, qid: "Q8", dimension: 3, axis: 2, pattern: "팩폭",
    text: "친구랑 얼마나 자주 붙어 있고 싶어?",
    choices: [
      { label: "A", text: "가끔 봐도 우정 안 변해 각자 살자", score: 1 },
      { label: "B", text: "일주일에 한두 번이 딱 적당한 것 같아", score: 2 },
      { label: "C", text: "거의 매일 붙어있어야 마음이 편해", score: 3 }
    ]
  },
  {
    order: 24, qid: "Q12", dimension: 4, axis: 2, pattern: "직설",
    text: "친한 친구한테 네 사생활 다 공유하는 편이야?",
    choices: [
      { label: "A", text: "아니 나만의 공간은 확실히 지켜", score: 1 },
      { label: "B", text: "큰 건 말하는데 소소한 건 나 혼자 알아", score: 2 },
      { label: "C", text: "응 시시콜콜한 것까지 다 공유해", score: 3 }
    ]
  },
  {
    order: 25, qid: "Q16", dimension: 6, axis: 3, pattern: "상황극",
    text: "친구가 절대 말하지 말라고 비밀 하나 줬어, 어때?",
    choices: [
      { label: "A", text: "재밌으면 다른 친구한테 슬쩍 흘릴 수도 있어", score: 1 },
      { label: "B", text: "딱 한 명, 제일 믿는 애한테만 털어놔", score: 2 },
      { label: "C", text: "무덤까지 가져가 나만 알고 입 꾹 다물어", score: 3 }
    ]
  },
  {
    order: 26, qid: "Q20", dimension: 7, axis: 4, pattern: "팩폭",
    text: "모임에서 너의 포지션은?",
    choices: [
      { label: "A", text: "구석에서 조용히 관찰하는 사람", score: 1 },
      { label: "B", text: "있으면 웃고 없어도 티 안 나는 중간", score: 2 },
      { label: "C", text: "내가 없으면 자리 자체가 안 굴러가는 핵인싸", score: 3 }
    ]
  },
  {
    order: 27, qid: "Q24", dimension: 8, axis: 4, pattern: "직설",
    text: "리액션 큰 편이야?",
    choices: [
      { label: "A", text: "아니 표현이 좀 잔잔한 편이야", score: 1 },
      { label: "B", text: "진짜 웃긴 거 아니면 잔잔하게 넘겨", score: 2 },
      { label: "C", text: "응 뭐만 하면 오버해서 반응한대", score: 3 }
    ]
  },
  {
    order: 28, qid: "Q25", dimension: 9, axis: 5, pattern: "상황극",
    text: "친구가 자꾸 약속 늦어서 쌓였어, 넌 어떻게 해?",
    choices: [
      { label: "A", text: "그냥 참아 괜히 말했다가 분위기 싸해지잖아", score: 1 },
      { label: "B", text: "한참 쌓이면 그때 조심스럽게 얘기해", score: 2 },
      { label: "C", text: "바로 말해 늦는 거 나 진짜 신경 쓰인다고", score: 3 }
    ]
  },
  {
    order: 29, qid: "Q29", dimension: 10, axis: 5, pattern: "팩폭",
    text: "싸운 뒤 먼저 연락하는 거 누구야?",
    choices: [
      { label: "A", text: "무조건 상대편이지 난 못 굽혀", score: 1 },
      { label: "B", text: "내가 잘못한 게 확실할 때만 먼저 연락해", score: 2 },
      { label: "C", text: "거의 나야 어색한 거 오래 못 견뎌", score: 3 }
    ]
  },
  {
    order: 30, qid: "Q15", dimension: 5, axis: 3, pattern: "직설",
    text: "친구가 실수해서 서운했을 때 넌 어떻게 해?",
    choices: [
      { label: "A", text: "몇 번 반복되면 그냥 조용히 손절해", score: 1 },
      { label: "B", text: "서운하다고 한 번은 말하고 넘어가", score: 2 },
      { label: "C", text: "그럴 수도 있지 하고 웬만하면 끌어안아", score: 3 }
    ]
  }
];
