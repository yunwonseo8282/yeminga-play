/**
 * types-spending-type.js — MBUY 소비 유형 32개 표준 패턴 데이터
 *
 * 축 ↔ 차원 ↔ lmhPattern 변환 규칙:
 *   축1(dim1,2): D→LL, S→HH
 *   축2(dim3,4): F→LL, B→HH
 *   축3(dim5,6): X→LL, R→HH
 *   축4(dim7,8): M→LL, W→HH
 *   축5(dim9,10): N→LL, L→HH  ← 축 오른쪽 글자가 L임에 주의
 *
 * lmhPattern 은 차원1~10 순서(10자리). 각 축이 2자리를 차지.
 * pattern: L→1, H→3  (사용자 답변엔 M=2 가 있지만 표준패턴엔 없음)
 * idealScores: L→3, H→9
 */
window.TYPES_SPENDING_TYPE = [
  // ─── 1: YOLO!  D-F-X-M-N  ─────────────────────────────
  {
    code: 'YOLO!', name: '지갑 화산', tier: 'SSR', axes: 'D-F-X-M-N',
    lmhPattern:  'LLLLLLLLLL',
    pattern:     [1,1,1,1,1,1,1,1,1,1],
    idealScores: [3,3,3,3,3,3,3,3,3,3]
  },
  // ─── 2: STOCK  D-F-X-M-L  ─────────────────────────────
  {
    code: 'STOCK', name: '쾌락 투자자', tier: 'R', axes: 'D-F-X-M-L',
    lmhPattern:  'LLLLLLLLHH',
    pattern:     [1,1,1,1,1,1,1,1,3,3],
    idealScores: [3,3,3,3,3,3,3,3,9,9]
  },
  // ─── 3: HYPE!  D-F-X-W-N  ─────────────────────────────
  {
    code: 'HYPE!', name: '트렌드 폭격기', tier: 'N', axes: 'D-F-X-W-N',
    lmhPattern:  'LLLLLLHHLL',
    pattern:     [1,1,1,1,1,1,3,3,1,1],
    idealScores: [3,3,3,3,3,3,9,9,3,3]
  },
  // ─── 4: SCOUT  D-F-X-W-L  ─────────────────────────────
  {
    code: 'SCOUT', name: '유행 사냥꾼', tier: 'SR', axes: 'D-F-X-W-L',
    lmhPattern:  'LLLLLLHHHH',
    pattern:     [1,1,1,1,1,1,3,3,3,3],
    idealScores: [3,3,3,3,3,3,9,9,9,9]
  },
  // ─── 5: PICKY  D-F-R-M-N  ─────────────────────────────
  {
    code: 'PICKY', name: '미식 감별사', tier: 'R', axes: 'D-F-R-M-N',
    lmhPattern:  'LLLLHHLLLL',
    pattern:     [1,1,1,1,3,3,1,1,1,1],
    idealScores: [3,3,3,3,9,9,3,3,3,3]
  },
  // ─── 6: MOGUL  D-F-R-M-L  ─────────────────────────────
  {
    code: 'MOGUL', name: '재벌 견습생', tier: 'SR', axes: 'D-F-R-M-L',
    lmhPattern:  'LLLLHHLLHH',
    pattern:     [1,1,1,1,3,3,1,1,3,3],
    idealScores: [3,3,3,3,9,9,3,3,9,9]
  },
  // ─── 7: TASTE  D-F-R-W-N  ─────────────────────────────
  {
    code: 'TASTE', name: '트렌드 감정사', tier: 'R', axes: 'D-F-R-W-N',
    lmhPattern:  'LLLLHHHHLL',
    pattern:     [1,1,1,1,3,3,3,3,1,1],
    idealScores: [3,3,3,3,9,9,9,9,3,3]
  },
  // ─── 8: WHALE  D-F-R-W-L  ─────────────────────────────
  {
    code: 'WHALE', name: '전략 설계자', tier: 'SSR', axes: 'D-F-R-W-L',
    lmhPattern:  'LLLLHHHHHH',
    pattern:     [1,1,1,1,3,3,3,3,3,3],
    idealScores: [3,3,3,3,9,9,9,9,9,9]
  },
  // ─── 9: OOPS!  D-B-X-M-N  ─────────────────────────────
  {
    code: 'OOPS!', name: '후회 직구러', tier: 'N', axes: 'D-B-X-M-N',
    lmhPattern:  'LLHHLLLLLL',
    pattern:     [1,1,3,3,1,1,1,1,1,1],
    idealScores: [3,3,9,9,3,3,3,3,3,3]
  },
  // ─── 10: SPLIT  D-B-X-M-L  ────────────────────────────
  {
    code: 'SPLIT', name: '적금 지킬 씨', tier: 'SR', axes: 'D-B-X-M-L',
    lmhPattern:  'LLHHLLLLHH',
    pattern:     [1,1,3,3,1,1,1,1,3,3],
    idealScores: [3,3,9,9,3,3,3,3,9,9]
  },
  // ─── 11: FOMO!  D-B-X-W-N  ────────────────────────────
  {
    code: 'FOMO!', name: '품절 공포러', tier: 'N', axes: 'D-B-X-W-N',
    lmhPattern:  'LLHHLLHHLL',
    pattern:     [1,1,3,3,1,1,3,3,1,1],
    idealScores: [3,3,9,9,3,3,9,9,3,3]
  },
  // ─── 12: FLIP  D-B-X-W-L  ─────────────────────────────
  {
    code: 'FLIP', name: '쾌감 결제 불안 감정러', tier: 'R', axes: 'D-B-X-W-L',
    lmhPattern:  'LLHHLLHHHH',
    pattern:     [1,1,3,3,1,1,3,3,3,3],
    idealScores: [3,3,9,9,3,3,9,9,9,9]
  },
  // ─── 13: STING  D-B-R-M-N  ────────────────────────────
  {
    code: 'STING', name: '충동 참회러', tier: 'N', axes: 'D-B-R-M-N',
    lmhPattern:  'LLHHHHLLLL',
    pattern:     [1,1,3,3,3,3,1,1,1,1],
    idealScores: [3,3,9,9,9,9,3,3,3,3]
  },
  // ─── 14: GRIND  D-B-R-M-L  ────────────────────────────
  {
    code: 'GRIND', name: '갈아넣기 장인', tier: 'R', axes: 'D-B-R-M-L',
    lmhPattern:  'LLHHHHLLHH',
    pattern:     [1,1,3,3,3,3,1,1,3,3],
    idealScores: [3,3,9,9,9,9,3,3,9,9]
  },
  // ─── 15: CROWD  D-B-R-W-N  ────────────────────────────
  {
    code: 'CROWD', name: '후기 중독러', tier: 'N', axes: 'D-B-R-W-N',
    lmhPattern:  'LLHHHHHHLL',
    pattern:     [1,1,3,3,3,3,3,3,1,1],
    idealScores: [3,3,9,9,9,9,9,9,3,3]
  },
  // ─── 16: SAFE!  D-B-R-W-L  ────────────────────────────
  {
    code: 'SAFE!', name: '손해 레이더', tier: 'N', axes: 'D-B-R-W-L',
    lmhPattern:  'LLHHHHHHHH',
    pattern:     [1,1,3,3,3,3,3,3,3,3],
    idealScores: [3,3,9,9,9,9,9,9,9,9]
  },
  // ─── 17: TREAT  S-F-X-M-N  ────────────────────────────
  {
    code: 'TREAT', name: '셀프 선물러', tier: 'R', axes: 'S-F-X-M-N',
    lmhPattern:  'HHLLLLLLLL',
    pattern:     [3,3,1,1,1,1,1,1,1,1],
    idealScores: [9,9,3,3,3,3,3,3,3,3]
  },
  // ─── 18: STASH  S-F-X-M-L  ────────────────────────────
  {
    code: 'STASH', name: '쿨 비축러', tier: 'R', axes: 'S-F-X-M-L',
    lmhPattern:  'HHLLLLLLHH',
    pattern:     [3,3,1,1,1,1,1,1,3,3],
    idealScores: [9,9,3,3,3,3,3,3,9,9]
  },
  // ─── 19: BUZZ!  S-F-X-W-N  ────────────────────────────
  {
    code: 'BUZZ!', name: '바이럴 호구', tier: 'N', axes: 'S-F-X-W-N',
    lmhPattern:  'HHLLLLHHLL',
    pattern:     [3,3,1,1,1,1,3,3,1,1],
    idealScores: [9,9,3,3,3,3,9,9,3,3]
  },
  // ─── 20: CHILL  S-F-X-W-L  ────────────────────────────
  {
    code: 'CHILL', name: '안전망 트렌드러', tier: 'R', axes: 'S-F-X-W-L',
    lmhPattern:  'HHLLLLHHHH',
    pattern:     [3,3,1,1,1,1,3,3,3,3],
    idealScores: [9,9,3,3,3,3,9,9,9,9]
  },
  // ─── 21: COZY  S-F-R-M-N  ─────────────────────────────
  {
    code: 'COZY', name: '소확행 수집가', tier: 'N', axes: 'S-F-R-M-N',
    lmhPattern:  'HHLLHHLLLL',
    pattern:     [3,3,1,1,3,3,1,1,1,1],
    idealScores: [9,9,3,3,9,9,3,3,3,3]
  },
  // ─── 22: VAULT  S-F-R-M-L  ────────────────────────────
  {
    code: 'VAULT', name: '금고 드래곤', tier: 'SR', axes: 'S-F-R-M-L',
    lmhPattern:  'HHLLHHLLHH',
    pattern:     [3,3,1,1,3,3,1,1,3,3],
    idealScores: [9,9,3,3,9,9,3,3,9,9]
  },
  // ─── 23: HACK!  S-F-R-W-N  ────────────────────────────
  {
    code: 'HACK!', name: '효율 해커', tier: 'R', axes: 'S-F-R-W-N',
    lmhPattern:  'HHLLHHHHLL',
    pattern:     [3,3,1,1,3,3,3,3,1,1],
    idealScores: [9,9,3,3,9,9,9,9,3,3]
  },
  // ─── 24: SMART  S-F-R-W-L  ────────────────────────────
  {
    code: 'SMART', name: '짠테크 현자', tier: 'SR', axes: 'S-F-R-W-L',
    lmhPattern:  'HHLLHHHHHH',
    pattern:     [3,3,1,1,3,3,3,3,3,3],
    idealScores: [9,9,3,3,9,9,9,9,9,9]
  },
  // ─── 25: DOOM!  S-B-X-M-N  ────────────────────────────
  {
    code: 'DOOM!', name: '파멸 쇼핑러', tier: 'SR', axes: 'S-B-X-M-N',
    lmhPattern:  'HHHHLLLLLL',
    pattern:     [3,3,3,3,1,1,1,1,1,1],
    idealScores: [9,9,9,9,3,3,3,3,3,3]
  },
  // ─── 26: LOCK  S-B-X-M-L  ─────────────────────────────
  {
    code: 'LOCK', name: '잠금 장치러', tier: 'R', axes: 'S-B-X-M-L',
    lmhPattern:  'HHHHLLLLHH',
    pattern:     [3,3,3,3,1,1,1,1,3,3],
    idealScores: [9,9,9,9,3,3,3,3,9,9]
  },
  // ─── 27: PANIC  S-B-X-W-N  ────────────────────────────
  {
    code: 'PANIC', name: '품절 멘붕러', tier: 'N', axes: 'S-B-X-W-N',
    lmhPattern:  'HHHHLLHHLL',
    pattern:     [3,3,3,3,1,1,3,3,1,1],
    idealScores: [9,9,9,9,3,3,9,9,3,3]
  },
  // ─── 28: ALERT  S-B-X-W-L  ────────────────────────────
  {
    code: 'ALERT', name: '지출 경보기', tier: 'N', axes: 'S-B-X-W-L',
    lmhPattern:  'HHHHLLHHHH',
    pattern:     [3,3,3,3,1,1,3,3,3,3],
    idealScores: [9,9,9,9,3,3,9,9,9,9]
  },
  // ─── 29: GUILT  S-B-R-M-N  ────────────────────────────
  {
    code: 'GUILT', name: '자책 가계부', tier: 'N', axes: 'S-B-R-M-N',
    lmhPattern:  'HHHHHHLLLL',
    pattern:     [3,3,3,3,3,3,1,1,1,1],
    idealScores: [9,9,9,9,9,9,3,3,3,3]
  },
  // ─── 30: FORT  S-B-R-M-L  ─────────────────────────────
  {
    code: 'FORT', name: '방어 요새', tier: 'R', axes: 'S-B-R-M-L',
    lmhPattern:  'HHHHHHLLHH',
    pattern:     [3,3,3,3,3,3,1,1,3,3],
    idealScores: [9,9,9,9,9,9,3,3,9,9]
  },
  // ─── 31: SCAN  S-B-R-W-N  ─────────────────────────────
  {
    code: 'SCAN', name: '눈치 스캐너', axes: 'S-B-R-W-N', tier: 'N',
    lmhPattern:  'HHHHHHHHLL',
    pattern:     [3,3,3,3,3,3,3,3,1,1],
    idealScores: [9,9,9,9,9,9,9,9,3,3]
  },
  // ─── 32: ZERO  S-B-R-W-L  ─────────────────────────────
  {
    code: 'ZERO', name: '무지출 수도승', tier: 'SSR', axes: 'S-B-R-W-L',
    lmhPattern:  'HHHHHHHHHH',
    pattern:     [3,3,3,3,3,3,3,3,3,3],
    idealScores: [9,9,9,9,9,9,9,9,9,9]
  }
];
