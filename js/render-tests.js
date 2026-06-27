document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('testGrid');
  if (!grid || !Array.isArray(window.TESTS)) return;

  window.TESTS.forEach(function (test, index) {
    // 카드 전체 링크
    const card = document.createElement('a');
    card.className = 'play-card';
    card.href = test.url;

    // 썸네일
    const thumb = document.createElement('img');
    thumb.className = 'thumb';
    thumb.src = test.thumbnail;
    thumb.alt = test.name;
    thumb.loading = 'lazy';

    // 카드 본문
    const body = document.createElement('div');
    body.className = 'play-card-body';

    const title = document.createElement('h3');
    title.className = 'play-card-title';
    title.textContent = test.name;

    const desc = document.createElement('p');
    desc.className = 'play-card-desc';
    desc.textContent = test.desc;

    const meta = document.createElement('p');
    meta.className = 'play-card-meta';
    meta.textContent = test.duration + ' · ' + test.questionCount;

    const participants = document.createElement('p');
    participants.className = 'play-card-participants';

    // 스켈레톤 먼저 표시
    const skeleton = document.createElement('span');
    skeleton.className = 'skeleton';
    participants.appendChild(skeleton);

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(meta);
    body.appendChild(participants);

    card.appendChild(thumb);
    card.appendChild(body);
    grid.appendChild(card);

    // 참여자 수 채우기 (Firestore 교체 시 이 부분을 async/await 로 변경)
    const count = window.getParticipantCount(test.id);
    participants.textContent = count.toLocaleString() + '명 참여';
  });
});
