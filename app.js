const demoNews=[
{id:"demo-1",title:"National update: नई प्रमुख खबर",category:"National",summary:"यह demo article है. Supabase connect करने के बाद live database news दिखाई जाएगी.",content:"यह demo content है. Admin panel से अपनी वास्तविक खबर publish करें.",image:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",published_at:new Date().toISOString()}
];
const $=s=>document.querySelector(s);
let remoteNews=null;
async function getRemoteNews(){try{const r=await fetch("news.json?"+Date.now()); if(r.ok) remoteNews=await r.json()}catch{} return remoteNews}
function getNews(){try{return remoteNews||JSON.parse(localStorage.getItem("tdi_news"))||demoNews}catch{return remoteNews||demoNews}}
function esc(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function article(){
 const id=new URLSearchParams(location.search).get("id"), n=getNews().find(x=>String(x.id)===String(id));
 if(!n)return;
 $("#article").innerHTML=`<span class="tag">${esc(n.category)}</span><h1>${esc(n.title)}</h1><p>${new Date(n.published_at).toLocaleString("hi-IN")}</p>${n.image?`<img src="${n.image}" alt="">`:""}<div class="article-content">${esc(n.content||n.summary)}</div>`;
}
document.addEventListener("DOMContentLoaded",()=>{
 $("#year")&&($("#year").textContent=new Date().getFullYear());
 $("#search")?.addEventListener("input",renderNews); $("#category")?.addEventListener("change",renderNews);
 $("#themeBtn")?.addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("tdi_theme",document.body.classList.contains("dark")?"dark":"light")});
 if(localStorage.getItem("tdi_theme")==="dark")document.body.classList.add("dark");
 if($("#newsGrid")){getRemoteNews().finally(renderNews)} if($("#article")){getRemoteNews().finally(article)}
});
