const ALLOWED_PREFIXES = ["/__/auth/", "/__/firebase/"];
const UPSTREAM = "https://yeminga-play.firebaseapp.com";

function wantsHtml(request) {
  const accept = request.headers.get("Accept") || "";
  return accept.includes("text/html");
}

function errorResponse(request) {
  if (wantsHtml(request)) {
    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>로그인 연결 오류</title>
  <style>
    body { font-family: -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; background: #f7f7f8; color: #333; padding: 24px; }
    .box { text-align: center; max-width: 360px; }
    h1 { font-size: 20px; margin-bottom: 12px; }
    p { font-size: 15px; line-height: 1.6; color: #666; }
  </style>
</head>
<body>
  <div class="box">
    <h1>로그인 연결이 잠깐 안 되네 😢</h1>
    <p>지금 로그인 서버 연결이 일시적으로 원활하지 않아.<br>
       잠시 후에 다시 로그인 버튼을 눌러줘!</p>
  </div>
</body>
</html>`;
    return new Response(html, {
      status: 502,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  return new Response("Bad Gateway", { status: 502 });
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // (A) 경로 화이트리스트: 허용된 접두어가 아니면 거절
  const allowed = ALLOWED_PREFIXES.some((p) => url.pathname.startsWith(p));
  if (!allowed) {
    return new Response("Not Found", { status: 404 });
  }

  const targetUrl = UPSTREAM + url.pathname + url.search;

  // (B) fetch 실패를 try/catch로 처리
  try {
    const proxyRequest = new Request(targetUrl, context.request);
    const response = await fetch(proxyRequest);
    return new Response(response.body, response);
  } catch (err) {
    return errorResponse(context.request);
  }
}
