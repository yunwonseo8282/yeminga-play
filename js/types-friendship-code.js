/**
 * types-friendship-code.js — FC코드 우정 유형 32개 표준 패턴 데이터
 *
 * 축 ↔ 차원 ↔ lmhPattern 변환 규칙:
 *   축1(dim1,2): C→LL, W→HH  (마음개방)
 *   축2(dim3,4): S→LL, T→HH  (밀착)
 *   축3(dim5,6): L→LL, V→HH  (신뢰)  ← 축 왼쪽 글자가 L임에 주의
 *   축4(dim7,8): Q→LL, F→HH  (케미)
 *   축5(dim9,10): P→LL, D→HH (갈등)
 *
 * lmhPattern 은 차원1~10 순서(10자리). 각 축이 2자리를 차지.
 * pattern: L→1, H→3  (사용자 답변엔 M=2 가 있지만 표준패턴엔 없음)
 * idealScores: L→3, H→9
 * bestMatch: 찰떡 친구 코드 (갈등 축만 뒤집은 유형 = 16쌍 상호 매칭)
 * tier: 다수 조합 W-T-V-Q-P 대비 벗어난 축 수 (0~1=N, 2=R, 3=SR, 4~5=SSR)
 */
window.TYPES_FRIENDSHIP_CODE = [
  { code: 'BFF4U', name: '순한맛 찐친', tier: 'N', axes: 'W-T-V-Q-P',
    lmhPattern: 'HHHHHHLLLL', pattern: [3,3,3,3,3,3,1,1,1,1], idealScores: [9,9,9,9,9,9,3,3,3,3], bestMatch: 'REALTK' },
  { code: 'REALTK', name: '팩폭 다정러', tier: 'N', axes: 'W-T-V-Q-D',
    lmhPattern: 'HHHHHHLLHH', pattern: [3,3,3,3,3,3,1,1,3,3], idealScores: [9,9,9,9,9,9,3,3,9,9], bestMatch: 'BFF4U' },
  { code: 'SHY99', name: '낯가림 순둥이', tier: 'N', axes: 'C-T-V-Q-P',
    lmhPattern: 'LLHHHHLLLL', pattern: [1,1,3,3,3,3,1,1,1,1], idealScores: [3,3,9,9,9,9,3,3,3,3], bestMatch: 'POKER' },
  { code: 'POKER', name: '무표정 해결사', tier: 'R', axes: 'C-T-V-Q-D',
    lmhPattern: 'LLHHHHLLHH', pattern: [1,1,3,3,3,3,1,1,3,3], idealScores: [3,3,9,9,9,9,3,3,9,9], bestMatch: 'SHY99' },
  { code: 'SOLO', name: '거리두기 다정러', tier: 'N', axes: 'W-S-V-Q-P',
    lmhPattern: 'HHLLHHLLLL', pattern: [3,3,1,1,3,3,1,1,1,1], idealScores: [9,9,3,3,9,9,3,3,3,3], bestMatch: 'HONEST' },
  { code: 'HONEST', name: '거리두기 직진러', tier: 'R', axes: 'W-S-V-Q-D',
    lmhPattern: 'HHLLHHLLHH', pattern: [3,3,1,1,3,3,1,1,3,3], idealScores: [9,9,3,3,9,9,3,3,9,9], bestMatch: 'SOLO' },
  { code: 'EZGO', name: '쿨한 평화러', tier: 'N', axes: 'W-T-L-Q-P',
    lmhPattern: 'HHHHLLLLLL', pattern: [3,3,3,3,1,1,1,1,1,1], idealScores: [9,9,9,9,3,3,3,3,3,3], bestMatch: 'FRANK' },
  { code: 'FRANK', name: '쿨한 직구러', tier: 'R', axes: 'W-T-L-Q-D',
    lmhPattern: 'HHHHLLLLHH', pattern: [3,3,3,3,1,1,1,1,3,3], idealScores: [9,9,9,9,3,3,3,3,9,9], bestMatch: 'EZGO' },
  { code: 'HYPE', name: '텐션 담당 찐친', tier: 'N', axes: 'W-T-V-F-P',
    lmhPattern: 'HHHHHHHHLL', pattern: [3,3,3,3,3,3,3,3,1,1], idealScores: [9,9,9,9,9,9,9,9,3,3], bestMatch: 'ALLIN' },
  { code: 'ALLIN', name: '올인 절친', tier: 'R', axes: 'W-T-V-F-D',
    lmhPattern: 'HHHHHHHHHH', pattern: [3,3,3,3,3,3,3,3,3,3], idealScores: [9,9,9,9,9,9,9,9,9,9], bestMatch: 'HYPE' },
  { code: 'LOWKY', name: '은은한 관찰러', tier: 'R', axes: 'C-S-V-Q-P',
    lmhPattern: 'LLLLHHLLLL', pattern: [1,1,1,1,3,3,1,1,1,1], idealScores: [3,3,3,3,9,9,3,3,3,3], bestMatch: 'SNIPE' },
  { code: 'SNIPE', name: '조용한 저격수', tier: 'SR', axes: 'C-S-V-Q-D',
    lmhPattern: 'LLLLHHLLHH', pattern: [1,1,1,1,3,3,1,1,3,3], idealScores: [3,3,3,3,9,9,3,3,9,9], bestMatch: 'LOWKY' },
  { code: 'CHILL', name: '무던 껌딱지', tier: 'R', axes: 'C-T-L-Q-P',
    lmhPattern: 'LLHHLLLLLL', pattern: [1,1,3,3,1,1,1,1,1,1], idealScores: [3,3,9,9,3,3,3,3,3,3], bestMatch: 'BLUNT' },
  { code: 'BLUNT', name: '무뚝뚝 직진러', tier: 'SR', axes: 'C-T-L-Q-D',
    lmhPattern: 'LLHHLLLLHH', pattern: [1,1,3,3,1,1,1,1,3,3], idealScores: [3,3,9,9,3,3,3,3,9,9], bestMatch: 'CHILL' },
  { code: 'LOUD', name: '텐션만 하이', tier: 'R', axes: 'C-T-V-F-P',
    lmhPattern: 'LLHHHHHHLL', pattern: [1,1,3,3,3,3,3,3,1,1], idealScores: [3,3,9,9,9,9,9,9,3,3], bestMatch: 'STORM' },
  { code: 'STORM', name: '폭풍 츤데레', tier: 'SR', axes: 'C-T-V-F-D',
    lmhPattern: 'LLHHHHHHHH', pattern: [1,1,3,3,3,3,3,3,3,3], idealScores: [3,3,9,9,9,9,9,9,9,9], bestMatch: 'LOUD' },
  { code: 'FADE', name: '산뜻한 흘러가러', tier: 'R', axes: 'W-S-L-Q-P',
    lmhPattern: 'HHLLLLLLLL', pattern: [3,3,1,1,1,1,1,1,1,1], idealScores: [9,9,3,3,3,3,3,3,3,3], bestMatch: 'CLEAR' },
  { code: 'CLEAR', name: '담백한 팩폭러', tier: 'SR', axes: 'W-S-L-Q-D',
    lmhPattern: 'HHLLLLLLHH', pattern: [3,3,1,1,1,1,1,1,3,3], idealScores: [9,9,3,3,3,3,3,3,9,9], bestMatch: 'FADE' },
  { code: 'BEAM', name: '원거리 텐션러', tier: 'R', axes: 'W-S-V-F-P',
    lmhPattern: 'HHLLHHHHLL', pattern: [3,3,1,1,3,3,3,3,1,1], idealScores: [9,9,3,3,9,9,9,9,3,3], bestMatch: 'FLARE' },
  { code: 'FLARE', name: '원거리 화력러', tier: 'SR', axes: 'W-S-V-F-D',
    lmhPattern: 'HHLLHHHHHH', pattern: [3,3,1,1,3,3,3,3,3,3], idealScores: [9,9,3,3,9,9,9,9,9,9], bestMatch: 'BEAM' },
  { code: 'PARTY', name: '분위기 셔틀', tier: 'R', axes: 'W-T-L-F-P',
    lmhPattern: 'HHHHLLHHLL', pattern: [3,3,3,3,1,1,3,3,1,1], idealScores: [9,9,9,9,3,3,9,9,3,3], bestMatch: 'BLAST' },
  { code: 'BLAST', name: '다 쏟는 화력덕', tier: 'SR', axes: 'W-T-L-F-D',
    lmhPattern: 'HHHHLLHHHH', pattern: [3,3,3,3,1,1,3,3,3,3], idealScores: [9,9,9,9,3,3,9,9,9,9], bestMatch: 'PARTY' },
  { code: 'GHOST', name: '고요한 은둔러', tier: 'SR', axes: 'C-S-L-Q-P',
    lmhPattern: 'LLLLLLLLLL', pattern: [1,1,1,1,1,1,1,1,1,1], idealScores: [3,3,3,3,3,3,3,3,3,3], bestMatch: 'LONER' },
  { code: 'LONER', name: '독고다이 팩폭러', tier: 'SSR', axes: 'C-S-L-Q-D',
    lmhPattern: 'LLLLLLLLHH', pattern: [1,1,1,1,1,1,1,1,3,3], idealScores: [3,3,3,3,3,3,3,3,9,9], bestMatch: 'GHOST' },
  { code: 'MUTE', name: '속조용 텐션러', tier: 'SR', axes: 'C-S-V-F-P',
    lmhPattern: 'LLLLHHHHLL', pattern: [1,1,1,1,3,3,3,3,1,1], idealScores: [3,3,3,3,9,9,9,9,3,3], bestMatch: 'REBEL' },
  { code: 'REBEL', name: '반항아 츤데레', tier: 'SSR', axes: 'C-S-V-F-D',
    lmhPattern: 'LLLLHHHHHH', pattern: [1,1,1,1,3,3,3,3,3,3], idealScores: [3,3,3,3,9,9,9,9,9,9], bestMatch: 'MUTE' },
  { code: 'BOOM', name: '방음 안 되는 껌딱지', tier: 'SR', axes: 'C-T-L-F-P',
    lmhPattern: 'LLHHLLHHLL', pattern: [1,1,3,3,1,1,3,3,1,1], idealScores: [3,3,9,9,3,3,9,9,3,3], bestMatch: 'CRASH' },
  { code: 'CRASH', name: '정면돌파 폭탄', tier: 'SSR', axes: 'C-T-L-F-D',
    lmhPattern: 'LLHHLLHHHH', pattern: [1,1,3,3,1,1,3,3,3,3], idealScores: [3,3,9,9,3,3,9,9,9,9], bestMatch: 'BOOM' },
  { code: 'SPARK', name: '반짝 인싸', tier: 'SR', axes: 'W-S-L-F-P',
    lmhPattern: 'HHLLLLHHLL', pattern: [3,3,1,1,1,1,3,3,1,1], idealScores: [9,9,3,3,3,3,9,9,3,3], bestMatch: 'NOVA' },
  { code: 'NOVA', name: '자유로운 화염러', tier: 'SSR', axes: 'W-S-L-F-D',
    lmhPattern: 'HHLLLLHHHH', pattern: [3,3,1,1,1,1,3,3,3,3], idealScores: [9,9,3,3,3,3,9,9,9,9], bestMatch: 'SPARK' },
  { code: 'ECHO', name: '겉텐션 미스터리', tier: 'SSR', axes: 'C-S-L-F-P',
    lmhPattern: 'LLLLLLHHLL', pattern: [1,1,1,1,1,1,3,3,1,1], idealScores: [3,3,3,3,3,3,9,9,3,3], bestMatch: 'ICEFIRE' },
  { code: 'ICEFIRE', name: '얼음불꽃', tier: 'SSR', axes: 'C-S-L-F-D',
    lmhPattern: 'LLLLLLHHHH', pattern: [1,1,1,1,1,1,3,3,3,3], idealScores: [3,3,3,3,3,3,9,9,9,9], bestMatch: 'ECHO' }
];
