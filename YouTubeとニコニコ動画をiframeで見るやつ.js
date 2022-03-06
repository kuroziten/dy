/*
 * 原案：NOT
 * 作成者：国語辞典、NOT
 * 改修者：noname
 */
window.setInterval(() => {
  const bodies = document.querySelectorAll(".body");
  const youTubeURLs = ["https://www.youtube.com/watch?v=", "https://youtu.be/"];
  const nicoVideoURLs = ["https://www.nicovideo.jp/watch/", "https://nico.ms/"];
  // 複数のpatternのどれかを含むか確認する関数
  const includes = (text, patterns) =>
    patterns.some((pattern) => text.includes(pattern));
  // 複数のpatternを削除する関数
  const removePatterns = (text, patterns) =>
    patterns.reduce((text, pattern) => text.replace(pattern, ""), text);
  // テキストを埋め込みURLに変換する関数
  // 変換できないテキストが渡されたときはundefinedを返す
  const toEmbeddedURL = (text) =>
    includes(text, youTubeURLs)
      ? "https://www.youtube.com/embed/" + removePatterns(text, youTubeURLs)
      : includes(text, nicoVideoURLs)
      ? "https://embed.nicovideo.jp/watch/" +
        removePatterns(text, nicoVideoURLs)
      : undefined;
  const isSmartPhone = navigator.userAgent.match(/iPhone|Android.+Mobile/);
  for (const body of bodies) {
    const embeddedURL = toEmbeddedURL(body.innerText);
    if (!embeddedURL) continue;
    const iframe = document.createElement("iframe");
    iframe.setAttribute("width", isSmartPhone ? "200" : "440");
    iframe.setAttribute("height", isSmartPhone ? "112.5" : "247.5");
    iframe.setAttribute("src", embeddedURL);
    body.innerText = "";
    body.style.backgroundSize = "cover";
    body.appendChild(iframe);
    // 動画ロード後に要素のサイズを変更する
    setTimeout(() => {
      body.style.width = "";
      body.style.height = "";
    }, 1000);
  }
}, 1000);

// bookmarklet
// javascript:window.setInterval(()=>{const t=document.querySelectorAll(".body"),e=["https://www.youtube.com/watch?v=","https://youtu.be/"],o=["https://www.nicovideo.jp/watch/","https://nico.ms/"],i=(t,e)=>e.some(e=>t.includes(e)),n=(t,e)=>e.reduce((t,e)=>t.replace(e,""),t),c=t=>i(t,e)?"https://www.youtube.com/embed/"+n(t,e):i(t,o)?"https://embed.nicovideo.jp/watch/"+n(t,o):void 0,s=navigator.userAgent.match(/iPhone|Android.+Mobile/);for(const e of t){const t=c(e.innerText);if(!t)continue;const o=document.createElement("iframe");o.setAttribute("width",s?"200":"440"),o.setAttribute("height",s?"112.5":"247.5"),o.setAttribute("src",t),e.innerText="",e.style.backgroundSize="cover",e.appendChild(o),setTimeout(()=>{e.style.width="",e.style.height=""},1e3)}},1e3);
