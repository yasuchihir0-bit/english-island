/* ---------- data ---------- */
const WORDS = {
  apple:{en:'apple',ja:'りんご',e:'🍎'}, banana:{en:'banana',ja:'バナナ',e:'🍌'}, orange:{en:'orange',ja:'オレンジ',e:'🍊'},
  strawberry:{en:'strawberry',ja:'いちご',e:'🍓'}, grapes:{en:'grapes',ja:'ぶどう',e:'🍇'}, melon:{en:'melon',ja:'メロン',e:'🍈'},
  dog:{en:'dog',ja:'犬',e:'🐶'}, cat:{en:'cat',ja:'ねこ',e:'🐱'}, rabbit:{en:'rabbit',ja:'うさぎ',e:'🐰'}, bear:{en:'bear',ja:'くま',e:'🐻'},
  soccer:{en:'soccer',ja:'サッカー',e:'⚽'}, baseball:{en:'baseball',ja:'野球',e:'⚾'}, tennis:{en:'tennis',ja:'テニス',e:'🎾'}, swimming:{en:'swimming',ja:'水泳',e:'🏊'},
  red:{en:'red',ja:'赤',e:'🟥'}, blue:{en:'blue',ja:'青',e:'🟦'}, green:{en:'green',ja:'緑',e:'🟩'}, yellow:{en:'yellow',ja:'黄色',e:'🟨'},
  milk:{en:'milk',ja:'牛乳',e:'🥛'}, pizza:{en:'pizza',ja:'ピザ',e:'🍕'}
};
const GROUPS = [
  ['apple','banana','orange','strawberry','grapes','melon'],
  ['dog','cat','rabbit','bear'],
  ['soccer','baseball','tennis','swimming'],
  ['red','blue','green','yellow'],
  ['milk','pizza','apple','banana']
];
const SPEAK = [
  {en:'apple',ja:'りんご',e:'🍎'}, {en:'strawberry',ja:'いちご',e:'🍓'},
  {en:'I like dogs.',ja:'わたしは犬が好きです。',e:'🐶'}, {en:'Nice to meet you.',ja:'はじめまして。',e:'🤝'},
  {en:'Do you like tennis?',ja:'あなたはテニスが好きですか？',e:'🎾'}, {en:'My name is Ken.',ja:'ぼくの名前はケンです。',e:'🙋'},
  {en:'I like blue.',ja:'わたしは青が好きです。',e:'🟦'}
];
const TALK = [
  {q:"Hello! I'm Mika. Nice to meet you.",situ:'はじめて会った人にあいさつされた',e:'👋',a:'Nice to meet you, too.',w:['Yes, I do.','I like red.']},
  {q:'Do you like dogs?',situ:'あなたは 🐶 が大好き',e:'🐶',a:'Yes, I do.',w:["No, I don't.",'I like soccer.']},
  {q:'Do you like milk?',situ:'あなたは 🥛 がにがて',e:'🥛',a:"No, I don't.",w:['Yes, I do.','Nice to meet you.']},
  {q:'What sport do you like?',situ:'あなたは ⚽ が好き',e:'⚽',a:'I like soccer.',w:['I like red.','Yes, I do.']},
  {q:'What color do you like?',situ:'あなたは 🟦 が好き',e:'🎨',a:'I like blue.',w:['I like baseball.',"No, I don't."]},
  {q:'What fruit do you like?',situ:'あなたは 🍓 が好き',e:'🧺',a:'I like strawberries.',w:['I like tennis.','My name is Aki.']},
  {q:'How do you spell your name?',situ:'あなたの名前は Ken',e:'✏️',a:'K, E, N.',w:['I like Ken.','Nice to meet you.']}
];
const SPELL = ['dog','cat','red','bear','milk','blue','apple','pizza'];

const STAGES = [
  {id:'s1',kind:'listen',name:'聞くマス',ic:'🔊',x:28,y:86,desc:'英語を聞いて、合う絵をえらぼう'},
  {id:'s2',kind:'spell', name:'つづるマス',ic:'✍️',x:70,y:73,desc:'文字をならべて、単語を作ろう'},
  {id:'s3',kind:'speak', name:'話すマス',ic:'🎤',x:32,y:59,desc:'声に出して言ってみよう'},
  {id:'s4',kind:'talk',  name:'会話マス',ic:'💬',x:72,y:45,desc:'聞かれたことに答えよう'},
  {id:'s5',kind:'review',name:'宝箱マス',ic:'🎁',x:34,y:31,desc:'苦手な問題を集中トレーニング'},
  {id:'boss',kind:'boss',name:'門番ガニ',ic:'🦀',x:60,y:13,desc:'まとめのバトル。ハートは3つ'}
];
const NEXT_ISLES = [
  {ic:'🏘️',n:'はじまりの村',d:'5年｜あいさつ・好きなもの',on:true},
  {ic:'🏪',n:'にぎわい市場',d:'5年｜できること・ほしいもの'},
  {ic:'🕰️',n:'時計の塔',d:'5年｜時こく・1日の生活'},
  {ic:'⚓',n:'旅立ちの港',d:'6年｜行きたい国・町しょうかい'},
  {ic:'🌲',n:'思い出の森',d:'6年｜夏休み・小学校の思い出'},
  {ic:'⛰️',n:'ゆめの山',d:'6年｜なりたい職業・中学校でしたいこと'}
];
const PALS = [
  {id:'chick',en:'chick',ja:'ひよこ',e:'🐤',r:'N'},{id:'frog',en:'frog',ja:'かえる',e:'🐸',r:'N'},
  {id:'hamster',en:'hamster',ja:'ハムスター',e:'🐹',r:'N'},{id:'turtle',en:'turtle',ja:'かめ',e:'🐢',r:'N'},
  {id:'fish',en:'fish',ja:'さかな',e:'🐟',r:'N'},{id:'snail',en:'snail',ja:'かたつむり',e:'🐌',r:'N'},
  {id:'fox',en:'fox',ja:'きつね',e:'🦊',r:'R'},{id:'panda',en:'panda',ja:'パンダ',e:'🐼',r:'R'},
  {id:'penguin',en:'penguin',ja:'ペンギン',e:'🐧',r:'R'},{id:'owl',en:'owl',ja:'ふくろう',e:'🦉',r:'R'},
  {id:'lion',en:'lion',ja:'ライオン',e:'🦁',r:'SR'},{id:'dolphin',en:'dolphin',ja:'イルカ',e:'🐬',r:'SR'},
  {id:'unicorn',en:'unicorn',ja:'ユニコーン',e:'🦄',r:'SR'},
  {id:'dragon',en:'dragon',ja:'ドラゴン',e:'🐉',r:'SSR'},{id:'dinosaur',en:'dinosaur',ja:'きょうりゅう',e:'🦖',r:'SSR'}
];
const ODDS = [['N',60],['R',28],['SR',10],['SSR',2]];
/* ガチャ券：がんばりポイント POINTS_PER_TICKET で1枚。勉強は1日 DAILY_MIN 分まで */
const POINTS_PER_TICKET = 10, DAILY_MIN = 60, SHARDS_FOR_FREE = 5;
const Q_MAX_SEC = 40;   // 1問で勉強時間として数える上限（放っておいても増えないように）
const REVIEW_MAX = 12;  // 「今日の復習」の最大問題数
const PTS = {neu:1, due:2, fixed:3, master:5, review:5}; // 新しい問題に正解／復習で正解／前にまちがえた問題に正解／マスター／今日の復習ぜんぶ

/* 覚えぐあい：0 はじめて → 4 マスター。正解すると1段階上がり、次に出すまでの日数がのびる */
const LV = ['🥚','🐣','🐥','🐔','👑'];
const LV_NAME = ['はじめて','聞いてわかる','見てわかる','言える','マスター'];
const INTERVAL = [0,1,3,7,14];
const SENTENCES = SPEAK.filter(s => s.en.includes(' '));
const ITEMS = [...Object.keys(WORDS).map(k => 'w:'+k), ...SENTENCES.map((_,i) => 's:'+i), ...TALK.map((_,i) => 't:'+i)];

/* ---------- state ---------- */
const KEY = 'english-island-v1';
const today = () => { const d = new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); };
function fresh(){ return {tickets:1,pts:0,m:{},rev:{d:''},log:{},stars:{},owned:{},shards:0,study:{d:'',sec:0},streak:{last:'',n:0},partner:null}; }
let S = fresh();
try { const raw = localStorage.getItem(KEY); if (raw){ const old = JSON.parse(raw);
  if (old.tickets === undefined && typeof old.coins === 'number') old.tickets = Math.max(1, Math.floor(old.coins / 50));
  delete old.coins; delete old.pulls; S = Object.assign(fresh(), old); migrate(old); } } catch(e) {}
function studyToday(){ if (S.study.d !== today()) S.study = {d:today(), sec:0, got:0}; return S.study; }
const doneToday = () => studyToday().sec >= DAILY_MIN * 60;
const fmtTime = sec => { sec = Math.floor(sec); const m = Math.floor(sec/60), s = sec % 60; return m ? `${m}分${s ? s + '秒' : ''}` : `${s}秒`; };
function addStudy(sec){
  const st = studyToday(), before = st.sec;
  st.sec = Math.min(before + Math.min(sec, Q_MAX_SEC), DAILY_MIN * 60);
  logToday().sec = st.sec;
  return st.sec - before;
}
function logToday(){ const d = today(); return S.log[d] || (S.log[d] = {sec:0, ok:0, ng:0}); }
function addPoints(n){
  S.pts += n; let got = 0;
  while (S.pts >= POINTS_PER_TICKET){ S.pts -= POINTS_PER_TICKET; S.tickets++; got++; }
  if (got) toast('🎫 ガチャ券ゲット！');
  return got;
}

/* ---------- 覚えぐあい（間をあけた復習） ---------- */
function dayNum(d = new Date()){ return Math.floor((d.getTime() - d.getTimezoneOffset()*60000) / 86400000); }
const mOf = id => S.m[id] || {lv:0, due:0, right:0, wrong:0};
function itemInfo(id){
  const [t,k] = id.split(':');
  if (t === 'w') return WORDS[k];
  if (t === 's') return SENTENCES[k];
  return {en:TALK[k].q, ja:'答え：' + TALK[k].a, e:TALK[k].e};
}
function dueItems(){
  const t = dayNum();
  return ITEMS.filter(id => S.m[id] && S.m[id].lv > 0 && S.m[id].due <= t)
    .sort((a,b) => (S.m[a].due - S.m[b].due) || (S.m[a].lv - S.m[b].lv));
}
const weakFirst = ids => shuffle(ids).sort((a,b) => mOf(a).lv - mOf(b).lv);
/* 正解・不正解を覚えぐあいに反映して、もらえるポイントを返す */
function grade(q, ok){
  const t = dayNum(), m = Object.assign({lv:0, due:0, right:0, wrong:0}, S.m[q.id]);
  const before = m.lv, wasDue = m.lv > 0 && m.due <= t;
  let pts = 0, mastered = false;
  if (q.retry){ if (ok) pts = PTS.neu; }                 // その場のやり直し：段階は変えない
  else if (ok){
    m.right++;
    pts = m.wrongDay !== undefined && m.wrongDay < t ? PTS.fixed : wasDue ? PTS.due : PTS.neu;
    delete m.wrongDay;
    if (m.upDay !== t){ m.lv = Math.min(4, m.lv + 1); m.upDay = t; }   // 1日に上がるのは1段階まで
    m.due = t + INTERVAL[m.lv];
    if (m.lv === 4 && !m.mastered){ m.mastered = true; mastered = true; pts += PTS.master; }
  } else {
    m.wrong++; m.lv = Math.max(1, m.lv - 1); m.due = t + 1; m.wrongDay = t;
  }
  S.m[q.id] = m;
  return {pts, before, after:m.lv, mastered};
}
function migrate(old){
  const t = dayNum();
  for (const k of Object.keys(old.learned || {})) if (WORDS[k] && !S.m['w:'+k]) S.m['w:'+k] = {lv:1, due:t, right:1, wrong:0};
  for (const raw of old.miss || []){ try { const x = JSON.parse(raw);
    const id = x.kind === 'talk' ? 't:'+x.i : x.kind === 'speak' ? null : 'w:'+x.key;
    if (id && ITEMS.includes(id)) S.m[id] = Object.assign({lv:1, due:t, right:0, wrong:1}, S.m[id], {wrongDay:t-1}); } catch(e) {} }
  delete S.learned; delete S.miss; if (S.study) delete S.study.got;
}
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} paintBar(); }

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
const pick = (a,n) => shuffle(a).slice(0,n);
function toast(msg){ const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); }

/* speech out */
let voice = null;
function pickVoice(){
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  voice = vs.find(v => /en[-_]US/.test(v.lang) && /Samantha|Google US|Aaron|Nicky/.test(v.name)) || vs.find(v => /en[-_]US/.test(v.lang)) || vs.find(v => /^en/.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function say(text, rate = 0.85){
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; if (voice) u.voice = voice; u.rate = rate;
  speechSynthesis.speak(u);
}

/* speech in — falls back to self-check where the browser or frame can't listen */
let micMode = (window.SpeechRecognition || window.webkitSpeechRecognition) ? 'auto' : 'self';
function hear(){
  return new Promise(res => {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    let r; try { r = new R(); } catch(e) { return res({ok:false,why:'none'}); }
    r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 5;
    let done = false;
    const fin = v => { if (done) return; done = true; clearTimeout(t); try { r.stop(); } catch(e) {} res(v); };
    r.onresult = e => fin({ok:true, alts:[...e.results[0]].map(a => a.transcript)});
    r.onerror = e => fin({ok:false, why:e.error});
    r.onend = () => fin({ok:false, why:'no-speech'});
    const t = setTimeout(() => fin({ok:false, why:'no-speech'}), 8000);
    try { r.start(); } catch(e) { fin({ok:false, why:'none'}); }
  });
}
const norm = s => s.toLowerCase().replace(/[^a-z' ]/g,' ').replace(/\s+/g,' ').trim();
function lev(a,b){ const m = Array.from({length:a.length+1},(_,i)=>[i]); for (let j=1;j<=b.length;j++) m[0][j]=j;
  for (let i=1;i<=a.length;i++) for (let j=1;j<=b.length;j++) m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return m[a.length][b.length]; }
function matchScore(target, alts){
  const tw = norm(target).split(' '); let best = 0;
  for (const a of alts){ const aw = norm(a).split(' ');
    const hit = tw.filter(w => aw.some(x => x === w || lev(x,w) <= (w.length > 4 ? 1 : 0))).length;
    best = Math.max(best, hit / tw.length); }
  return best;
}

/* ---------- top bar & tabs ---------- */
function paintBar(){ $('#coins').textContent = S.tickets; $('#streak').textContent = S.streak.n; }
let tab = 'map';
document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => { tab = b.dataset.tab; render(); });
function render(){
  document.querySelectorAll('.tabs button').forEach(b => b.dataset.tab === tab ? b.setAttribute('aria-current','page') : b.removeAttribute('aria-current'));
  ({map:renderMap, gacha:renderGacha, zukan:renderZukan})[tab]();
  paintBar(); window.scrollTo(0,0);
}

/* ---------- map ---------- */
/* map scenery: x/y in % of the map, size in px; kept clear of the stage path */
const SCENERY = [
  ['☀️',90,5,28,'day'],['🌙',90,5,26,'night'],['✨',28,4,14,'night twinkle'],['✨',74,16,12,'night twinkle'],['✨',10,24,12,'night twinkle'],
  ['☁️',22,4,30,'cloud'],['☁️',66,3,22,'cloud c2'],
  ['⛵',6,12,26,'bob'],['🐳',90,95,30,'bob'],['🐟',5,93,18,'bob'],['🐬',95,70,20,'bob'],
  ['🏡',86,27,30,''],['🏠',13,46,26,''],['🏫',88,58,30,''],['🌳',15,31,28,'sway'],['🌲',8,38,22,''],
  ['🌴',91,44,28,'sway'],['🌴',9,66,26,'sway'],['🦆',55,60,18,'bob'],['🌷',47,46,18,''],['🌼',53,48,15,''],
  ['🐄',48,71,24,''],['🌻',86,84,22,'sway'],['🍄',15,78,18,''],['🌳',78,93,26,''],['🐚',50,95,16,''],
  ['🪨',41,15,20,''],['🌲',25,19,22,''],['🦋',62,33,16,'bob'],['🐿️',13,88,18,'']
];
function terrainSVG(){
  const pts = STAGES.map(s => (s.x*3)+','+(s.y*4)).join(' L');
  const waves = [[20,24],[250,16],[12,170],[276,140],[284,250],[14,300],[30,392],[230,394]]
    .map(([x,y]) => `<path class="wave" d="M${x} ${y} q6 -5 12 0 t12 0"/>`).join('');
  return `<svg class="terrain" viewBox="0 0 300 400" aria-hidden="true">${waves}
    <path class="sand" d="M60 34C120 6 222 10 262 42C296 74 292 140 282 190C300 250 296 322 270 360C240 396 150 394 90 382C38 372 12 332 18 280C4 230 14 170 24 120C24 78 34 50 60 34Z"/>
    <path class="grass" d="M72 54C126 28 214 32 248 60C276 88 272 146 262 194C280 250 276 316 254 346C228 376 150 372 96 362C56 352 36 320 40 278C26 230 36 172 44 124C44 90 52 66 72 54Z"/>
    <path class="patch" d="M30 140C40 120 64 116 72 140C78 170 46 196 34 176Z"/><path class="patch" d="M236 300C252 284 272 296 266 318C258 336 232 330 236 300Z"/>
    <ellipse class="pond" cx="165" cy="242" rx="24" ry="13"/>
    <path class="road" d="M${pts}"/><path class="dots" d="M${pts}"/></svg>`;
}

function studyCard(){
  const st = studyToday(), done = st.sec >= DAILY_MIN * 60;
  return `<div class="study" aria-label="ガチャ券と今日の勉強時間">
    <div class="study-top"><b>🎫 つぎのガチャ券まで あと <span class="num">${POINTS_PER_TICKET - S.pts}</span>pt</b>
      <span class="study-next">⏱️ 今日 ${Math.floor(st.sec/60)}分 / ${DAILY_MIN}分</span></div>
    <div class="cells" style="grid-template-columns:repeat(${POINTS_PER_TICKET},1fr)">${Array.from({length:POINTS_PER_TICKET}, (_,i) =>
      `<span class="cell-t ${i < S.pts ? 'full' : ''}">${i < S.pts ? '⭐' : ''}</span>`).join('')}</div>
    <p class="sub">${done ? `今日の勉強は${DAILY_MIN}分でおしまい。よくがんばったね！ また明日ね。`
      : `正解でポイント（復習は2pt、前にまちがえた問題は3pt）。${POINTS_PER_TICKET}ptでガチャ券1枚。`}</p>
  </div>`;
}
const DAILY_STAGE = {id:'daily', kind:'daily', name:'今日の復習', ic:'🔁'};
function reviewCard(){
  const due = dueItems(), done = S.rev.d === today();
  if (!due.length) return `<div class="review ${done ? 'done' : 'none'}"><b>${done ? '✅ 今日の復習はおわり！' : '🔁 今日の復習はないよ'}</b>
    <span class="sub">${done ? 'つぎはマップを進もう。' : '新しいマスに進もう。'}</span></div>`;
  const n = Math.min(due.length, REVIEW_MAX);
  if (done) return `<div class="review done"><b>✅ 今日の復習はおわり！</b>
    <span class="sub">まだ復習できる問題が ${due.length}問 あるよ。やりたいときだけでOK（復習の正解は2pt）。</span>
    <button class="ghost" id="rev">もう少し復習する（${n}問）</button></div>`;
  return `<div class="review"><b>🔁 今日の復習 ${n}問</b>
    <span class="sub">わすれかけた問題だけが出るよ。先に復習すると、よく覚えられるよ。ぜんぶ終わると +${PTS.review}pt</span>
    <button class="big" id="rev">はじめる</button></div>`;
}
const unlocked = i => i === 0 || S.stars[STAGES[i-1].id] > 0;
function renderMap(){
  const nextIdx = STAGES.findIndex((s,i) => unlocked(i) && !S.stars[s.id]);
  const here = STAGES[nextIdx >= 0 ? nextIdx : STAGES.length-1];
  const pal = S.partner && PALS.find(p => p.id === S.partner);
  $('#view').innerHTML = `
    <div class="areahead"><div><h2>🏘️ はじまりの村</h2><p class="sub">5年｜あいさつ・好きなもの</p></div>
      <span class="tag on">${Object.keys(S.stars).length}/${STAGES.length} クリア</span></div>
    ${reviewCard()}
    ${studyCard()}
    <div class="map" role="group" aria-label="はじまりの村のマップ">
      ${terrainSVG()}
      ${SCENERY.map(([e,x,y,sz,c]) => `<span class="deco ${c}" style="left:${x}%;top:${y}%;font-size:${sz}px">${e}</span>`).join('')}
      ${STAGES.map((s,i) => {
        const lock = !unlocked(i), st = S.stars[s.id] || 0;
        return `<button class="node ${s.kind==='boss'?'boss':''} ${lock?'locked':''} ${i===nextIdx?'next':''}" style="left:${s.x}%;top:${s.y}%" data-i="${i}" aria-label="${s.name}${lock?'（まだ行けない）':''}">
          <span class="disc">${lock ? '🔒' : s.ic}</span><span class="lab">${s.name}</span>
          <span class="st">${st ? '★'.repeat(st) + '☆'.repeat(3-st) : ''}</span></button>`;
      }).join('')}
      ${pal ? `<span class="partner" style="left:${here.x+13}%;top:${here.y-6}%">${pal.e}</span>` : ''}
    </div>
    <p class="sub">1日1〜2マスずつ進もう。★3つをめざして、何回でもちょうせんできるよ。</p>
    <h2>つぎの島</h2>
    <div class="islands">${NEXT_ISLES.map(o => `<div class="isle"><span class="ic">${o.ic}</span><div><b>${o.n}</b><span>${o.d}</span></div><span class="tag ${o.on?'on':''}">${o.on?'いまここ':'じゅんび中'}</span></div>`).join('')}</div>`;
  document.querySelectorAll('.node').forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    if (!unlocked(i)) return toast('前のマスをクリアすると行けるよ');
    if (doneToday()) return toast(`今日の勉強は${DAILY_MIN}分でおしまい。また明日ね！`);
    startStage(STAGES[i]);
  });
  if ($('#rev')) $('#rev').onclick = () => {
    if (doneToday()) return toast(`今日の勉強は${DAILY_MIN}分でおしまい。また明日ね！`);
    startStage(DAILY_STAGE);
  };
}

/* ---------- question building ---------- */
function wordChoices(key){
  const grp = GROUPS.find(g => g.includes(key));
  let pool = grp.filter(k => k !== key);
  if (pool.length < 3) pool = pool.concat(Object.keys(WORDS).filter(k => k !== key && !pool.includes(k)));
  return shuffle([key, ...pick(pool,3)]);
}
const Q = {
  listen:  k => ({kind:'listen', id:'w:'+k, key:k, choices:wordChoices(k)}),
  read:    k => ({kind:'read', id:'w:'+k, key:k, choices:wordChoices(k)}),
  spell:   k => ({kind:'spell', id:'w:'+k, key:k}),
  sayword: k => ({kind:'speak', id:'w:'+k, it:WORDS[k]}),
  speak:   i => ({kind:'speak', id:'s:'+i, it:SENTENCES[i]}),
  talk:    i => ({kind:'talk', id:'t:'+i, t:TALK[i], choices:shuffle([TALK[i].a, ...TALK[i].w])})
};
/* 覚えぐあいに合わせて問題の形を決める：聞く → 見る → 言う → つづる */
function makeQ(id){
  const [t,k] = id.split(':');
  if (t === 't') return Q.talk(+k);
  if (t === 's') return Q.speak(+k);
  const lv = mOf(id).lv;
  return lv <= 1 ? Q.listen(k) : lv === 2 ? Q.read(k) : lv === 3 || !SPELL.includes(k) ? Q.sayword(k) : Q.spell(k);
}
const ids = (t, list) => list.map(k => t + ':' + k);
const key = id => id.split(':')[1];
function build(stage){
  const W = ids('w', Object.keys(WORDS)), SP = ids('w', SPELL), SE = SENTENCES.map((_,i) => 's:'+i), TA = TALK.map((_,i) => 't:'+i);
  if (stage.kind === 'daily')  return dueItems().slice(0, REVIEW_MAX).map(makeQ);
  if (stage.kind === 'listen') return weakFirst(W).slice(0,8).map(id => Q.listen(key(id)));
  if (stage.kind === 'spell')  return weakFirst(SP).slice(0,6).map(id => Q.spell(key(id)));
  if (stage.kind === 'speak')  return shuffle([...weakFirst(SE).slice(0,3).map(id => Q.speak(+key(id))), ...weakFirst(W).slice(0,2).map(id => Q.sayword(key(id)))]);
  if (stage.kind === 'talk')   return weakFirst(TA).slice(0,6).map(id => Q.talk(+key(id)));
  if (stage.kind === 'review'){  // 宝箱マス：苦手なもの（まちがえた回数が多い・段階が低い）を集中
    const weak = shuffle(ITEMS).sort((a,b) => (mOf(b).wrong - mOf(b).right/3) - (mOf(a).wrong - mOf(a).right/3) || mOf(a).lv - mOf(b).lv);
    return weak.slice(0,8).map(makeQ);
  }
  return shuffle([...weakFirst(W).slice(0,3).map(id => Q.listen(key(id))), ...weakFirst(SP).slice(0,2).map(id => Q.spell(key(id))),
    ...weakFirst(SE).slice(0,2).map(id => Q.speak(+key(id))), ...weakFirst(TA).slice(0,3).map(id => Q.talk(+key(id)))]);
}

/* ---------- quiz run ---------- */
let run = null;
function startStage(stage){
  const qs = build(stage);
  run = {stage, qs, base:qs.length, i:0, right:0, hearts:stage.kind==='boss'?3:null, sec:0, pts:0, tickets:0, ups:0, t0:0};
  $('#quiz').hidden = false; document.body.style.overflow = 'hidden';
  showQ();
}
function closeQuiz(){ if ('speechSynthesis' in window) speechSynthesis.cancel(); $('#quiz').hidden = true; document.body.style.overflow = ''; run = null; render(); }
function shell(inner){
  const pct = Math.round(run.i / run.qs.length * 100), q = run.qs[run.i];
  $('#quiz').innerHTML = `
    <div class="qtop"><button class="x" id="qx" aria-label="やめる">✕</button>
      <div class="prog" aria-label="すすみぐあい"><i style="width:${pct}%"></i></div>
      ${run.hearts !== null ? `<span class="hearts" aria-label="ハート ${run.hearts}">${'❤️'.repeat(run.hearts)}${'🤍'.repeat(3-run.hearts)}</span>` : `<span class="pill">${Math.min(run.i+1, run.qs.length)}/${run.qs.length}</span>`}</div>
    <div class="qbody">${q && q.retry ? '<span class="retry">🔁 さっきまちがえた問題。もう一回！</span>' : ''}${inner}</div><div class="foot" id="foot" hidden></div>`;
  $('#qx').onclick = closeQuiz;
}
function audioRow(text){
  return `<div class="speak"><button class="sbtn" id="play" aria-label="もう一度聞く">🔊</button><button class="sbtn slow" id="slow" aria-label="ゆっくり聞く">🐢</button></div>`;
}
function wireAudio(text){ $('#play').onclick = () => say(text); $('#slow').onclick = () => say(text, .55); }

function showQ(){
  const q = run.qs[run.i]; run.t0 = Date.now();
  if (q.kind === 'listen' || q.kind === 'read'){
    const w = WORDS[q.key], listen = q.kind === 'listen';
    shell((listen ? `<span class="kind">🔊 聞いてえらぼう</span><p class="prompt">聞こえた英語はどれ？</p>${audioRow()}`
      : `<span class="kind">👀 読んでえらぼう</span><p class="prompt">この英語はどれ？</p><p class="target en big-en">${w.en}</p>`) + `
      <div class="choices">${q.choices.map(k => `<button class="ch" data-k="${k}"><span class="em">${WORDS[k].e}</span><span class="ja">${WORDS[k].ja}</span></button>`).join('')}</div>`);
    if (listen){ wireAudio(w.en); say(w.en); }
    document.querySelectorAll('.ch').forEach(b => b.onclick = () => {
      const ok = b.dataset.k === q.key;
      if (!listen) say(w.en);
      b.classList.add(ok ? 'good' : 'bad');
      if (!ok) document.querySelector(`.ch[data-k="${q.key}"]`).classList.add('good');
      lockChoices(); answer(ok, `${w.e} <span class="en">${w.en}</span> ＝ ${w.ja}`, w.en);
    });
  }
  else if (q.kind === 'spell'){
    const w = WORDS[q.key], letters = w.en.split('');
    const decoys = pick('abcdefghijklmnoprstuwy'.split('').filter(c => !letters.includes(c)), 2);
    const tiles = shuffle(letters.concat(decoys));
    const filled = [];
    shell(`<span class="kind">✍️ つづってみよう</span><div class="hero">${w.e}</div><p class="prompt" style="text-align:center">「${w.ja}」を英語で</p>
      ${audioRow()}<div class="slots" id="slots"></div><div class="tiles" id="tiles"></div>
      <button class="ghost" id="back">⌫ 1文字もどす</button>`);
    wireAudio(w.en);
    const paint = () => {
      $('#slots').innerHTML = letters.map((_,i) => `<span class="slot ${filled[i]!==undefined?'f':''}">${filled[i]!==undefined?tiles[filled[i]]:''}</span>`).join('');
      $('#tiles').innerHTML = tiles.map((c,i) => `<button class="tile ${filled.includes(i)?'used':''}" data-i="${i}">${c}</button>`).join('');
      document.querySelectorAll('.tile').forEach(t => t.onclick = () => {
        if (filled.length >= letters.length) return;
        filled.push(+t.dataset.i); paint();
        if (filled.length === letters.length){
          const got = filled.map(i => tiles[i]).join(''), ok = got === w.en;
          if (!ok) $('#slots').classList.add('bad');
          $('#back').hidden = true; document.querySelectorAll('.tile').forEach(x => x.disabled = true);
          answer(ok, `${w.e} <span class="en">${w.en}</span> ＝ ${w.ja}`, w.en);
        }
      });
    };
    $('#back').onclick = () => { filled.pop(); paint(); };
    paint();
  }
  else if (q.kind === 'speak'){
    const it = q.it; let tries = 0;
    shell(`<span class="kind">🎤 声に出して言おう</span><div class="hero">${it.e}</div>
      <p class="target en">${esc(it.en)}</p><p class="sub" style="text-align:center">${it.ja}</p>
      <div class="speak" style="justify-content:center"><button class="sbtn" id="play" aria-label="お手本を聞く">🔊</button><button class="sbtn slow" id="slow" aria-label="ゆっくり聞く">🐢</button></div>
      <button class="mic" id="mic" aria-label="マイクで話す">🎤</button><p class="heard" id="heard"></p>
      <div id="selfbox"></div>`);
    wireAudio(it.en); say(it.en);
    const selfCheck = msg => {
      $('#mic').hidden = micMode === 'self';
      $('#heard').textContent = msg;
      $('#selfbox').innerHTML = `<div class="choices list"><button class="ch" id="said"><span>🙆 まねして言えた！</span></button><button class="ch" id="again"><span>🔊 もう一回お手本を聞く</span></button></div>`;
      $('#said').onclick = () => answer(true, `<span class="en">${esc(it.en)}</span>`, it.en);
      $('#again').onclick = () => say(it.en, .7);
    };
    if (micMode === 'self') selfCheck('お手本を聞いて、大きな声でまねしてみよう。');
    $('#mic').onclick = async () => {
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      $('#mic').classList.add('on'); $('#heard').textContent = '聞いているよ…';
      const r = await hear(); $('#mic').classList.remove('on'); tries++;
      if (!r.ok){
        if (['not-allowed','service-not-allowed','none','audio-capture','network'].includes(r.why)){ micMode = 'self'; return selfCheck('マイクが使えないので、自分でチェックしよう。'); }
        $('#heard').textContent = '聞こえなかったよ。もう一回おしてね。';
        if (tries >= 2) selfCheck('聞こえなかったよ。言えたら下をおしてね。');
        return;
      }
      const sc = matchScore(it.en, r.alts);
      $('#heard').textContent = `聞こえた英語：「${r.alts[0]}」`;
      if (sc >= .7) return answer(true, `<span class="en">${esc(it.en)}</span>`, it.en);
      $('#heard').textContent += '　おしい！もう一回。';
      if (tries >= 3) answer(false, `<span class="en">${esc(it.en)}</span>`, it.en);
    };
  }
  else if (q.kind === 'talk'){
    const t = q.t;
    shell(`<span class="kind">💬 答えよう</span>
      <div class="scene"><div class="bubble en">${t.e} ${esc(t.q)}</div><div class="situ">場面：${t.situ}</div></div>
      ${audioRow()}
      <div class="choices list">${q.choices.map((c,i) => `<button class="ch en" data-i="${i}">${esc(c)}</button>`).join('')}</div>`);
    wireAudio(t.q); say(t.q);
    document.querySelectorAll('.ch').forEach(b => b.onclick = () => {
      const ok = q.choices[+b.dataset.i] === t.a;
      b.classList.add(ok ? 'good' : 'bad');
      if (!ok) document.querySelectorAll('.ch').forEach(x => { if (q.choices[+x.dataset.i] === t.a) x.classList.add('good'); });
      lockChoices(); answer(ok, `<span class="en">${esc(t.a)}</span>`, t.a);
    });
  }
}
function lockChoices(){ document.querySelectorAll('.ch').forEach(x => x.disabled = true); }

function answer(ok, label, speakText){
  const q = run.qs[run.i];
  run.sec += addStudy((Date.now() - run.t0) / 1000);
  const g = grade(q, ok); run.pts += g.pts; run.tickets += addPoints(g.pts);
  if (g.after > g.before) run.ups++;
  const lg = logToday(); ok ? lg.ok++ : lg.ng++;
  if (!q.retry){
    if (ok) run.right++;
    else if (run.hearts !== null) run.hearts--;
    else { const r = Object.assign({}, q, {retry:true}); if (r.choices) r.choices = shuffle(r.choices); run.qs.push(r); }  // まちがえた問題は最後にもう一回
  }
  save();
  const f = $('#foot'); f.hidden = false; f.className = 'foot ' + (ok ? 'ok' : 'ng');
  const praise = ['すごい！','せいかい！','いいね！','ばっちり！'][Math.floor(Math.random()*4)];
  f.innerHTML = `<div><div class="fmsg">${ok ? '⭕ ' + praise + (g.pts ? ` <span class="pt">+${g.pts}pt</span>` : '') : '❌ おしい！'}${g.mastered ? ' 👑 マスター！' : g.after > g.before ? ` <span class="lvup">${LV[g.before]}→${LV[g.after]}</span>` : ''}<small>${ok ? '' : '正かいは '}${label}</small></div>
    <button class="big ${ok?'alt':''}" id="go">つぎへ</button></div>`;
  if (speakText && !ok) setTimeout(() => say(speakText), 300);
  $('#go').onclick = () => {
    run.i++;
    if (run.hearts === 0) return finish(true);
    run.i < run.qs.length ? showQ() : finish(false);
  };
  $('#go').focus();
}

function finish(knocked){
  const s = run.stage, rate = run.right / run.base;
  const stars = knocked ? 0 : rate === 1 ? 3 : rate >= .8 ? 2 : rate >= .6 ? 1 : 0;
  const first = stars > 0 && !S.stars[s.id];
  if (stars > 0 && s.kind !== 'daily') S.stars[s.id] = Math.max(S.stars[s.id] || 0, stars);
  let bonus = 0;
  if (s.kind === 'daily' && S.rev.d !== today()){ S.rev = {d:today()}; bonus = PTS.review; run.pts += bonus; run.tickets += addPoints(bonus); }
  const d = today();
  if (S.streak.last !== d){
    const y = new Date(); y.setDate(y.getDate()-1);
    const yd = y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    S.streak.n = S.streak.last === yd ? S.streak.n + 1 : 1; S.streak.last = d;
  }
  save();
  const msg = s.kind === 'daily' ? (bonus ? `今日の復習ぜんぶおわり！ +${bonus}pt` : '復習おわり！') + ' つぎはマップを進もう。'
    : knocked ? 'ハートがなくなった…。門番ガニにもう一回ちょうせんしよう！'
    : stars === 0 ? 'あと少し！6わり正かいでクリアだよ。'
    : s.kind === 'boss' ? 'はじまりの村をクリア！ つぎの島は じゅんび中だよ。' : first ? 'つぎのマスへ進めるようになったよ！' : 'クリア！';
  $('#quiz').innerHTML = `<div class="qbody"><div class="result">
    <div class="stars" aria-label="星 ${stars}">${[0,1,2].map(i => i < stars ? '★' : '<span class="off">★</span>').join('')}</div>
    <h2>${s.ic} ${s.name}</h2><p>${run.right} / ${run.base} 問 正かい</p><p>${msg}</p>
    <span class="pill">⭐ +${run.pts}pt${run.tickets ? `　🎫 +${run.tickets}枚` : ''}${run.ups ? `　🆙 ${run.ups}こ` : ''}</span>
    <p class="sub">⏱️ 勉強 +${fmtTime(run.sec)}</p>
    ${studyCard()}
    <button class="big" id="toGacha">🎰 ガチャへ</button>
    ${doneToday() || s.kind === 'daily' ? '' : '<button class="big alt" id="retry">もう一回</button>'}
    <button class="ghost" id="toMap">マップにもどる</button></div></div>`;
  if ($('#retry')) $('#retry').onclick = () => startStage(s);
  $('#toMap').onclick = closeQuiz;
  $('#toGacha').onclick = () => { tab = 'gacha'; closeQuiz(); };
}

/* ---------- gacha ---------- */
function renderGacha(last){
  const free = S.shards >= SHARDS_FOR_FREE, can = free || S.tickets > 0;

  $('#view').innerHTML = `
    <div class="areahead"><h2>🎰 なかまガチャ</h2><span class="tag on">🎫 ${S.tickets}枚</span></div>
    <div class="machine"><span class="shell" aria-hidden="true">🐚</span>
      ${last ? `<div class="reveal"><span class="rar r-${last.p.r}">${last.p.r}</span><span class="em">${last.p.e}</span>
        <b class="en" style="font-size:28px">${last.p.en}</b><span>${last.p.ja}</span>
        <span class="sub">${last.dup ? 'もう持っているので、かけら +1' : '🎉 新しいなかま！'}</span>
        <button class="ghost" id="hearPal">🔊 英語で聞く</button></div>`
      : `<div class="globe" id="globe" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>`}
      <button class="big" id="pull" ${can ? '' : 'disabled'}>${free ? 'かけら 5こで むりょうで引く' : '🎫 ガチャ券1枚で引く'}</button>
      <div class="meter"><span>🎫 ガチャ券 ${S.tickets}枚</span><span>💎 かけら ${S.shards}/${SHARDS_FOR_FREE}</span></div>
      ${!can ? `<p class="note">${doneToday() ? '今日の勉強はおしまい。また明日勉強してガチャ券を集めよう！' : `ガチャ券がないよ。問題に正解してポイントをためよう（あと${POINTS_PER_TICKET - S.pts}ptで1枚）。`}</p>` : ''}
    </div>
    <h2>出るかくりつ</h2>
    <table class="odds"><tbody>${ODDS.map(([r,p]) => `<tr><td><span class="rar r-${r}">${r}</span></td><td>${PALS.filter(x=>x.r===r).map(x=>x.e).join(' ')}</td><td>${p}%</td></tr>`).join('')}</tbody></table>
    <p class="note">ガチャは勉強でもらえる「ガチャ券」だけで引けます。お金はかかりません。<br>ガチャ券は、問題に正解してためたポイント ${POINTS_PER_TICKET}pt で1枚。復習や、前にまちがえた問題に正解すると多くもらえます。勉強は1日${DAILY_MIN}分までです。<br>同じなかまが出たら「かけら」になり、${SHARDS_FOR_FREE}こ集めると1回むりょうで引けます。</p>`;
  if (last) $('#hearPal').onclick = () => say(last.p.en);
  $('#pull').onclick = () => {
    if (!can) return;
    if (free) S.shards -= SHARDS_FOR_FREE; else S.tickets--;
    let roll = Math.random()*100, rar = 'N';
    for (const [r,p] of ODDS){ if (roll < p){ rar = r; break; } roll -= p; }
    const p = pick(PALS.filter(x => x.r === rar),1)[0];
    const dup = !!S.owned[p.id];
    if (dup) S.shards++; S.owned[p.id] = (S.owned[p.id] || 0) + 1;
    if (!S.partner) S.partner = p.id;
    save();
    const g = $('#globe');
    const show = () => { renderGacha({p,dup}); say(p.en); };
    if (g && !matchMedia('(prefers-reduced-motion: reduce)').matches){ g.classList.add('spin'); $('#pull').disabled = true; setTimeout(show, 900); } else show();
  };
}

/* ---------- zukan ---------- */
function renderZukan(){
  const got = PALS.filter(p => S.owned[p.id]).length;
  const count = n => ITEMS.filter(id => mOf(id).lv >= n).length;
  $('#view').innerHTML = `
    <div class="stats"><div class="stat"><b>${count(4)}</b><span>👑 マスター</span></div>
      <div class="stat"><b>${count(1)}/${ITEMS.length}</b><span>出会った問題</span></div>
      <div class="stat"><b>${got}/${PALS.length}</b><span>なかま</span></div></div>
    <div><h2>覚えぐあい</h2><p class="sub">正解すると1つずつ上がるよ。間をあけて何回も思い出すと、👑マスターになるよ。</p></div>
    <div class="legend">${LV.map((e,i) => `<span>${e} ${LV_NAME[i]}</span>`).join('')}</div>
    <div class="mlist">${ITEMS.slice().sort((a,b) => mOf(b).lv - mOf(a).lv).map(id => { const it = itemInfo(id), m = mOf(id);
      return `<button class="mrow" data-say="${esc(it.en)}"><span class="lv">${LV[m.lv]}</span><span class="em">${it.e}</span>
        <span class="tx"><b class="en">${esc(it.en)}</b><span>${esc(it.ja)}</span></span></button>`; }).join('')}</div>
    <div><h2>なかまずかん</h2><p class="sub">タップすると英語の名前が聞けるよ。もう一度タップでマップにつれていけるよ。</p></div>
    <div class="grid">${PALS.map(p => S.owned[p.id]
      ? `<button class="cell ${S.partner===p.id?'sel':''}" data-id="${p.id}"><span class="rar r-${p.r}">${p.r}</span><span class="em">${p.e}</span><span class="nm en">${p.en}</span><span class="ja">${p.ja}${S.partner===p.id?'・いっしょ':''}</span></button>`
      : `<div class="cell unk"><span class="rar r-${p.r}">${p.r}</span><span class="em">${p.e}</span><span class="nm">？？？</span><span class="ja">まだ</span></div>`).join('')}</div>`;
  let lastTap = null;
  document.querySelectorAll('.cell[data-id]').forEach(c => c.onclick = () => {
    const p = PALS.find(x => x.id === c.dataset.id); say(p.en);
    if (lastTap === p.id && S.partner !== p.id){ S.partner = p.id; save(); toast(`${p.ja}がマップについてくるよ`); renderZukan(); }
    lastTap = p.id;
  });
  document.querySelectorAll('.mrow').forEach(c => c.onclick = () => say(c.dataset.say));
}

render();
