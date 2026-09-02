const KEY="tdi_news";
const demo=[{"id":"demo-1","title":"The Daily Insight में आपका स्वागत है","category":"National","summary":"यह शुरुआती demo story है। GitHub में news.json बदलकर अपनी खबरें प्रकाशित करें।","content":"The Daily Insight की शुरुआत हो चुकी है। अपनी वास्तविक खबर का पूरा article content यहाँ रखें।","image":"https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=85","published_at":"2026-09-02T04:30:00.000Z"},{"id":"demo-2","title":"Technology और Mobility की नई अपडेट","category":"Technology","summary":"Technology और electric mobility से जुड़ी महत्वपूर्ण खबरें अब एक ही जगह।","content":"यह demo article है। इसे बदलकर अपनी वास्तविक खबर प्रकाशित करें।","image":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85","published_at":"2026-09-02T04:20:00.000Z"},{"id":"demo-3","title":"Business में आज के बड़े बदलाव","category":"Business","summary":"बाजार और business से जुड़ी जरूरी updates पर एक नजर।","content":"यह demo business story है।","image":"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85","published_at":"2026-09-02T04:10:00.000Z"}];
let remoteNews=null;
const $=s=>document.querySelector(s);
function esc(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
async function getRemoteNews(){try{const r=await fetch("news.json?v="+Date.now());if(r.ok)remoteNews=await r.json()}catch(e){}return remoteNews}
function getNews(){try{return remoteNews||JSON.parse(localStorage.getItem(KEY))||demo}catch{return remoteNews||demo}}
function card(n){return `<article class="news-card">${n.image?`<img src="${esc(n.image)}" alt="${esc(n.title)}">`:``}<div class="story-body"><span class="kicker">${esc(n.category)}</span><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p><a class="read" href="article.html?id=${encodeURIComponent(n.id)}">पूरी खबर पढ़ें →</a></div></article>`}
function renderHome(){
 const all=getNews(), q=($("#search")?.value||"").toLowerCase(), cat=$("#category")?.value||"all";
 const filtered=all.filter(n=>(cat==="all"||n.category===cat)&&(`${n.title} ${n.summary}`.toLowerCase().includes(q)));
 $("#count").textContent=`${filtered.length} stories`; $("#empty").classList.toggle("hidden",!!filtered.length);
 $("#newsGrid").innerHTML=filtered.map(card).join("");
 const lead=all[0]; if(lead)$("#leadStory").innerHTML=`${lead.image?`<img src="${esc(lead.image)}" alt="${esc(lead.title)}">`:``}<div class="story-body"><span class="kicker">${esc(lead.category)} • FEATURED</span><h1>${esc(lead.title)}</h1><p>${esc(lead.summary)}</p><span class="story-meta">${new Date(lead.published_at).toLocaleDateString("hi-IN")} · The Daily Insight</span><br><a class="read" href="article.html?id=${encodeURIComponent(lead.id)}">पूरी खबर पढ़ें →</a></div>`;
 $("#sideStories").innerHTML=all.slice(1,3).map(n=>`<article class="side-card">${n.image?`<img src="${esc(n.image)}" alt="">`:``}<div class="story-body"><span class="kicker">${esc(n.category)}</span><h3>${esc(n.title)}</h3><a class="read" href="article.html?id=${encodeURIComponent(n.id)}">Read →</a></div></article>`).join("");
 $("#trending").innerHTML=all.slice(0,5).map((n,i)=>`<a class="trend-item" href="article.html?id=${encodeURIComponent(n.id)}"><span class="trend-no">0${i+1}</span><span><h3>${esc(n.title)}</h3><small>${esc(n.category)}</small></span></a>`).join("");
 $("#ticker").textContent=all.slice(0,3).map(n=>n.title).join("  •  ");
}
function renderArticle(){
 const id=new URLSearchParams(location.search).get("id"), n=getNews().find(x=>String(x.id)===String(id)); if(!n)return;
 document.title=n.title+" | The Daily Insight";
 $("#article").innerHTML=`<div class="article-cat">${esc(n.category)}</div><h1>${esc(n.title)}</h1><div class="meta">${new Date(n.published_at).toLocaleString("hi-IN")} · The Daily Insight</div>${n.image?`<img src="${esc(n.image)}" alt="${esc(n.title)}">`:``}<div class="article-content">${esc(n.content||n.summary)}</div>`;
}
document.addEventListener("DOMContentLoaded",async()=>{
 $("#today")&&($("#today").textContent=new Date().toLocaleDateString("hi-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"}));
 $("#year")&&($("#year").textContent=new Date().getFullYear());
 $("#themeBtn")?.addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("tdi_theme",document.body.classList.contains("dark")?"dark":"light")});
 if(localStorage.getItem("tdi_theme")==="dark")document.body.classList.add("dark");
 $("#menuBtn")?.addEventListener("click",()=>$("#mainnav").classList.toggle("open"));
 document.querySelectorAll("[data-cat]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();$("#category").value=a.dataset.cat;renderHome()}));
 $("#search")?.addEventListener("input",renderHome);$("#category")?.addEventListener("change",renderHome);
 $("#newsletter")?.addEventListener("submit",e=>{e.preventDefault();alert("Thanks! Newsletter signup is ready for backend integration.");e.target.reset()});
 await getRemoteNews();
 if($("#newsGrid"))renderHome(); if($("#article"))renderArticle();
});
