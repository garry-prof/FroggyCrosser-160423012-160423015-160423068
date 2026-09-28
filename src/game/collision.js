export function isOverlap(aStart, aWidth, bStart, bWidth) {
  return aStart < bStart + bWidth && aStart + aWidth > bStart;
}

// Hitbox katak dikecilkan sedikit supaya tabrakan terasa adil
export function isFrogHit(frog, obstacles, tileSize) {
  const margin = tileSize * 0.2;
  const frogStart = frog.x + margin;
  const frogWidth = tileSize - margin * 2;

  for (let i = 0; i < obstacles.length; i++) {
    const item = obstacles[i];
    if (item.type === 'vehicle' && item.row === frog.row) {
      if (isOverlap(frogStart, frogWidth, item.x, item.width)) {
        return true;
      }
    }
  }
  return false;
}

// Katak dianggap berpijak kalau titik tengahnya berada di atas kayu
export function findLogUnderFrog(frog, obstacles, tileSize) {
  const center = frog.x + tileSize / 2;

  for (let i = 0; i < obstacles.length; i++) {
    const item = obstacles[i];
    if (item.type === 'log' && item.row === frog.row) {
      if (center >= item.x && center <= item.x + item.width) {
        return item;
      }
    }
  }
  return null;
}
