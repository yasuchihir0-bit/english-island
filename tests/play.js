// 全部のマスを自動で最後までといて、エラーが出ないか確かめるテスト
// 使い方: node tests/play.js   （Playwright が必要）
const { chromium, devices } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch(); const errs = [];
  const p = await b.newPage({ ...devices['iPhone 13'] });
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  // まちがえた問題を「宝箱マス」用に入れておく
  await p.evaluate(() => { micMode = 'self'; S.miss = [JSON.stringify({kind:'talk', i:0}), JSON.stringify({kind:'speak', i:0}), JSON.stringify({kind:'spell', key:'dog'}), JSON.stringify({kind:'listen', key:'cat'})]; save(); });
  let fail = 0;
  for (let si = 0; si < 6; si++) {
    await p.evaluate(i => { S.study.sec = 0; S.study.got = 0; startStage(STAGES[i]); }, si);
    const n = await p.evaluate(() => run.qs.length);
    for (let i = 0; i < n; i++) {
      const q = await p.evaluate(() => { const q = run.qs[run.i]; return {kind:q.kind, key:q.key, ans:q.t ? q.choices.indexOf(q.t.a) : null}; });
      if (q.kind === 'listen') await p.click(`.ch[data-k="${q.key}"]`);
      else if (q.kind === 'talk') await p.click(`.ch[data-i="${q.ans}"]`);
      else if (q.kind === 'spell') { for (const c of q.key) await p.click(`.tile:not(.used) >> text="${c}"`); }
      else if (q.kind === 'speak') await p.click('#said');
      await p.click('#go', { timeout: 3000 });
    }
    const res = (await p.textContent('.result h2')) + ' ' + (await p.textContent('.result p'));
    const ok = /6 \/ 6|8 \/ 8|5 \/ 5|10 \/ 10/.test(res) || /(\d+) \/ \1/.test(res);
    if (!ok) fail++;
    console.log((ok ? 'OK  ' : 'NG  ') + res);
    await p.click('#toMap');
  }
  if (errs.length) { fail++; console.log('エラー:', errs); }
  await b.close();
  console.log(fail ? `\n${fail} 件の問題があります` : '\nすべてのマスを最後までとけました');
  process.exit(fail ? 1 : 0);
})();
