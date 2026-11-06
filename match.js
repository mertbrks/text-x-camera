// Finds where the speaker is in the script from the tail of what speech recognition heard.
const norm = w => w.toLocaleLowerCase('tr-TR').replace(/[^\p{L}\p{N}]/gu, '');

// Turkish suffixes change word endings ("rengini" / "rengi"), so a shared 4-letter stem counts as a match.
const same = (a, b) => !!a && !!b && (a === b || (a.length >= 4 && b.length >= 4 && a.slice(0, 4) === b.slice(0, 4)));

// words: normalized script words; pos: index of next unread word; heard: normalized recognized words.
// Returns new pos (index after the matched word) or -1 when nothing trustworthy matched.
function matchPos(words, pos, heard, ahead = 20) {
  heard = heard.filter(Boolean);
  if (!heard.length) return -1;
  let best = -1, bestScore = 0;
  for (let i = pos; i < Math.min(words.length, pos + ahead); i++) {
    let s = 0;
    while (s < 3 && s < heard.length && i - s >= 0 && same(words[i - s], heard[heard.length - 1 - s])) s++;
    // one matching word is only trusted right next to where we are; further ahead it needs two in a row
    const ok = s >= 2 || (s === 1 && (i - pos < 3 || heard.length === 1));
    if (ok && s > bestScore) { best = i; bestScore = s; }
  }
  return best < 0 ? -1 : best + 1;
}

if (typeof module !== 'undefined') module.exports = { norm, same, matchPos };
