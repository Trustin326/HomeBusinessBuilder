// Home Business Builder — client-side demos
const $ = (q)=>document.querySelector(q);
const $$ = (q)=>document.querySelectorAll(q);
const now = ()=> new Date().toLocaleString();

document.getElementById('year').textContent = new Date().getFullYear();

const App = {};

// ---------------- Doc Maker ----------------
App.docMaker = function(){
  const p = $('#docPrompt').value.trim() || "Create a one‑page SOP for daily content workflow.";
  const template = `TITLE: ${p}
  
PURPOSE
- Outline the process to complete ${p.toLowerCase()}.

RESPONSIBILITIES
- Owner: You
- Tools: Doc Maker, Spreadsheet Lite, Email Tracker

STEPS
1) Plan tasks (15 minutes)
2) Draft content (30 minutes)
3) Review + polish (10 minutes)
4) Publish + track (5 minutes)

QUALITY CHECK
- Clear headline
- 3 bullets of value
- Call‑to‑action

TIMELINE
- Start: ${now()}
- Review: +24 hours

END`;
  $('#docOutput').textContent = template;
};

App.downloadText = function(outId, filename){
  const text = $('#'+outId).textContent || '';
  const blob = new Blob([text],{type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

// ---------------- Email Tracker (local) ----------------
const ET_KEY = 'hbb_email_tracker';
function etLoad(){
  try { return JSON.parse(localStorage.getItem(ET_KEY)||'[]'); } catch(e){ return []; }
}
function etSave(rows){
  localStorage.setItem(ET_KEY, JSON.stringify(rows));
}
function etRender(){
  const tbody = $('#etTable tbody');
  tbody.innerHTML = '';
  etLoad().forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.client}</td><td>${r.email}</td><td>${r.subject}</td><td>${r.opens}</td><td>${r.last}</td>`;
    tbody.appendChild(tr);
  });
}
App.etLog = function(){
  const client = $('#etClient').value || 'ACME Co';
  const email  = $('#etEmail').value || 'client@example.com';
  const subject = $('#etSubject').value || 'Quick intro & proposal';
  const rows = etLoad();
  rows.push({client,email,subject,opens:0,last:now()});
  etSave(rows); etRender();
};
App.etSimulate = function(){
  const rows = etLoad();
  if(rows.length===0){ App.etLog(); }
  const i = Math.floor(Math.random()*etLoad().length);
  rows[i].opens += 1;
  rows[i].last = now() + " (opened)";
  etSave(rows); etRender();
};
App.etCSV = function(){
  const rows = etLoad();
  const header = ["Client","Email","Subject","Opens","Last Activity"];
  const csv = [header.join(",")].concat(rows.map(r=>[r.client,r.email,r.subject,r.opens,r.last].join(","))).join("\n");
  const blob = new Blob([csv],{type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'email-tracker.csv';
  a.click();
};
etRender();

// ---------------- Slide Generator ----------------
App.slideGen = function(){
  const topic = $('#slideTopic').value || 'Home Business Kickstart';
  const points = [
    "Problem & Promise",
    "Market Snapshot",
    "Offer Breakdown",
    "Simple Funnel",
    "Tools & SOPs",
    "90‑Day Plan",
    "KPIs & Next Steps"
  ];
  const wrap = $('#slidesWrap');
  wrap.innerHTML = '';
  points.forEach((p,i)=>{
    const el = document.createElement('div');
    el.className = 'slide';
    el.innerHTML = `<h4>${i+1}. ${p}</h4><ul>
      <li>${topic} — key note</li>
      <li>Action step</li>
      <li>Owner & metric</li>
    </ul>`;
    wrap.appendChild(el);
  });
};

// ---------------- Spreadsheet Lite ----------------
function sheetRows(){
  const tb = $('#sheetTable tbody');
  return Array.from(tb.querySelectorAll('tr'));
}
App.sheetAddRow = function(){
  const tb = $('#sheetTable tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `<td contenteditable>Service</td>
  <td contenteditable>1</td>
  <td contenteditable>39</td>
  <td>=SUM(Bx*Cx)</td>`;
  tb.appendChild(tr);
  App.sheetSum(); // refresh totals
};
App.sheetSum = function(){
  const rows = sheetRows();
  rows.forEach((tr,idx)=>{
    const qty = parseFloat(tr.children[1].textContent)||0;
    const price = parseFloat(tr.children[2].textContent)||0;
    tr.children[3].textContent = (qty*price).toFixed(2);
  });
};

// ---------------- Blog Assistant ----------------
App.blogAssist = function(){
  const title = $('#blogTitle').value || '10 Side Hustles Using Microsoft 365';
  const outline = ['Intro','Hustle #1‑#5','Hustle #6‑#10','Tool Stack','Action Plan','Conclusion'];
  const draft = `# ${title}\n\n`+
  `Intro: Why home businesses thrive now.\n\n`+
  outline.map(h=>'## '+h+'\n- Key insight\n- Tip\n').join('\n')+
  `\nCTA: Grab the Home Business Builder to start today.`;
  $('#blogOut').textContent = draft;
};

// ---------------- Sales Copy Assistant ----------------
App.salesCopy = function(){
  const product = $('#salesProduct').value || 'Home Business Builder Pro';
  const copy = `PROBLEM\n
You’re juggling docs, emails, sites, and leads without a system.\n
AGITATION\n
That means lost time, missed replies, and stalled revenue.\n
SOLUTION — ${product}\n
- AI‑style Doc Maker & Blog Assistant\n- Email Tracker & Leads CSV\n- Slide & Site Generators\n\nCTA: Try the live demos below.`;
  $('#salesOut').textContent = copy;
};

// ---------------- Website Generator ----------------
App.siteGen = function(){
  const name = $('#siteName').value || 'DollHouse Digital Studio';
  const pitch = ($('#sitePitch').value || 'Templates, content, and automation for home‑run businesses.').replace(/</g,"&lt;");
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${name}</title>
  <style>body{font-family:Arial;padding:30px;max-width:900px;margin:0 auto;background:#f7fafc;color:#0b1b2b}
  .hero{display:flex;gap:18px;align-items:center}
  .hero .ball{width:80px;height:80px;border-radius:50%;background:linear-gradient(90deg,#22d3ee,#a78bfa)}
  .cta{display:inline-block;margin-top:12px;padding:10px 14px;border-radius:10px;background:#22d3ee;color:#07202a;text-decoration:none;font-weight:700}
  .card{background:#fff;border:1px solid #dbeafe;border-radius:14px;padding:16px;margin:14px 0}
  </style></head><body>
  <div class="hero"><div class="ball"></div><div><h1>${name}</h1><p>${pitch}</p><a class="cta" href="#">Buy Now</a></div></div>
  <div class="card"><h2>What You Get</h2><ul><li>Templates & checklists</li><li>Automation shortcuts</li><li>Quick start videos</li></ul></div>
  <div class="card"><h2>Contact</h2><p>Email: info@example.com</p></div>
  </body></html>`;
  const blob = new Blob([html],{type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name.replace(/\s+/g,'_')}.html`;
  a.click();
  $('#siteOut').textContent = 'Exported single‑file landing page: ' + a.download;
};

// ---------------- Leads Tracker ----------------
const LEAD_KEY = 'hbb_leads';
function leadLoad(){ try{return JSON.parse(localStorage.getItem(LEAD_KEY)||'[]')}catch(e){return []} }
function leadSave(rows){ localStorage.setItem(LEAD_KEY, JSON.stringify(rows)); }
function leadRender(){
  const tb = $('#leadTable tbody'); tb.innerHTML='';
  leadLoad().forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.name}</td><td>${r.email}</td><td>${r.tag}</td><td>${r.date}</td>`;
    tb.appendChild(tr);
  });
}
App.leadAdd = function(){
  const name = $('#leadName').value || 'Alex Client';
  const email = $('#leadEmail').value || 'alex@example.com';
  const tag = $('#leadTag').value || 'warm';
  const rows = leadLoad();
  rows.push({name,email,tag,date: now().split(',')[0]});
  leadSave(rows); leadRender();
};
App.leadCSV = function(){
  const rows = leadLoad();
  const header = ["Name","Email","Tag","Date"];
  const csv = [header.join(",")].concat(rows.map(r=>[r.name,r.email,r.tag,r.date].join(","))).join("\n");
  const blob = new Blob([csv],{type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leads.csv';
  a.click();
};
leadRender();

// ---------------- Apply / Buy (fake) ----------------
App.fakeApply = function(e){
  e.preventDefault();
  const data = Array.from(e.target.querySelectorAll('input,select')).map(i=>i.value);
  $('#applyOut').textContent = 'Received: ' + data.join(' • ') + '\\n(Replace this with your checkout handler)';
};
