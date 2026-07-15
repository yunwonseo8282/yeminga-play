export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = "https://yeminga-play.firebaseapp.com" + url.pathname + url.search;

  const proxyRequest = new Request(targetUrl, context.request);
  const response = await fetch(proxyRequest);

  const newResponse = new Response(response.body, response);
  return newResponse;
}
