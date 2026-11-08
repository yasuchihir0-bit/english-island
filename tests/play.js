// 全部のマスと「今日の復習」を自動でといて、エラーや計算ちがいがないか確かめるテスト
// 使い方: node tests/play.js   （Playwright が必要）
const { chromium, devices } = require('playwright');
const path = require('path');
let fail = 0;
const check = (ok, msg) => { console.log((ok ? 'OK  ' : 'NG  ') + msg); if (!ok) fail++; };

// 今の問題に答える（right=false ならわざとまちがえる）
async function answerOne(p, right = true) {
  const q = await p.evaluate(() => { const q = run.qs[run.i]; return {kind:q.kind, key:q.key,
    ans: q.t ? q.choices.indexOf(q.t.a) : q.h ? q.choices.findIndex(c => c.w === q.h.w && c.p === q.h.p) : null,
    words: q.kind === 'order' ? q.it.en.split(' ') : null, choices:q.choices || null}; });
  if (q.kind === 'listen' || q.kind === 'read') {
    const k = right ? q.key : q.choices.find(c => c !== q.key);
    await p.click(`.ch[data-k="${k}"]`);
  } else if (q.kind === 'talk') await p.click(`.ch[data-i="${right ? q.ans : (q.ans + 1) % 3}"]`);
  else if (q.kind === 'hear') await p.click(`.ch[data-i="${right ? q.ans : (q.ans + 1) % 4}"]`);
  else if (q.kind === 'order') {
    const ws = right ? q.words : q.words.slice().reverse();
    for (const w of ws) await p.click(`#tiles .tile:not(.used) >> text="${w}"`);
  }
  else if (q.kind === 'spell') {
    const word = right ? q.key : q.key.split('').reverse().join('');
    for (const c of word) await p.click(`#tiles .tile:not(.used) >> text="${c}"`);
    if (!right && word === q.key) return answerOne(p, true);
  } else if (q.kind === 'speak') {
    if (!right) { await p.click('#mic').catch(()=>{}); }
    await p.click('#said');
  }
  await p.click('#go', { timeout: 3000 });
  return q.kind;
}
async function playStage(p, idx, wrongFirst = 0) {
  await p.evaluate(i => { S.study.sec = 0; startStage(i === 'daily' ? DAILY_STAGE : typeof i === 'string' ? ISLANDS[1].stages[+i[1]] : STAGES[i]); }, idx);
  const kinds = new Set(); let i = 0;
  while (await p.isVisible('.qbody .kind')) { kinds.add(await answerOne(p, i++ >= wrongFirst)); }
  return { text: (await p.textContent('.result')).replace(/\s+/g, ' '), kinds: [...kinds], answered: i };
}

(async () => {
  const b = await chromium.launch(); const errs = [];
  const p = await b.newPage({ ...devices['iPhone 13'] });
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  await p.evaluate(() => { micMode = 'self'; });

  // 1. 全部のマスを全問正解
  for (let si = 0; si < 6; si++) {
    const r = await playStage(p, si);
    check(/★★★/.test(r.text) && !/off/.test(await p.innerHTML('.stars')), `${r.text.slice(0, 40)}（${r.kinds.join(',')}）`);
    await p.click('#toMap');
  }
  // 1b. 島1の門番をたおすと島2に行ける → 島2の全部のマス（島2の問題だけが出る）
  await p.evaluate(() => render());
  check(await p.isVisible('.isle[data-isl="2"]:not([aria-disabled])'), '島1クリアで「にぎわい市場」が選べる');
  await p.click('.isle[data-isl="2"]');
  check((await p.textContent('.areahead h2')).includes('にぎわい市場'), '島2に切りかわる');
  for (let si = 0; si < 6; si++) {
    const only2 = await p.evaluate(i => build(ISLANDS[1].stages[i]).every(q => itemIsl(q.id) === 2), si);
    const r = await playStage(p, 'i' + si);
    check(only2 && /★★★/.test(r.text) && !/off/.test(await p.innerHTML('.stars')), `島2 ${r.text.slice(0, 34)}（${r.kinds.join(',')}）`);
    await p.click('#toMap');
  }
  check(/島1|島2/.test('島2') && (await p.textContent('.map')).includes('タコ店長'), '島2のボスはタコ店長');
  await p.evaluate(() => { S.isl = 1; save(); render(); });
  // 2. まちがえた問題は最後にもう一回出る
  const r2 = await playStage(p, 0, 2);
  check(r2.answered === 10 && /6 \/ 8/.test(r2.text), `聞くマスで2問まちがえる → やり直しをふくめて ${r2.answered} 問、${r2.text.match(/\d+ \/ \d+/)[0]} 正かい`);
  await p.click('#toMap');
  // 3. 次の日：まちがえた問題が「今日の復習」に出る
  await p.evaluate(() => { for (const m of Object.values(S.m)) { m.due -= 1; if (m.upDay !== undefined) m.upDay -= 1; if (m.wrongDay !== undefined) m.wrongDay -= 1; } S.rev = {d:''}; save(); render(); });
  const due = await p.evaluate(() => dueItems().length);
  check(due > 0 && await p.isVisible('#rev'), `次の日の「今日の復習」：${due}問`);
  const pts0 = await p.evaluate(() => S.pts + S.tickets * POINTS_PER_TICKET);
  await p.click('#rev');
  const r3 = await playStage(p, 'daily');
  const pts1 = await p.evaluate(() => S.pts + S.tickets * POINTS_PER_TICKET);
  check(/ぜんぶおわり/.test(r3.text) && pts1 - pts0 >= Math.min(due, 12) * 2 + 5, `復習をぜんぶ終える → ${pts1 - pts0}pt（復習2pt・前にまちがえた問題3pt・ボーナス5pt）`);
  await p.click('#toMap');
  check(/今日の復習はおわり/.test(await p.textContent('.review')) && !(await p.isVisible('.review .big')), '復習が終わると「おわり」と出て、大きな「はじめる」ボタンが消える');
  // 4. 何日もくり返すと👑マスターになる
  const lv = await p.evaluate(() => { const id = 'w:apple'; for (let d = 0; d < 5; d++) { S.m[id].upDay = -1; grade({id}, true); } return S.m[id].lv; });
  check(lv === 4, `別の日に5回正解 → 段階 ${lv}（4 = 👑マスター）`);
  // 5. 同じ日に何回正解しても、段階は1つしか上がらない
  const same = await p.evaluate(() => { const id = 'w:melon'; delete S.m[id]; for (let i = 0; i < 4; i++) grade({id}, true); return S.m[id].lv; });
  check(same === 1, `同じ日に4回正解 → 段階 ${same}`);
  // 6. お手本を見たときは、正解でも段階が上がらない
  const hint = await p.evaluate(() => { const id = 'w:pizza'; delete S.m[id]; grade({id, hinted:true}, true); return mOf(id).lv; });
  check(hint === 0, `お手本を見て正解 → 段階 ${hint}（上がらない）`);
  // 7. 段階に合わせて問題の形が変わる
  const forms = await p.evaluate(() => [0,1,2,3,4].map(lv => { S.m['w:dog'] = {lv, due:0, right:0, wrong:0}; return makeQ('w:dog').kind; }).join('→')
    + ' / ' + [0,2].map(lv => { S.m['s:0'] = {lv, due:0, right:0, wrong:0}; return makeQ('s:0').kind; }).join('→'));
  check(forms === 'listen→listen→read→speak→spell / order→speak', `問題の形：単語 ${forms}`);
  // 8. 1日の上限
  await p.evaluate(() => { S.study.sec = DAILY_MIN * 60; save(); render(); });
  await p.click('.node[data-i="0"]');
  check(!(await p.isVisible('#quiz')), '60分をこえたらマスに入れない');
  // 9. 古いデータ（コイン・おぼえた単語・まちがえた問題）の引きつぎ
  await p.evaluate(() => localStorage.setItem('english-island-v1', JSON.stringify({coins:120, learned:{dog:1}, miss:[JSON.stringify({kind:'talk', i:1})]})));
  await p.reload();
  const mig = await p.evaluate(() => ({t:S.tickets, dog:S.m['w:dog'] && S.m['w:dog'].lv, talk:S.m['t:1'] && S.m['t:1'].wrong, due:dueItems().length}));
  check(mig.t === 2 && mig.dog === 1 && mig.talk === 1 && mig.due === 2, `古いデータの引きつぎ ${JSON.stringify(mig)}`);

  if (errs.length) { fail++; console.log('エラー:', errs); }
  await b.close();
  console.log(fail ? `\n${fail} 件の問題があります` : '\nすべてOK');
  process.exit(fail ? 1 : 0);
})();
