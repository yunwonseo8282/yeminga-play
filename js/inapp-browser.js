// 인앱 브라우저 여부 감지
export function isInAppBrowser() {
  const ua = (navigator.userAgent || '').toLowerCase();
  const keywords = ['kakaotalk', 'naver', 'instagram', 'fban', 'fbav', 'line', 'daum', 'band', 'everytimeapp'];
  return keywords.some(function (k) { return ua.indexOf(k) !== -1; });
}

// 인앱 브라우저면 외부 브라우저로 유도. 유도했으면 true, 아니면 false 반환
export function handleInAppBrowser() {
  if (!isInAppBrowser()) return false;

  const ua = (navigator.userAgent || '').toLowerCase();
  const targetUrl = window.location.href;

  // 안드로이드: intent 스킴으로 크롬 자동 실행
  if (ua.indexOf('android') !== -1) {
    const withoutScheme = targetUrl.replace(/^https?:\/\//, '');
    const intentUrl = 'intent://' + withoutScheme + '#Intent;scheme=https;package=com.android.chrome;end';
    window.location.href = intentUrl;
    return true;
  }

  // 아이폰 등: 자동 전환 불가 → 안내 모달 표시
  showExternalBrowserGuide();
  return true;
}

// 아이폰용 안내 모달 (동적 생성)
function showExternalBrowserGuide() {
  if (document.getElementById('inapp-guide-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'inapp-guide-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;padding:24px;';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:16px;padding:28px 22px;max-width:320px;text-align:center;">' +
      '<p style="font-size:17px;font-weight:700;margin:0 0 12px;">잠깐! 여기선 로그인이 안 돼</p>' +
      '<p style="font-size:14px;line-height:1.6;color:#555;margin:0 0 18px;">오른쪽 아래(또는 위) 메뉴 버튼을 눌러<br><b>\u2018다른 브라우저로 열기\u2019</b> 또는 <b>\u2018Safari로 열기\u2019</b>를<br>선택하면 로그인할 수 있어!</p>' +
      '<button id="inapp-guide-close" style="background:#eee;border:none;border-radius:10px;padding:10px 20px;font-size:14px;cursor:pointer;">닫기</button>' +
    '</div>';
  document.body.appendChild(overlay);
  document.getElementById('inapp-guide-close').addEventListener('click', function () {
    overlay.remove();
  });
}
