import TITLES from '../constants/titles';

export function getTitle(frogsCrossed) {
  for (let i = 0; i < TITLES.length; i++) {
    if (frogsCrossed >= TITLES[i].minFrogs) {
      return TITLES[i];
    }
  }
  return TITLES[TITLES.length - 1];
}
