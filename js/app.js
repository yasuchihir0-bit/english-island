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
  {id:'s5',kind:'review',name:'宝箱マス',ic:'🎁',x:34,y:31,desc:'まちがえた問題をもう一度。コイン2倍'},
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
/* ガチャ券：問題をといた時間 TICKET_MIN 分ごとに1枚。勉強として数えるのは1日 DAILY_MIN 分まで */
const TICKET_MIN = 5, DAILY_MIN = 60, SHARDS_FOR_FREE = 5;
const Q_MAX_SEC = 40; // 1問で数える時間の上限（放っておいても増えないように）

/* ---------- state ---------- */
const KEY = 'english-island-v1';
const today = () => { const d = new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); };
function fresh(){ return {tickets:1,stars:{},owned:{},shards:0,study:{d:'',sec:0,got:0},streak:{last:'',n:0},miss:[],learned:{},partner:null}; }
let S = fresh();
try { const raw = localStorage.getItem(KEY); if (raw){ const old = JSON.parse(raw);
  if (old.tickets === undefined && typeof old.coins === 'number') old.tickets = Math.max(1, Math.floor(old.coins / 50));
  delete old.coins; delete old.pulls; S = Object.assign(fresh(), old); } } catch(e) {}
function studyToday(){ if (S.study.d !== today()) S.study = {d:today(), sec:0, got:0}; return S.study; }
const doneToday = () => studyToday().sec >= DAILY_MIN * 60;
const fmtTime = sec => { sec = Math.floor(sec); const m = Math.floor(sec/60), s = sec % 60; return m ? `${m}分${s ? s + '秒' : ''}` : `${s}秒`; };
function addStudy(sec){
  const st = studyToday(), before = st.sec;
  st.sec = Math.min(before + Math.min(sec, Q_MAX_SEC), DAILY_MIN * 60);
  const got = Math.floor(st.sec / (TICKET_MIN * 60)), n = got - st.got;
  if (n > 0){ S.tickets += n; st.got = got; toast('🎫 ガチャ券ゲット！'); }
  return {sec: st.sec - before, tickets: Math.max(n,0)};
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
  const st = studyToday(), max = DAILY_MIN * 60, per = TICKET_MIN * 60, cells = DAILY_MIN / TICKET_MIN;
  const left = per - (st.sec % per), done = st.sec >= max;
  return `<div class="study" aria-label="今日の勉強時間">
    <div class="study-top"><b>⏱️ 今日の勉強 <span class="num">${Math.floor(st.sec/60)}</span>分</b><span class="sub">/ ${DAILY_MIN}分</span>
      <span class="study-next">${done ? '🎉 今日はここまで！' : `🎫 まで あと ${fmtTime(left)}`}</span></div>
    <div class="cells" style="grid-template-columns:repeat(${cells},1fr)">${Array.from({length:cells}, (_,i) => { const f = Math.max(0, Math.min(1, (st.sec - i*per) / per));
      return `<span class="cell-t ${f>=1?'full':''}"><i style="width:${f*100}%"></i>${f>=1?'🎫':''}</span>`; }).join('')}</div>
    <p class="sub">${done ? 'よくがんばったね！ ガチャ券でなかまを集めよう。また明日ね。' : `問題をといた時間 ${TICKET_MIN}分ごとに ガチャ券が1枚もらえるよ。`}</p>
  </div>`;
}
const unlocked = i => i === 0 || S.stars[STAGES[i-1].id] > 0;
function renderMap(){
  const nextIdx = STAGES.findIndex((s,i) => unlocked(i) && !S.stars[s.id]);
  const here = STAGES[nextIdx >= 0 ? nextIdx : STAGES.length-1];
  const pal = S.partner && PALS.find(p => p.id === S.partner);
  $('#view').innerHTML = `
    <div class="areahead"><div><h2>🏘️ はじまりの村</h2><p class="sub">5年｜あいさつ・好きなもの</p></div>
      <span class="tag on">${Object.keys(S.stars).length}/${STAGES.length} クリア</span></div>
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
}

/* ---------- question building ---------- */
function wordChoices(key){
  const grp = GROUPS.find(g => g.includes(key));
  let pool = grp.filter(k => k !== key);
  if (pool.length < 3) pool = pool.concat(Object.keys(WORDS).filter(k => k !== key && !pool.includes(k)));
  return shuffle([key, ...pick(pool,3)]);
}
const Q = {
  listen: k => ({kind:'listen', key:k, choices:wordChoices(k)}),
  spell:  k => ({kind:'spell', key:k}),
  speak:  it => ({kind:'speak', it}),
  talk:   t => ({kind:'talk', t, choices:shuffle([t.a, ...t.w])})
};
function build(stage){
  const all = Object.keys(WORDS);
  if (stage.kind === 'listen') return pick(all,8).map(Q.listen);
  if (stage.kind === 'spell')  return pick(SPELL,6).map(Q.spell);
  if (stage.kind === 'speak')  return pick(SPEAK,5).map(Q.speak);
  if (stage.kind === 'talk')   return pick(TALK,6).map(Q.talk);
  if (stage.kind === 'review'){
    const fromMiss = S.miss.slice(-8).map(m => JSON.parse(m)).map(m => m.kind === 'talk' ? Q.talk(TALK[m.i]) : m.kind === 'speak' ? Q.speak(SPEAK[m.i]) : Q[m.kind](m.key));
    const extra = pick(all, Math.max(0, 6 - fromMiss.length)).map(k => Math.random() < .5 ? Q.listen(k) : Q.spell(k));
    return shuffle(fromMiss.concat(extra)).slice(0,8);
  }
  return shuffle([...pick(all,3).map(Q.listen), ...pick(SPELL,2).map(Q.spell), ...pick(SPEAK,2).map(Q.speak), ...pick(TALK,3).map(Q.talk)]);
}
function missKey(q){
  if (q.kind === 'talk') return JSON.stringify({kind:'talk', i:TALK.indexOf(q.t)});
  if (q.kind === 'speak') return JSON.stringify({kind:'speak', i:SPEAK.indexOf(q.it)});
  return JSON.stringify({kind:q.kind, key:q.key});
}

/* ---------- quiz run ---------- */
let run = null;
function startStage(stage){
  run = {stage, qs:build(stage), i:0, right:0, hearts:stage.kind==='boss'?3:null, sec:0, tickets:0, t0:0};
  $('#quiz').hidden = false; document.body.style.overflow = 'hidden';
  showQ();
}
function closeQuiz(){ if ('speechSynthesis' in window) speechSynthesis.cancel(); $('#quiz').hidden = true; document.body.style.overflow = ''; run = null; render(); }
function shell(inner){
  const pct = Math.round(run.i / run.qs.length * 100);
  $('#quiz').innerHTML = `
    <div class="qtop"><button class="x" id="qx" aria-label="やめる">✕</button>
      <div class="prog" aria-label="すすみぐあい"><i style="width:${pct}%"></i></div>
      ${run.hearts !== null ? `<span class="hearts" aria-label="ハート ${run.hearts}">${'❤️'.repeat(run.hearts)}${'🤍'.repeat(3-run.hearts)}</span>` : `<span class="pill">${run.i+1}/${run.qs.length}</span>`}</div>
    <div class="qbody">${inner}</div><div class="foot" id="foot" hidden></div>`;
  $('#qx').onclick = closeQuiz;
}
function audioRow(text){
  return `<div class="speak"><button class="sbtn" id="play" aria-label="もう一度聞く">🔊</button><button class="sbtn slow" id="slow" aria-label="ゆっくり聞く">🐢</button></div>`;
}
function wireAudio(text){ $('#play').onclick = () => say(text); $('#slow').onclick = () => say(text, .55); }

function showQ(){
  const q = run.qs[run.i]; run.t0 = Date.now();
  if (q.kind === 'listen'){
    const w = WORDS[q.key];
    shell(`<span class="kind">🔊 聞いてえらぼう</span><p class="prompt">聞こえた英語はどれ？</p>${audioRow()}
      <div class="choices">${q.choices.map(k => `<button class="ch" data-k="${k}"><span class="em">${WORDS[k].e}</span><span class="ja">${WORDS[k].ja}</span></button>`).join('')}</div>`);
    wireAudio(w.en); say(w.en);
    document.querySelectorAll('.ch').forEach(b => b.onclick = () => {
      const ok = b.dataset.k === q.key;
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
      <div class="choices list">${t.choices.map((c,i) => `<button class="ch en" data-i="${i}">${esc(c)}</button>`).join('')}</div>`);
    wireAudio(t.q); say(t.q);
    document.querySelectorAll('.ch').forEach(b => b.onclick = () => {
      const ok = t.choices[+b.dataset.i] === t.a;
      b.classList.add(ok ? 'good' : 'bad');
      if (!ok) document.querySelectorAll('.ch').forEach(x => { if (t.choices[+x.dataset.i] === t.a) x.classList.add('good'); });
      lockChoices(); answer(ok, `<span class="en">${esc(t.a)}</span>`, t.a);
    });
  }
}
function lockChoices(){ document.querySelectorAll('.ch').forEach(x => x.disabled = true); }

function answer(ok, label, speakText){
  const q = run.qs[run.i], mk = missKey(q);
  const gain = addStudy((Date.now() - run.t0) / 1000); run.sec += gain.sec; run.tickets += gain.tickets;
  if (ok){ run.right++; if (q.key) S.learned[q.key] = 1; S.miss = S.miss.filter(m => m !== mk); }
  else { if (!S.miss.includes(mk)) S.miss.push(mk); if (run.hearts !== null) run.hearts--; }
  save();
  const f = $('#foot'); f.hidden = false; f.className = 'foot ' + (ok ? 'ok' : 'ng');
  const praise = ['すごい！','せいかい！','いいね！','ばっちり！'][Math.floor(Math.random()*4)];
  f.innerHTML = `<div><div class="fmsg">${ok ? '⭕ ' + praise : '❌ おしい！'}<small>${ok ? '' : '正かいは '}${label}</small></div>
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
  const s = run.stage, rate = run.right / run.qs.length;
  const stars = knocked ? 0 : rate === 1 ? 3 : rate >= .8 ? 2 : rate >= .6 ? 1 : 0;
  const first = stars > 0 && !S.stars[s.id];
  if (stars > 0) S.stars[s.id] = Math.max(S.stars[s.id] || 0, stars);
  const d = today();
  if (S.streak.last !== d){
    const y = new Date(); y.setDate(y.getDate()-1);
    const yd = y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    S.streak.n = S.streak.last === yd ? S.streak.n + 1 : 1; S.streak.last = d;
  }
  save();
  const msg = knocked ? 'ハートがなくなった…。門番ガニにもう一回ちょうせんしよう！'
    : stars === 0 ? 'あと少し！6わり正かいでクリアだよ。'
    : s.kind === 'boss' ? 'はじまりの村をクリア！ つぎの島は じゅんび中だよ。' : first ? 'つぎのマスへ進めるようになったよ！' : 'クリア！';
  $('#quiz').innerHTML = `<div class="qbody"><div class="result">
    <div class="stars" aria-label="星 ${stars}">${[0,1,2].map(i => i < stars ? '★' : '<span class="off">★</span>').join('')}</div>
    <h2>${s.ic} ${s.name}</h2><p>${run.right} / ${run.qs.length} 問 正かい</p><p>${msg}</p>
    <span class="pill">⏱️ 勉強 +${fmtTime(run.sec)}${run.tickets ? `　🎫 +${run.tickets}枚` : ''}</span>
    ${studyCard()}
    <button class="big" id="toGacha">🎰 ガチャへ</button>
    ${doneToday() ? '' : '<button class="big alt" id="retry">もう一回</button>'}
    <button class="ghost" id="toMap">マップにもどる</button></div></div>`;
  if ($('#retry')) $('#retry').onclick = () => startStage(s);
  $('#toMap').onclick = closeQuiz;
  $('#toGacha').onclick = () => { tab = 'gacha'; closeQuiz(); };
}

/* ---------- gacha ---------- */
function renderGacha(last){
  const free = S.shards >= SHARDS_FOR_FREE, can = free || S.tickets > 0;
  const st = studyToday(), canEarn = DAILY_MIN / TICKET_MIN - st.got;
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
      ${!can ? `<p class="note">${canEarn > 0 ? `ガチャ券がないよ。マップで勉強すると ${TICKET_MIN}分ごとに1枚もらえるよ（今日はあと${canEarn}枚）。` : '今日のガチャ券はもうもらえないよ。また明日勉強しよう！'}</p>` : ''}
    </div>
    <h2>出るかくりつ</h2>
    <table class="odds"><tbody>${ODDS.map(([r,p]) => `<tr><td><span class="rar r-${r}">${r}</span></td><td>${PALS.filter(x=>x.r===r).map(x=>x.e).join(' ')}</td><td>${p}%</td></tr>`).join('')}</tbody></table>
    <p class="note">ガチャは勉強でもらえる「ガチャ券」だけで引けます。お金はかかりません。<br>ガチャ券は、問題をといた時間 ${TICKET_MIN}分ごとに1枚。勉強として数えるのは1日${DAILY_MIN}分まで（1日に最大${DAILY_MIN / TICKET_MIN}枚）。<br>同じなかまが出たら「かけら」になり、${SHARDS_FOR_FREE}こ集めると1回むりょうで引けます。</p>`;
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
  const words = Object.keys(S.learned).length;
  const cleared = Object.keys(S.stars).length;
  $('#view').innerHTML = `
    <div class="stats"><div class="stat"><b>${words}</b><span>おぼえた単語</span></div>
      <div class="stat"><b>${got}/${PALS.length}</b><span>なかま</span></div>
      <div class="stat"><b>${cleared}</b><span>クリアしたマス</span></div></div>
    <div><h2>なかまずかん</h2><p class="sub">タップすると英語の名前が聞けるよ。もう一度タップでマップにつれていけるよ。</p></div>
    <div class="grid">${PALS.map(p => S.owned[p.id]
      ? `<button class="cell ${S.partner===p.id?'sel':''}" data-id="${p.id}"><span class="rar r-${p.r}">${p.r}</span><span class="em">${p.e}</span><span class="nm en">${p.en}</span><span class="ja">${p.ja}${S.partner===p.id?'・いっしょ':''}</span></button>`
      : `<div class="cell unk"><span class="rar r-${p.r}">${p.r}</span><span class="em">${p.e}</span><span class="nm">？？？</span><span class="ja">まだ</span></div>`).join('')}</div>
    <div><h2>おぼえた単語</h2><p class="sub">${words ? '' : '問題に正かいすると、ここにならんでいくよ。'}</p></div>
    <div class="grid">${Object.keys(S.learned).map(k => WORDS[k] ? `<button class="cell" data-w="${k}"><span class="em">${WORDS[k].e}</span><span class="nm en">${WORDS[k].en}</span><span class="ja">${WORDS[k].ja}</span></button>` : '').join('')}</div>`;
  let lastTap = null;
  document.querySelectorAll('.cell[data-id]').forEach(c => c.onclick = () => {
    const p = PALS.find(x => x.id === c.dataset.id); say(p.en);
    if (lastTap === p.id && S.partner !== p.id){ S.partner = p.id; save(); toast(`${p.ja}がマップについてくるよ`); renderZukan(); }
    lastTap = p.id;
  });
  document.querySelectorAll('.cell[data-w]').forEach(c => c.onclick = () => say(WORDS[c.dataset.w].en));
}

render();
