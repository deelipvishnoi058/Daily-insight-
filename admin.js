const KEY="tdi_news";const $=s=>document.querySelector(s);
function load(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]}}
function save(a){localStorage.setItem(KEY,JSON.stringify(a));render()}
function esc(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function render(){const a=load();$("#adminList").innerHTML=a.length?a.map(n=>`<div><span><strong>${esc(n.title)}</strong><br><small>${esc(n.category)}</small></span><button class="secondary" onclick="removeNews('${n.id}')">Delete</button></div>`).join(""):"<p>No local news yet.</p>"}
window.removeNews=id=>{save(load().filter(n=>n.id!==id));$("#msg").textContent="News deleted locally."};
$("#newsForm").addEventListener("submit",e=>{e.preventDefault();const n={id:crypto.randomUUID(),title:title.value,category:newsCategory.value,image:image.value,summary:summary.value,content:content.value,published_at:new Date().toISOString()};save([n,...load()]);e.target.reset();$("#msg").textContent="News added. Download news.json and replace the GitHub file to publish."});
$("#downloadBtn").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(load(),null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="news.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)});
$("#restore").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(!Array.isArray(d))throw 0;save(d);$("#msg").textContent="Backup restored."}catch{$("#msg").textContent="Invalid JSON file."}});
$("#clearBtn").addEventListener("click",()=>{if(confirm("Local news delete करें?")){localStorage.removeItem(KEY);render();$("#msg").textContent="Local data cleared."}});
render();
