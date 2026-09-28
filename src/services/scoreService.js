import { POINTS_PER_FROG } from '../constants/gameConfig';
import { getHighScores, saveHighScores, saveLastGame } from '../data/scoreStorage';

export function calculateScore(frogsCrossed, bonusPoints) {
  return frogsCrossed * POINTS_PER_FROG + bonusPoints;
}

export async function recordLastGame(username, score, frogs) {
  await saveLastGame({
    username: username,
    score: score,
    frogs: frogs,
    playedAt: new Date().toISOString(),
  });
}

// Satu pemain hanya punya satu entri: skor terbaiknya
export async function updateHighScore(username, score) {
  const list = await getHighScores();

  let index = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].username === username) {
      index = i;
      break;
    }
  }

  let previousBest = 0;
  let isNewRecord = false;
  let shouldSave = false;

  if (index === -1) {
    list.push({ username: username, score: score });
    isNewRecord = score > 0;
    shouldSave = true;
  } else {
    previousBest = list[index].score;
    if (score > previousBest) {
      list[index].score = score;
      isNewRecord = true;
      shouldSave = true;
    }
  }

  if (shouldSave) {
    await saveHighScores(list);
  }

  return {
    isNewRecord: isNewRecord,
    previousBest: previousBest,
    bestScore: score > previousBest ? score : previousBest,
  };
}

export async function getTopScores(limit) {
  const list = await getHighScores();
  const sorted = list.slice().sort(function (a, b) {
    return b.score - a.score;
  });
  return sorted.slice(0, limit);
}

export async function getUserBest(username) {
  const list = await getHighScores();
  for (let i = 0; i < list.length; i++) {
    if (list[i].username === username) {
      return list[i].score;
    }
  }
  return 0;
}
