// Run: node match.test.js
const assert = require('assert');
const { norm, matchPos } = require('./match.js');
const W = s => s.split(/\s+/).map(norm);

const script = W('Merhaba ben Mert. Bugün ARSH ile rengini önceden bil diyoruz. Kutudaki değil senin saçındaki sonuç önemli.');

assert.strictEqual(norm('Saçındaki,'), 'saçındaki');
assert.strictEqual(norm('İSTANBUL'), 'istanbul');
// start of script
assert.strictEqual(matchPos(script, 0, W('merhaba')), 1);
// two words in a row deeper in the text
assert.strictEqual(matchPos(script, 3, W('arsh ile rengini')), 7);
// suffix differs ("rengi" vs "rengini") still matches by stem
assert.strictEqual(matchPos(script, 5, W('ile rengi')), 7);
// lone common word far ahead is not trusted
assert.strictEqual(matchPos(script, 0, W('bir şey sonuç')), -1);
// never moves backwards
assert.strictEqual(matchPos(script, 10, W('merhaba ben')), -1);
// garbage
assert.strictEqual(matchPos(script, 0, W('...')), -1);
console.log('match.js ok');
