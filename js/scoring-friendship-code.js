/**
 * scoring-friendship-code.js — FC코드 우정 유형 테스트 채점 모듈
 *
 * scoring.js(소비 테스트)와 로직 동일. 전역 변수명만 우정 테스트용으로 치환.
 * 순수 계산 함수만 담음. 유형 매칭 / 유사도 포함.
 *
 * 의존성:
 *   window.QUESTIONS_FRIENDSHIP_CODE (questions-friendship-code.js 에서 로드)
 *   window.TYPES_FRIENDSHIP_CODE     (types-friendship-code.js 에서 로드)
 */

(function () {

  /**
   * 10차원 원점수 계산
   *
   * @param {number[]} answers
   *   30개 답변의 선택 인덱스 배열 (0=A, 1=B, 2=C).
   *   score 로 변환: index + 1 (0→1, 1→2, 2→3)
   *
   * @returns {number[]} rawScores
   *   길이 10 배열. index 0 = 차원1 합계, ..., index 9 = 차원10 합계.
   *   각 값 범위: 3(전부 A) ~ 9(전부 C).
   */
  function calculateDimensionScores(answers) {
    var questions = window.QUESTIONS_FRIENDSHIP_CODE;
    if (!questions || questions.length !== 30) {
      console.error('[scoring-fc] QUESTIONS_FRIENDSHIP_CODE 이 로드되지 않았습니다.');
      return null;
    }
    if (!answers || answers.length !== 30) {
      console.error('[scoring-fc] answers 배열 길이가 30이 아닙니다:', answers && answers.length);
      return null;
    }

    // 차원 1~10 합계 (index 0~9)
    var rawScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 30; i++) {
      var q         = questions[i];
      var dimIndex  = q.dimension - 1;          // 차원 번호(1~10) → 배열 인덱스(0~9)
      var score     = answers[i] + 1;           // 선택 인덱스(0/1/2) → score(1/2/3)
      rawScores[dimIndex] += score;
    }

    return rawScores;
  }

  /**
   * 원점수 → L/M/H 분류
   *
   * 기준:
   *   3~5 → "L"  (왼쪽 성향)
   *   6   → "M"  (중립 — B 3개 정확히 6점, 구조적 중립 포착)
   *   7~9 → "H"  (오른쪽 성향)
   *
   * @param {number[]} rawScores  calculateDimensionScores() 의 반환값 (길이 10)
   * @returns {{ lmhArray: string[], lmhPattern: string }}
   */
  function classifyLMH(rawScores) {
    if (!rawScores || rawScores.length !== 10) {
      console.error('[scoring-fc] rawScores 길이가 10이 아닙니다.');
      return null;
    }

    var lmhArray = rawScores.map(function (score) {
      if (score <= 5) return 'L';
      if (score === 6) return 'M';
      return 'H';
    });

    return {
      lmhArray:   lmhArray,
      lmhPattern: lmhArray.join('')
    };
  }

  /**
   * 편의 함수: answers 배열 하나로 { rawScores, lmhArray, lmhPattern } 반환
   *
   * @param {number[]} answers  30개 선택 인덱스 배열 (0/1/2)
   * @returns {{ rawScores: number[], lmhArray: string[], lmhPattern: string } | null}
   */
  function score(answers) {
    var rawScores = calculateDimensionScores(answers);
    if (!rawScores) return null;

    var lmh = classifyLMH(rawScores);
    if (!lmh) return null;

    return {
      rawScores:  rawScores,
      lmhArray:   lmh.lmhArray,
      lmhPattern: lmh.lmhPattern
    };
  }

  // ── 보조: 사용자 lmhArray → pattern 숫자 배열(L=1, M=2, H=3) ──
  function lmhArrayToPattern(lmhArray) {
    return lmhArray.map(function (ch) {
      if (ch === 'L') return 1;
      if (ch === 'H') return 3;
      return 2; // M
    });
  }

  // ── 보조: 맨해튼 거리 계산 ──────────────────────────────────
  function manhattanDistance(userPattern, typePattern) {
    var dist = 0;
    for (var i = 0; i < 10; i++) {
      dist += Math.abs(userPattern[i] - typePattern[i]);
    }
    return dist;
  }

  // ── 보조: 정확 일치 차원 수 (사용자 M 차원은 항상 불일치) ──
  function exactMatchCount(userLmhArray, typeLmhPattern) {
    var count = 0;
    for (var i = 0; i < 10; i++) {
      if (userLmhArray[i] !== 'M' && userLmhArray[i] === typeLmhPattern[i]) {
        count++;
      }
    }
    return count;
  }

  // ── 보조: 원점수 절대 오차 합 ────────────────────────────────
  function rawScoreError(userRawScores, typeIdealScores) {
    var err = 0;
    for (var i = 0; i < 10; i++) {
      err += Math.abs(userRawScores[i] - typeIdealScores[i]);
    }
    return err;
  }

  /**
   * 유사도 % 계산 (압축 매핑 78~99%)
   * distance 0 → 99%, distance 20 → 78%.
   * 완벽 매칭도 99% — 100% 는 의도적으로 사용하지 않음.
   */
  function calcMatchPercent(distance) {
    return Math.round(99 - (distance / 20) * 21);
  }

  /**
   * 유형 매칭 — 3단계 타이브레이커로 반드시 하나를 선택
   *
   * @param {{ rawScores: number[], lmhArray: string[], lmhPattern: string }} userResult
   * @returns {{ type, distance, matchPercent, exactDimensions, rawScoreError, reachedStage }}
   */
  function matchType(userResult) {
    var types = window.TYPES_FRIENDSHIP_CODE;
    if (!types || !types.length) {
      console.error('[scoring-fc] TYPES_FRIENDSHIP_CODE 이 로드되지 않았습니다.');
      return null;
    }

    var userPattern = lmhArrayToPattern(userResult.lmhArray);

    // ── 1단계: 맨해튼 거리 최솟값 ───────────────────────────────
    var distances = types.map(function (t) {
      return manhattanDistance(userPattern, t.pattern);
    });
    var minDist = Math.min.apply(null, distances);
    var candidates = types.filter(function (t, i) {
      return distances[i] === minDist;
    });

    if (candidates.length === 1) {
      var winner = candidates[0];
      return {
        type:            winner,
        distance:        minDist,
        matchPercent:    calcMatchPercent(minDist),
        exactDimensions: exactMatchCount(userResult.lmhArray, winner.lmhPattern),
        rawScoreError:   rawScoreError(userResult.rawScores, winner.idealScores),
        reachedStage:    1
      };
    }

    // ── 2단계: 정확 일치 차원 수 최댓값 ─────────────────────────
    var exactCounts = candidates.map(function (t) {
      return exactMatchCount(userResult.lmhArray, t.lmhPattern);
    });
    var maxExact = Math.max.apply(null, exactCounts);
    var candidates2 = candidates.filter(function (t, i) {
      return exactCounts[i] === maxExact;
    });

    if (candidates2.length === 1) {
      var winner2 = candidates2[0];
      return {
        type:            winner2,
        distance:        minDist,
        matchPercent:    calcMatchPercent(minDist),
        exactDimensions: maxExact,
        rawScoreError:   rawScoreError(userResult.rawScores, winner2.idealScores),
        reachedStage:    2
      };
    }

    // ── 3단계: 원점수 절대 오차 합 최솟값 ───────────────────────
    var errors = candidates2.map(function (t) {
      return rawScoreError(userResult.rawScores, t.idealScores);
    });
    var minError = Math.min.apply(null, errors);
    var candidates3 = candidates2.filter(function (t, i) {
      return errors[i] === minError;
    });

    if (candidates3.length === 1) {
      var winner3 = candidates3[0];
      return {
        type:            winner3,
        distance:        minDist,
        matchPercent:    calcMatchPercent(minDist),
        exactDimensions: maxExact,
        rawScoreError:   minError,
        reachedStage:    3
      };
    }

    // ── 4단계: 결정론적 선택 (C3 소수 가중 해시) ──────────
    // candidates3 동점 시, 사용자 rawScores 기반 결정론적 시드로 선택.
    // 같은 답변 → 항상 같은 결과 보장 (랜덤 제거).
    var PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    var seed = 0;
    for (var s = 0; s < 10; s++) {
      seed += userResult.rawScores[s] * PRIMES[s];
    }
    var pickIndex = seed % candidates3.length;
    var winner4 = candidates3[pickIndex];
    return {
      type:            winner4,
      distance:        minDist,
      matchPercent:    calcMatchPercent(minDist),
      exactDimensions: maxExact,
      rawScoreError:   minError,
      reachedStage:    4
    };
  }

  // 전역 노출 (소비 테스트 MBUYScoring 과 이름 충돌 방지)
  window.MBUYScoringFriendshipCode = {
    calculateDimensionScores: calculateDimensionScores,
    classifyLMH:              classifyLMH,
    score:                    score,
    matchType:                matchType,
    calcMatchPercent:         calcMatchPercent
  };

})();
