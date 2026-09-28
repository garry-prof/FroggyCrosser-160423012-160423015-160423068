export const COLS = 9;
export const ROWS = 13;
export const GOAL_ROW = 0;
export const START_ROW = 12;

export const ROW_TYPES = [
  'goal',
  'river', 'river', 'river', 'river', 'river',
  'safe',
  'road', 'road', 'road', 'road', 'road',
  'start',
];

export const GAME_DURATION = 60;
export const TICK_MS = 33;
export const MAX_DELTA = 0.1;

export const POINTS_PER_FROG = 100;
export const FLY_BONUS_POINTS = 50;

export const SPEED_UP_PER_CROSSING = 0.1;
export const MAX_SPEED_MULTIPLIER = 1.8;

export const FLY_LIFETIME = 5;
export const FLY_MIN_DELAY = 3;
export const FLY_MAX_DELAY = 7;

export const MESSAGE_DURATION = 1.2;
export const SWIPE_MIN_DISTANCE = 20;

export function getRowType(row) {
  return ROW_TYPES[row];
}
