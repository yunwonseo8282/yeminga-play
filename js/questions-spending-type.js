/**
 * MBUY 소비 유형 테스트 — 30문항 데이터
 *
 * 배치 순서표 (같은 차원·축·패턴 연속 없도록 설계):
 * 1=Q1, 2=Q11, 3=Q24, 4=Q16, 5=Q29, 6=Q3, 7=Q19, 8=Q5, 9=Q9, 10=Q28,
 * 11=Q14, 12=Q21, 13=Q7, 14=Q17, 15=Q30, 16=Q4, 17=Q23, 18=Q18, 19=Q25,
 * 20=Q8, 21=Q15, 22=Q10, 23=Q2, 24=Q27, 25=Q22, 26=Q6, 27=Q13, 28=Q20,
 * 29=Q12, 30=Q26
 *
 * 각 항목 구조:
 *   order     - 배치 순서 (1~30)
 *   qid       - 원본 문항 번호
 *   dimension - 차원 번호 (1~10)
 *   axis      - 축 번호 (1~5)
 *   pattern   - "상황극" | "팩폭" | "직설"
 *   text      - 질문 텍스트
 *   choices   - [{ label, text, score }] A=1, B=2, C=3
 */
window.QUESTIONS_SPENDING_TYPE = [
  // ── 순서 1: Q1 · 차원1 소비 동력원 · 축1 · 상황극 ──
  {
    order: 1, qid: "Q1", dimension: 1, axis: 1, pattern: "상황극",
    text: "요즘 좀 지친다 싶은 날이야, 넌 어떻게 해?",
    choices: [
      { label: "A", text: "기분 전환이 필요하니까 당장 쇼핑 앱부터 켜고 봐", score: 1 },
      { label: "B", text: "맛있는 거 먹거나 누워서 넷플릭스 봐, 쇼핑 생각은 딱히 안 나", score: 2 },
      { label: "C", text: "필요한 거 떨어진 거 없나 확인부터 해, 채워놔야 마음이 놓이거든", score: 3 }
    ]
  },
  // ── 순서 2: Q11 · 차원4 소비 후 감정 패턴 · 축2 · 팩폭 ──
  {
    order: 2, qid: "Q11", dimension: 4, axis: 2, pattern: "팩폭",
    text: "지금까지 산 것 중에 \"이거 왜 샀지?\" 하는 거 얼마나 돼?",
    choices: [
      { label: "A", text: "거의 없어, 내가 고른 건 다 잘 쓰거든", score: 1 },
      { label: "B", text: "한 20~30% 정도? 가끔 실수는 하지", score: 2 },
      { label: "C", text: "반 이상은 후회해, 그때는 좋았는데 집에 오면 현타 와", score: 3 }
    ]
  },
  // ── 순서 3: Q24 · 차원8 타인 영향 반응 · 축4 · 직설 ──
  {
    order: 3, qid: "Q24", dimension: 8, axis: 4, pattern: "직설",
    text: "다른 사람 추천이 네 구매에 얼마나 영향을 줘?",
    choices: [
      { label: "A", text: "거의 안 줘, 결국 내 마음에 들어야 사는 거야", score: 1 },
      { label: "B", text: "후보 고를 때 참고는 하는데 최종 결정은 내가 해", score: 2 },
      { label: "C", text: "많이 줘, 믿는 사람이 좋다고 하면 거의 바로 사", score: 3 }
    ]
  },
  // ── 순서 4: Q16 · 차원6 의사결정 속도 · 축3 · 상황극 ──
  {
    order: 4, qid: "Q16", dimension: 6, axis: 3, pattern: "상황극",
    text: "장바구니에 담아둔 게 있어, 넌 보통 얼마 만에 결제해?",
    choices: [
      { label: "A", text: "담자마자 바로 결제해, 장바구니는 거쳐가는 곳이 아니야", score: 1 },
      { label: "B", text: "하루 정도 두고 다시 보는데, 대부분은 결국 사", score: 2 },
      { label: "C", text: "최소 3일은 묵혀, 그래도 사고 싶으면 그때 비로소 결제해", score: 3 }
    ]
  },
  // ── 순서 5: Q29 · 차원10 미래 돈 태도 · 축5 · 팩폭 ──
  {
    order: 5, qid: "Q29", dimension: 10, axis: 5, pattern: "팩폭",
    text: "\"어차피 벌 거니까 지금 써도 돼\" 이 말에 네 반응은?",
    choices: [
      { label: "A", text: "완전 공감, 내 미래 수입을 믿으니까 지금 쓰는 거야", score: 1 },
      { label: "B", text: "반은 맞는 말인데 너무 자주 그러면 위험하긴 해", score: 2 },
      { label: "C", text: "무슨 소리야, 안 들어온 돈은 존재하지 않는 돈이야", score: 3 }
    ]
  },
  // ── 순서 6: Q3 · 차원1 소비 동력원 · 축1 · 직설 ──
  {
    order: 6, qid: "Q3", dimension: 1, axis: 1, pattern: "직설",
    text: "돈 쓸 때 너를 움직이는 감정이 뭐야?",
    choices: [
      { label: "A", text: "내 도파민 충전소지, 쓸 때 기분이 제일 짜릿해", score: 1 },
      { label: "B", text: "딱히 감정은 없어, 필요하면 사는 거지", score: 2 },
      { label: "C", text: "안 사두면 나중에 곤란할까 봐, 그 불안을 없애려고 사는 거야", score: 3 }
    ]
  },
  // ── 순서 7: Q19 · 차원7 사회적 소비 성향 · 축4 · 상황극 ──
  {
    order: 7, qid: "Q19", dimension: 7, axis: 4, pattern: "상황극",
    text: "인스타에 요즘 다 같은 향수 올리고 있어, 넌 어때?",
    choices: [
      { label: "A", text: "상관없어, 내 취향은 남 피드랑 관계없거든", score: 1 },
      { label: "B", text: "궁금해서 한 번 검색은 해보는데 안 맞으면 안 사", score: 2 },
      { label: "C", text: "나도 사야 하나 싶어서 일단 매장 가봐", score: 3 }
    ]
  },
  // ── 순서 8: Q5 · 차원2 보상 민감도 · 축1 · 팩폭 ──
  {
    order: 8, qid: "Q5", dimension: 2, axis: 1, pattern: "팩폭",
    text: "뭔가 새로 산 날, 네 텐션이 어때?",
    choices: [
      { label: "A", text: "평소랑 똑같아, 산다고 텐션이 올라가진 않거든", score: 1 },
      { label: "B", text: "좀 기분은 좋은데 한 시간이면 원래대로 돌아와", score: 2 },
      { label: "C", text: "하루 종일 기분 좋아, 자기 전에 한 번 더 꺼내볼 때도 있어", score: 3 }
    ]
  },
  // ── 순서 9: Q9 · 차원3 감정-지갑 연결 · 축2 · 직설 ──
  {
    order: 9, qid: "Q9", dimension: 3, axis: 2, pattern: "직설",
    text: "기분이랑 지출이 연결돼 있는 편이야?",
    choices: [
      { label: "A", text: "전혀, 내 지갑은 내 감정이랑 따로 놀아", score: 1 },
      { label: "B", text: "보통은 아닌데 기분이 극단적일 때만 좀 영향받아", score: 2 },
      { label: "C", text: "완전, 기분 좋으면 플렉스하고 기분 나쁘면 보복 소비해", score: 3 }
    ]
  },
  // ── 순서 10: Q28 · 차원10 미래 돈 태도 · 축5 · 상황극 ──
  {
    order: 10, qid: "Q28", dimension: 10, axis: 5, pattern: "상황극",
    text: "다음 달에 보너스 들어올 예정이야, 넌 어떻게 해?",
    choices: [
      { label: "A", text: "이미 쓸 리스트 짜놨어, 어차피 들어올 돈이니까 미리 질러도 괜찮아", score: 1 },
      { label: "B", text: "확정되면 그때 생각해, 아직 안 들어온 돈이니까 일단 대기", score: 2 },
      { label: "C", text: "들어와서 통장에 찍힐 때까지 없는 돈 취급해", score: 3 }
    ]
  },
  // ── 순서 11: Q14 · 차원5 정보 처리 방식 · 축3 · 팩폭 ──
  {
    order: 11, qid: "Q14", dimension: 5, axis: 3, pattern: "팩폭",
    text: "뭔가 사기 전에 리뷰 몇 개나 봐?",
    choices: [
      { label: "A", text: "안 봐, 내 느낌이 곧 리뷰야", score: 1 },
      { label: "B", text: "한 3~5개? 치명적인 단점만 없으면 넘어가", score: 2 },
      { label: "C", text: "최소 10개 이상이야, 블로그 후기에 유튜브 리뷰까지 다 돌려봐", score: 3 }
    ]
  },
  // ── 순서 12: Q21 · 차원7 사회적 소비 성향 · 축4 · 직설 ──
  {
    order: 12, qid: "Q21", dimension: 7, axis: 4, pattern: "직설",
    text: "주변 사람들 소비가 네 지갑에 영향을 줘?",
    choices: [
      { label: "A", text: "안 줘, 남들이 뭘 사든 내 소비는 내 기준대로야", score: 1 },
      { label: "B", text: "참고는 돼, 좋아 보이면 후보에 올리는 정도야", score: 2 },
      { label: "C", text: "많이 줘, 다 사는 거 나만 안 사면 왠지 뒤처지는 느낌이야", score: 3 }
    ]
  },
  // ── 순서 13: Q7 · 차원3 감정-지갑 연결 · 축2 · 상황극 ──
  {
    order: 13, qid: "Q7", dimension: 3, axis: 2, pattern: "상황극",
    text: "오늘 하루가 진짜 최악이었어, 퇴근하고 넌 뭐 해?",
    choices: [
      { label: "A", text: "그냥 집 가서 쉬어, 기분 나쁘다고 돈 쓸 이유는 없잖아", score: 1 },
      { label: "B", text: "맛있는 거 하나 정도는 시켜 먹을 수도 있어", score: 2 },
      { label: "C", text: "일단 뭐라도 질러, 카드 긁어야 스트레스가 풀리거든", score: 3 }
    ]
  },
  // ── 순서 14: Q17 · 차원6 의사결정 속도 · 축3 · 팩폭 ──
  {
    order: 14, qid: "Q17", dimension: 6, axis: 3, pattern: "팩폭",
    text: "지금 네 장바구니 상태가 어때?",
    choices: [
      { label: "A", text: "거의 비어있어, 살 거면 바로 사지 뭘 담아놔", score: 1 },
      { label: "B", text: "한 5~6개 있어, 고민하다가 반은 지우는 편이야", score: 2 },
      { label: "C", text: "20개 넘게 쌓여있는데 결제한 건 3개쯤이야, 나머지는 거기서 살고 있어", score: 3 }
    ]
  },
  // ── 순서 15: Q30 · 차원10 미래 돈 태도 · 축5 · 직설 ──
  {
    order: 15, qid: "Q30", dimension: 10, axis: 5, pattern: "직설",
    text: "아직 안 번 돈을 미리 쓰는 편이야?",
    choices: [
      { label: "A", text: "자주 그래, 앞으로 벌 자신 있으니까 당겨 써도 불안하지 않아", score: 1 },
      { label: "B", text: "가끔, 확실히 들어올 돈이면 조금은 당겨 쓸 수 있어", score: 2 },
      { label: "C", text: "절대 안 그래, 내 손에 들어온 돈만 진짜 내 돈이야", score: 3 }
    ]
  },
  // ── 순서 16: Q4 · 차원2 보상 민감도 · 축1 · 상황극 ──
  {
    order: 16, qid: "Q4", dimension: 2, axis: 1, pattern: "상황극",
    text: "기다리던 택배가 도착했어, 넌 어떻게 해?",
    choices: [
      { label: "A", text: "나중에 뜯어도 되니까 일단 현관에 놔둬", score: 1 },
      { label: "B", text: "시간 될 때 뜯어보는데 약간 설레긴 해", score: 2 },
      { label: "C", text: "하던 거 멈추고 바로 뜯어, 이 순간이 쇼핑의 하이라이트야", score: 3 }
    ]
  },
  // ── 순서 17: Q23 · 차원8 타인 영향 반응 · 축4 · 팩폭 ──
  {
    order: 17, qid: "Q23", dimension: 8, axis: 4, pattern: "팩폭",
    text: "유튜버가 \"이건 인생템이야\" 하면 너는?",
    choices: [
      { label: "A", text: "그냥 흘려, 광고인지 진심인지 관심도 없어", score: 1 },
      { label: "B", text: "궁금하면 따로 검색해서 확인해봐, 유튜버 말만 믿진 않아", score: 2 },
      { label: "C", text: "일단 링크부터 눌러, 인생템이라는데 안 볼 수가 없잖아", score: 3 }
    ]
  },
  // ── 순서 18: Q18 · 차원6 의사결정 속도 · 축3 · 직설 ──
  {
    order: 18, qid: "Q18", dimension: 6, axis: 3, pattern: "직설",
    text: "살까 말까 고민하는 시간이 긴 편이야?",
    choices: [
      { label: "A", text: "짧아, 5분 안에 안 사면 그냥 관심 꺼져", score: 1 },
      { label: "B", text: "가격 따라 달라, 큰 거면 좀 고민하고 작은 건 바로 사", score: 2 },
      { label: "C", text: "길어, 일주일 내내 생각하다가 결국 안 살 때도 있어", score: 3 }
    ]
  },
  // ── 순서 19: Q25 · 차원9 시간 속 돈 감각 · 축5 · 상황극 ──
  {
    order: 19, qid: "Q25", dimension: 9, axis: 5, pattern: "상황극",
    text: "갑자기 50만원이 생겼어, 넌 어떻게 해?",
    choices: [
      { label: "A", text: "바로 써, 지금 갖고 싶었던 거 사는 게 제일 행복해", score: 1 },
      { label: "B", text: "반은 쓰고 반은 넣어둬, 밸런스가 중요하니까", score: 2 },
      { label: "C", text: "일단 통장에 넣어, 지금 안 써도 나중에 더 크게 쓸 수 있잖아", score: 3 }
    ]
  },
  // ── 순서 20: Q8 · 차원3 감정-지갑 연결 · 축2 · 팩폭 ──
  {
    order: 20, qid: "Q8", dimension: 3, axis: 2, pattern: "팩폭",
    text: "솔직히 네 카드 내역 보면 그달 감정 상태가 보여?",
    choices: [
      { label: "A", text: "안 보여, 기분이 어떻든 카드값은 늘 비슷비슷해", score: 1 },
      { label: "B", text: "가끔은 보여, 힘들었던 주에 배달 좀 늘어난 흔적이 있긴 해", score: 2 },
      { label: "C", text: "완전 보여, 카드 내역이 그달의 감정 일기장이야", score: 3 }
    ]
  },
  // ── 순서 21: Q15 · 차원5 정보 처리 방식 · 축3 · 직설 ──
  {
    order: 21, qid: "Q15", dimension: 5, axis: 3, pattern: "직설",
    text: "쇼핑할 때 직감파야 분석파야?",
    choices: [
      { label: "A", text: "완전 직감파, 끌리면 그게 정답이야", score: 1 },
      { label: "B", text: "직감으로 후보 추리고 살짝 비교는 하는 하이브리드야", score: 2 },
      { label: "C", text: "완전 분석파, 비교 안 하면 불안해서 결제 버튼을 못 눌러", score: 3 }
    ]
  },
  // ── 순서 22: Q10 · 차원4 소비 후 감정 패턴 · 축2 · 상황극 ──
  {
    order: 22, qid: "Q10", dimension: 4, axis: 2, pattern: "상황극",
    text: "고민 끝에 좀 비싼 거 하나 질렀어, 결제 직후 네 머릿속은?",
    choices: [
      { label: "A", text: "\"역시 내 눈은 틀림없지\" 만족감이 쭉 가", score: 1 },
      { label: "B", text: "잠깐 뿌듯한데 한 시간쯤 지나면 좀 아까운 생각이 살짝 들어", score: 2 },
      { label: "C", text: "결제 누르자마자 \"이걸 왜 샀지\" 후회가 바로 밀려와", score: 3 }
    ]
  },
  // ── 순서 23: Q2 · 차원1 소비 동력원 · 축1 · 팩폭 ──
  {
    order: 23, qid: "Q2", dimension: 1, axis: 1, pattern: "팩폭",
    text: "지금 네 폰에 쇼핑 앱 알림이 울렸어, 네 반응은?",
    choices: [
      { label: "A", text: "\"오 뭐야?\" 벌써 앱 켜서 홀린 듯이 구경 중이야", score: 1 },
      { label: "B", text: "\"또 광고네\" 무심하게 알림 지우고 하던 일 해", score: 2 },
      { label: "C", text: "\"혹시 나 필요한 거 품절되는 거 아냐?\" 불안해서 안 눌러볼 수가 없어", score: 3 }
    ]
  },
  // ── 순서 24: Q27 · 차원9 시간 속 돈 감각 · 축5 · 직설 ──
  {
    order: 24, qid: "Q27", dimension: 9, axis: 5, pattern: "직설",
    text: "돈 쓸 때 미래 생각 많이 해?",
    choices: [
      { label: "A", text: "안 해, 오늘 행복한 게 우선이야", score: 1 },
      { label: "B", text: "큰돈 쓸 때만 잠깐 해, 소소한 건 그냥 써", score: 2 },
      { label: "C", text: "항상 해, 이걸 쓰면 다음 달 내 통장이 어떻게 되는지 계산부터 해", score: 3 }
    ]
  },
  // ── 순서 25: Q22 · 차원8 타인 영향 반응 · 축4 · 상황극 ──
  {
    order: 25, qid: "Q22", dimension: 8, axis: 4, pattern: "상황극",
    text: "사려는 거에 별점 3.5, 불만 후기가 여러 개야, 어떻게 해?",
    choices: [
      { label: "A", text: "그래도 사, 내가 써봐야 아는 거지 남 후기가 다는 아니잖아", score: 1 },
      { label: "B", text: "좀 찝찝하긴 한데 내가 진짜 원하는 거면 한 번 걸어봐", score: 2 },
      { label: "C", text: "안 사, 후기가 별로인 건 다 이유가 있어", score: 3 }
    ]
  },
  // ── 순서 26: Q6 · 차원2 보상 민감도 · 축1 · 직설 ──
  {
    order: 26, qid: "Q6", dimension: 2, axis: 1, pattern: "직설",
    text: "쇼핑하고 나서 느끼는 쾌감이 큰 편이야?",
    choices: [
      { label: "A", text: "거의 없어, 사는 건 그냥 사는 거지 특별한 감정은 없어", score: 1 },
      { label: "B", text: "약간? 마음에 드는 거 건졌을 때 정도만 좋아", score: 2 },
      { label: "C", text: "엄청 커, 결제 순간부터 개봉까지 매 단계가 다 짜릿해", score: 3 }
    ]
  },
  // ── 순서 27: Q13 · 차원5 정보 처리 방식 · 축3 · 상황극 ──
  {
    order: 27, qid: "Q13", dimension: 5, axis: 3, pattern: "상황극",
    text: "마음에 드는 운동화가 두 개야, 넌 어떻게 골라?",
    choices: [
      { label: "A", text: "첫눈에 끌리는 걸로 바로 가, 직감이 정답인 적이 많거든", score: 1 },
      { label: "B", text: "둘 다 신어보고 좀 더 편한 쪽으로 골라", score: 2 },
      { label: "C", text: "가격, 후기, 내구성 다 비교표 만들어보고 최소 하루는 고민해", score: 3 }
    ]
  },
  // ── 순서 28: Q20 · 차원7 사회적 소비 성향 · 축4 · 팩폭 ──
  {
    order: 28, qid: "Q20", dimension: 7, axis: 4, pattern: "팩폭",
    text: "솔직히 유행 때문에 산 거 있어?",
    choices: [
      { label: "A", text: "거의 없어, 유행이 와도 내 기준에 안 맞으면 안 사", score: 1 },
      { label: "B", text: "가끔 있긴 해, 근데 유행이랑 내 취향이 겹칠 때만 사는 거야", score: 2 },
      { label: "C", text: "꽤 있어, 다 사는 건 이유가 있으니까 일단 써봐야 직성이 풀려", score: 3 }
    ]
  },
  // ── 순서 29: Q12 · 차원4 소비 후 감정 패턴 · 축2 · 직설 ──
  {
    order: 29, qid: "Q12", dimension: 4, axis: 2, pattern: "직설",
    text: "돈 쓰고 나면 보통 어떤 감정이 먼저 와?",
    choices: [
      { label: "A", text: "뿌듯함이 먼저 와, 내가 번 돈으로 좋은 거 샀으니까", score: 1 },
      { label: "B", text: "실용적인 거 샀으면 뿌듯한데, 예쁜 쓰레기 샀으면 좀 복잡해져", score: 2 },
      { label: "C", text: "찝찝함이 먼저 와, 꼭 필요한 거였나 자꾸 되돌아보게 돼", score: 3 }
    ]
  },
  // ── 순서 30: Q26 · 차원9 시간 속 돈 감각 · 축5 · 팩폭 ──
  {
    order: 30, qid: "Q26", dimension: 9, axis: 5, pattern: "팩폭",
    text: "솔직히 \"지금 즐기자\" vs \"나중을 위해 참자\", 네 일상은 어느 쪽이야?",
    choices: [
      { label: "A", text: "거의 \"지금 즐기자\"야, 내일 일은 내일의 내가 할 거거든", score: 1 },
      { label: "B", text: "왔다 갔다해, 평일엔 참다가 주말에 좀 풀어", score: 2 },
      { label: "C", text: "거의 \"나중을 위해 참자\"야, 지금 참는 게 미래의 나한테 선물이거든", score: 3 }
    ]
  }
];
