const KEY="tdi_news";
const $=s=>document.querySelector(s);
const demo=[{id:"demo-1",title:"The Daily Insight शुरू करें",category:"National",summary:"यह शुरुआती demo story है। इसे हटाकर अपनी खबर जोड़ें।",content:"अपनी वास्तविक खबर यहाँ लिखें।",image:"",published_at:new Date().toISOString()}];

function load(){try{return JSON.parse(localStorage.getItem(KEY))||demo}catch{return demo}}
function save(a){localStorage.setItem(KEY,JSON.stringify(a)); render()}
function esc(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function render(){
 const a=load();
 $("#adminList").innerHTML=a.map(n=>`<div style="padding:12px 0;border-bottom:1px solid #ddd"><strong>${esc(n.title)}</strong><br><small>${esc(n.category)}</small> <button onclick="removeNews('${n.id}')">Delete</button></div>`).join("")||"<p>No local news.</p>";
}
window.removeNews=id=>{save(load().filter(n=>n.id!==id));$("#msg").textContent="Deleted locally."}
$("#newsForm").addEventListener("submit",e=>{
 e.preventDefault();
 const n={id:crypto.randomUUID(),title:title.value,category:newsCategory.value,image:image.value,summary:summary.value,content:content.value,published_at:new Date().toISOString()};
 save([n,...load()]);e.target.reset();$("#msg").textContent="News added locally. Download backup to publish.";
});
$("#downloadBtn").addEventListener("click",()=>{
 const blob=new Blob([JSON.stringify(load(),null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="news.json";a.click();URL.revokeObjectURL(a.href);
});
$("#restore").addEventListener("change",async e=>{
 const f=e.target.files[0];if(!f)return;
 try{const data=JSON.parse(await f.text());if(!Array.isArray(data))throw Error();save(data);$("#msg").textContent="Backup restored."}
 catch{$("#msg").textContent="Invalid JSON backup."}
});
$("#clearBtn").addEventListener("click",()=>{if(confirm("Local news delete करें?")){localStorage.removeItem(KEY);render();$("#msg").textContent="Local news cleared."}});
render();
