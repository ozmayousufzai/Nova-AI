const tools = [
  {id:"chatgpt",name:"ChatGPT",category:"Productivity",rating:4.9,letter:"C",description:"A versatile AI assistant for writing, brainstorming, analysis, learning and everyday work.",url:"https://chatgpt.com/"},
  {id:"claude",name:"Claude",category:"Writing",rating:4.9,letter:"A",description:"A thoughtful assistant for writing, analysis, long documents and complex reasoning.",url:"https://claude.ai/"},
  {id:"perplexity",name:"Perplexity",category:"Research",rating:4.8,letter:"P",description:"AI-powered search and research with concise answers and source-focused exploration.",url:"https://www.perplexity.ai/"},
  {id:"canva",name:"Canva",category:"Design",rating:4.8,letter:"C",description:"Create presentations, social graphics, documents and visual content with AI features.",url:"https://www.canva.com/"},
  {id:"cursor",name:"Cursor",category:"Code",rating:4.8,letter:"Cu",description:"An AI-powered code editor designed to help developers understand and build software faster.",url:"https://www.cursor.com/"},
  {id:"notion",name:"Notion AI",category:"Productivity",rating:4.7,letter:"N",description:"Bring AI into notes, projects, documents and team knowledge with a flexible workspace.",url:"https://www.notion.com/product/ai"},
  {id:"grammarly",name:"Grammarly",category:"Writing",rating:4.6,letter:"G",description:"Improve clarity, tone, grammar and communication across everyday writing.",url:"https://www.grammarly.com/"},
  {id:"gamma",name:"Gamma",category:"Design",rating:4.7,letter:"Ga",description:"Turn ideas into polished presentations, documents and visual stories with AI.",url:"https://gamma.app/"},
  {id:"github",name:"GitHub Copilot",category:"Code",rating:4.7,letter:"G",description:"AI coding assistance for generating, explaining and completing code.",url:"https://github.com/features/copilot"},
  {id:"eleven",name:"ElevenLabs",category:"Productivity",rating:4.7,letter:"11",description:"Create natural AI voices and audio experiences for creative and professional projects.",url:"https://elevenlabs.io/"},
  {id:"consensus",name:"Consensus",category:"Research",rating:4.6,letter:"Co",description:"Explore scientific research and get evidence-oriented summaries from papers.",url:"https://consensus.app/"},
  {id:"figma",name:"Figma AI",category:"Design",rating:4.6,letter:"F",description:"Explore AI-assisted design workflows inside the collaborative Figma ecosystem.",url:"https://www.figma.com/ai/"}
];

let activeCategory = "All";
let compareIds = [];
let saved = JSON.parse(localStorage.getItem("novaSaved") || "[]");

const grid = document.getElementById("toolGrid");
const search = document.getElementById("searchInput");
const sort = document.getElementById("sortSelect");
const empty = document.getElementById("emptyState");

function renderTools(){
  const query = search.value.trim().toLowerCase();
  let visible = tools.filter(t => {
    const categoryMatch = activeCategory === "All" || t.category === activeCategory;
    const textMatch = `${t.name} ${t.category} ${t.description}`.toLowerCase().includes(query);
    return categoryMatch && textMatch;
  });

  if(sort.value === "rating") visible.sort((a,b)=>b.rating-a.rating);
  if(sort.value === "name") visible.sort((a,b)=>a.name.localeCompare(b.name));

  grid.innerHTML = visible.map(t => `
    <article class="tool-card">
      <div class="tool-top">
        <div class="tool-logo">${t.letter}</div>
        <button class="heart ${saved.includes(t.id) ? "saved":""}" data-save="${t.id}" aria-label="Save ${t.name}">
          ${saved.includes(t.id) ? "♥" : "♡"}
        </button>
      </div>
      <h3>${t.name}</h3>
      <p>${t.description}</p>
      <div class="tool-meta"><span class="tool-tag">${t.category}</span><span>★ ${t.rating}</span></div>
      <div class="card-actions">
        <button class="add-compare ${compareIds.includes(t.id) ? "selected":""}" data-compare="${t.id}">
          ${compareIds.includes(t.id) ? "Added ✓" : "Compare"}
        </button>
        <a href="${t.url}" target="_blank" rel="noopener noreferrer">Visit ↗</a>
      </div>
    </article>
  `).join("");

  empty.classList.toggle("hidden", visible.length !== 0);
}

function renderCompare(){
  const panel = document.getElementById("comparePanel");
  if(!compareIds.length){
    panel.innerHTML = `<div class="compare-placeholder">Choose tools above and they will appear here.</div>`;
    return;
  }
  const selected = compareIds.map(id => tools.find(t => t.id === id)).filter(Boolean);
  panel.innerHTML = `<div class="compare-grid">${selected.map(t=>`
    <div class="compare-item">
      <h3>${t.name}</h3>
      <p><strong>${t.category}</strong> · ★ ${t.rating}</p>
      <p>${t.description}</p>
      <button class="copy-btn remove-compare" data-remove="${t.id}" style="margin-top:14px;padding:7px 10px">Remove</button>
    </div>`).join("")}</div>`;
}

document.addEventListener("click", e => {
  const chip = e.target.closest("[data-category]");
  if(chip){
    activeCategory = chip.dataset.category;
    document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    renderTools();
  }

  const saveBtn = e.target.closest("[data-save]");
  if(saveBtn){
    const id = saveBtn.dataset.save;
    saved = saved.includes(id) ? saved.filter(x=>x!==id) : [...saved,id];
    localStorage.setItem("novaSaved", JSON.stringify(saved));
    renderTools();
  }

  const compareBtn = e.target.closest("[data-compare]");
  if(compareBtn){
    const id = compareBtn.dataset.compare;
    if(compareIds.includes(id)) compareIds = compareIds.filter(x=>x!==id);
    else if(compareIds.length < 3) compareIds.push(id);
    else alert("You can compare up to 3 tools.");
    renderTools(); renderCompare();
  }

  const removeBtn = e.target.closest("[data-remove]");
  if(removeBtn){
    compareIds = compareIds.filter(x=>x!==removeBtn.dataset.remove);
    renderTools(); renderCompare();
  }

  const promptBtn = e.target.closest("[data-prompt]");
  if(promptBtn){
    document.getElementById("promptInput").value = promptBtn.dataset.prompt;
    document.getElementById("promptInput").focus();
  }
});

search.addEventListener("input", renderTools);
sort.addEventListener("change", renderTools);

document.getElementById("themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("novaTheme", document.body.classList.contains("light") ? "light":"dark");
});
if(localStorage.getItem("novaTheme")==="light") document.body.classList.add("light");

document.getElementById("menuToggle").addEventListener("click",()=>{
  document.querySelector(".desktop-nav").classList.toggle("mobile-open");
});


const collectionData={
 student:{number:"01 / STUDENT POWER KIT",title:"Student Power Kit",description:"Research, study planning, writing and learning tools.",tools:["chatgpt","perplexity","notion","grammarly"]},
 creator:{number:"02 / CREATOR STUDIO",title:"Creator Studio",description:"A creative stack for visual ideas, presentations, content and audio.",tools:["canva","gamma","eleven","chatgpt"]},
 builder:{number:"03 / BUILDER STACK",title:"Builder Stack",description:"Coding, research and documentation tools for building projects.",tools:["cursor","github","perplexity","notion"]}
};
document.querySelectorAll("[data-collection]").forEach(card=>card.addEventListener("click",()=>{
 const d=collectionData[card.dataset.collection]; document.getElementById("collectionNumber").textContent=d.number; document.getElementById("collectionTitle").textContent=d.title; document.getElementById("collectionDescription").textContent=d.description;
 document.getElementById("collectionTools").innerHTML=d.tools.map(id=>{const t=tools.find(x=>x.id===id);return `<div class="modal-tool"><b>${t.name}</b><span>${t.category} · ★ ${t.rating}</span><a href="${t.url}" target="_blank" rel="noopener">Open tool ↗</a></div>`}).join("");
 document.getElementById("collectionModal").classList.remove("hidden"); document.body.classList.add("modal-open");
}));
function closeCollection(){document.getElementById("collectionModal").classList.add("hidden");document.body.classList.remove("modal-open")}
document.getElementById("closeCollection").addEventListener("click",closeCollection);
document.getElementById("collectionModal").addEventListener("click",e=>{if(e.target.id==="collectionModal")closeCollection()});

const promptInput=document.getElementById("promptInput"),responseBox=document.getElementById("responseBox"),responseContent=document.getElementById("responseContent"),responseStatus=document.getElementById("responseStatus"),sourceList=document.getElementById("sourceList");

async function askNovaOnWeb(question){
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({question})
  });
  const data = await response.json().catch(() => ({}));
  if(!response.ok) throw new Error(data.error || "NOVA could not search the web.");
  return data;
}

function formatNovaAnswer(text){
  return String(text || "No answer returned.")
    .split(/\n+/)
    .filter(Boolean)
    .map(p=>`<p>${escapeHtml(p)}</p>`)
    .join("");
}

function renderSources(sources){
  if(!sources || !sources.length){
    sourceList.classList.add("hidden");
    sourceList.innerHTML="";
    return;
  }
  sourceList.innerHTML = `<div class="source-list-title">WEB SOURCES</div>` +
    sources.slice(0,8).map((s,i)=>`
      <a class="source-link" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">
        <span>${i+1}. ${escapeHtml(s.title || s.url)}</span> ↗
      </a>`).join("");
  sourceList.classList.remove("hidden");
}

document.getElementById("runPrompt").addEventListener("click", async ()=>{
  const question=promptInput.value.trim();
  if(!question){
    responseStatus.textContent="READY";
    responseContent.innerHTML="<p>Please enter a question first.</p>";
    return;
  }

  responseBox.classList.add("is-loading");
  responseStatus.textContent="SEARCHING WEB…";
  sourceList.classList.add("hidden");
  sourceList.innerHTML="";
  responseContent.innerHTML="<p>NOVA is searching the web and preparing a cited answer…</p>";

  try{
    const data = await askNovaOnWeb(question);
    responseContent.innerHTML = `<div class="nova-topic">WEB-GROUNDED ANSWER</div>${formatNovaAnswer(data.answer)}`;
    renderSources(data.sources);
    responseStatus.textContent="ANSWERED";
  }catch(error){
    responseStatus.textContent="SETUP NEEDED";
    responseContent.innerHTML = `<p><strong>NOVA needs its web-search connection.</strong></p><p>${escapeHtml(error.message)}</p>`;
  }finally{
    responseBox.classList.remove("is-loading");
  }
});

promptInput.addEventListener("keydown",e=>{
  if(e.key==="Enter" && (e.ctrlKey || e.metaKey)){
    e.preventDefault();
    document.getElementById("runPrompt").click();
  }
});

function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
document.getElementById("copyResponse").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(responseContent.innerText);document.getElementById("copyResponse").textContent="Copied ✓";setTimeout(()=>document.getElementById("copyResponse").textContent="Copy",1200)}catch{alert("Copy is not available in this browser.")}});

document.addEventListener("keydown",e=>{
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==="k"){
    e.preventDefault(); search.focus();
  }
});

renderTools();
renderCompare();

document.querySelectorAll(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".desktop-nav").classList.remove("mobile-open")));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCollection()});

