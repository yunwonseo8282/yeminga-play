document.addEventListener('DOMContentLoaded', function () {
  var TEST_ID = 'spending-type';
  var STORAGE_KEY = 'mbuy-spending-type-progress';

  var data = (window.TESTS || []).find(function (t) { return t.id === TEST_ID; });
  if (!data) return;

  var intro     = document.getElementById('test-intro');
  var questions = document.getElementById('test-questions');
  if (!intro || !questions) return;

  // ── 실제 30문항 (questions-spending-type.js 에서 로드) ────────

  var QUESTIONS = window.QUESTIONS_SPENDING_TYPE;

  var TOTAL = QUESTIONS.length;

  // ── sessionStorage ───────────────────────────────────────────

  function loadProgress() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function saveProgress(idx, ans) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ idx: idx, answers: ans }));
    } catch (e) {}
  }

  function clearProgress() {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  var savedProgress = loadProgress();
  var currentIdx = 0;
  var answers = [];

  if (savedProgress) {
    currentIdx = savedProgress.idx || 0;
    answers    = savedProgress.answers || [];
  }

  // ── 인트로 렌더링 ────────────────────────────────────────────

  intro.innerHTML = '';

  var title = document.createElement('h1');
  title.className = 'sr-only';
  title.textContent = data.name;

  var heroImg = document.createElement('img');
  heroImg.src = data.introImage || data.thumbnail;
  heroImg.alt = data.name;
  heroImg.className = 'test-intro-hero';

  var introText = document.createElement('p');
  introText.className = 'test-intro-text';
  introText.innerHTML =
    '<span class="intro-line">딱 3분이면 돼</span>' +
    '<span class="intro-line intro-line--split">' +
      '<span>행동경제학 기반으로 설계된</span> <span>32가지 소비 유형 중</span>' +
    '</span>' +
    '<span class="intro-line">네가 어디에 속하는지 알려줄게</span>';

  var meta = document.createElement('p');
  meta.className = 'test-intro-meta';
  meta.textContent = '약 ' + data.duration + ' · ' + data.questionCount;

  var startBtn = document.createElement('button');
  startBtn.type = 'button';
  startBtn.className = 'btn btn--primary btn--lg test-intro-btn';
  startBtn.textContent = savedProgress ? '이어서 풀기' : '시작하기';

  intro.appendChild(title);
  intro.appendChild(heroImg);
  intro.appendChild(introText);
  intro.appendChild(meta);
  intro.appendChild(startBtn);

  // ── 진행바 + 뒤로가기 ───────────────────────────────────────

  var backBtn = document.getElementById('back-btn');

  // ── 슬라이드 헬퍼 ───────────────────────────────────────────

  var questionCard = questions;
  var isAnimating  = false;

  // direction: 'forward' | 'backward'
  function slideTransition(direction, callback) {
    var outClass = direction === 'forward' ? 'q-slide-out'      : 'q-slide-out-right';
    var inClass  = direction === 'forward' ? 'q-slide-in'       : 'q-slide-in-left';

    questionCard.classList.add(outClass);
    setTimeout(function () {
      questionCard.classList.remove(outClass);
      callback();
      questionCard.classList.add(inClass);
      setTimeout(function () {
        questionCard.classList.remove(inClass);
        isAnimating = false;
      }, 350);
    }, 300);
  }

  // ── 진행바 업데이트 ──────────────────────────────────────────

  function updateProgress(idx) {
    document.getElementById('progress-text').textContent = (idx + 1) + ' / ' + TOTAL;
    document.getElementById('progress-fill').style.width = ((idx + 1) / TOTAL * 100).toFixed(1) + '%';
  }

  // ── 질문 렌더링 ──────────────────────────────────────────────

  function renderQuestion(idx) {
    var q = QUESTIONS[idx];
    var choicesEl = document.getElementById('choices');
    var prevAnswer = answers[idx]; // undefined 면 미선택

    document.getElementById('question-text').textContent = q.text;
    choicesEl.innerHTML = '';

    // 뒤로가기 버튼 표시 항상 (첫 문항도 표시 — 인트로로 복귀)
    if (backBtn) backBtn.style.visibility = 'visible';

    q.choices.forEach(function (choice, choiceIdx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.textContent = choice.text;

      // 이전에 선택한 답 강조 표시
      if (prevAnswer === choiceIdx) {
        btn.classList.add('choice-btn--selected');
      }

      btn.addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        // 선택 강조
        choicesEl.querySelectorAll('.choice-btn').forEach(function (b) {
          b.classList.remove('choice-btn--selected');
        });
        btn.classList.add('choice-btn--selected');

        // 답 저장
        answers[idx] = choiceIdx;

        var nextIdx = idx + 1;

        if (nextIdx >= TOTAL) {
          saveProgress(nextIdx, answers);
          setTimeout(function () {
            clearProgress();
            showLoading(answers.slice()); // 완료 시점 답변 복사본 전달
            isAnimating = false;
          }, 250);
          return;
        }

        saveProgress(nextIdx, answers);

        setTimeout(function () {
          slideTransition('forward', function () {
            currentIdx = nextIdx;
            updateProgress(nextIdx);
            renderQuestion(nextIdx);
          });
        }, 250);
      });

      choicesEl.appendChild(btn);
    });
  }

  // ── 뒤로가기 클릭 ────────────────────────────────────────────

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      if (isAnimating) return;
      isAnimating = true;

      if (currentIdx === 0) {
        // 첫 문항 → 인트로로 복귀
        questions.hidden = true;
        intro.hidden = false;
        isAnimating = false;
        return;
      }

      var prevIdx = currentIdx - 1;
      saveProgress(prevIdx, answers);

      slideTransition('backward', function () {
        currentIdx = prevIdx;
        updateProgress(prevIdx);
        renderQuestion(prevIdx);
      });
    });
  }

  // ── 로딩 화면 + 채점 + 결과 페이지 이동 ────────────────────

  function showLoading(finalAnswers) {
    questions.hidden = true;
    var loading = document.getElementById('test-loading');
    if (!loading) {
      loading = document.createElement('section');
      loading.id = 'test-loading';
      loading.className = 'section test-loading';
      loading.innerHTML =
        '<div class="test-loading-spinner"></div>' +
        '<p class="test-loading-text">결과 계산 중...</p>';
      questions.parentNode.appendChild(loading);
    }
    loading.hidden = false;

    // 채점 — 로딩 연출(1.5초) 후 결과 페이지 이동
    setTimeout(function () {
      var scoreResult  = MBUYScoring.score(finalAnswers);
      var matchResult  = MBUYScoring.matchType(scoreResult);

      var typeCode     = matchResult.type.code;
      var matchPercent = matchResult.matchPercent;

      // 이동 전 진행 데이터 정리(이미 clearProgress() 호출됐지만 안전하게 한 번 더)
      clearProgress();

      var url = '/result/spending-type.html'
        + '?type=' + encodeURIComponent(typeCode)
        + '&p='    + encodeURIComponent(matchPercent);

      window.location.href = url;
    }, 1500);
  }

  // ── 시작하기 / 이어서 풀기 클릭 ─────────────────────────────

  startBtn.addEventListener('click', function () {
    intro.hidden = true;
    questions.hidden = false;
    updateProgress(currentIdx);
    renderQuestion(currentIdx);
  });
});
