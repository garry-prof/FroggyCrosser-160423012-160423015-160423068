import {
  COLS,
  GOAL_ROW,
  START_ROW,
  GAME_DURATION,
  MAX_DELTA,
  POINTS_PER_FROG,
  SPEED_UP_PER_CROSSING,
  MAX_SPEED_MULTIPLIER,
  MESSAGE_DURATION,
  getRowType,
} from '../constants/gameConfig';
import { createObstacles, moveObstacle } from './entityFactory';
import { isFrogHit, findLogUnderFrog } from './collision';
import { updateFly, randomFlyDelay } from './flyManager';

function createStartFrog(tileSize) {
  return { x: Math.floor(COLS / 2) * tileSize, row: START_ROW };
}

export function createInitialState(tileSize, boardWidth) {
  return {
    tileSize: tileSize,
    boardWidth: boardWidth,
    frog: createStartFrog(tileSize),
    obstacles: createObstacles(tileSize, boardWidth),
    fly: null,
    flyTimer: randomFlyDelay(),
    timeLeft: GAME_DURATION,
    frogsCrossed: 0,
    bonusPoints: 0,
    fliesCaught: 0,
    deaths: 0,
    speedMultiplier: 1,
    hopCount: 0,
    message: '',
    messageTimer: 0,
    isOver: false,
  };
}

function resetFrog(state, text) {
  return {
    ...state,
    frog: createStartFrog(state.tileSize),
    deaths: state.deaths + 1,
    hopCount: state.hopCount + 1,
    message: text,
    messageTimer: MESSAGE_DURATION,
  };
}

function handleCrossing(state) {
  let multiplier = state.speedMultiplier + SPEED_UP_PER_CROSSING;
  if (multiplier > MAX_SPEED_MULTIPLIER) {
    multiplier = MAX_SPEED_MULTIPLIER;
  }
  return {
    ...state,
    frogsCrossed: state.frogsCrossed + 1,
    speedMultiplier: multiplier,
    frog: createStartFrog(state.tileSize),
    message: 'Berhasil menyeberang! +' + POINTS_PER_FROG,
    messageTimer: MESSAGE_DURATION,
  };
}

// Dipanggil setiap kali pemain swipe
export function moveFrog(state, direction) {
  if (state.isOver) {
    return state;
  }

  const tile = state.tileSize;
  let x = state.frog.x;
  let row = state.frog.row;

  if (direction === 'up') row = row - 1;
  if (direction === 'down') row = row + 1;
  if (direction === 'left') x = x - tile;
  if (direction === 'right') x = x + tile;

  if (row < GOAL_ROW) row = GOAL_ROW;
  if (row > START_ROW) row = START_ROW;

  // Di darat/jalan, rapikan posisi ke kolom grid terdekat
  if (getRowType(row) !== 'river') {
    x = Math.round(x / tile) * tile;
  }

  const maxX = state.boardWidth - tile;
  if (x < 0) x = 0;
  if (x > maxX) x = maxX;

  const moved = { ...state, frog: { x: x, row: row }, hopCount: state.hopCount + 1 };

  if (row === GOAL_ROW) {
    return handleCrossing(moved);
  }
  return moved;
}

function applyFrogRules(state, dt) {
  const frog = state.frog;
  const rowType = getRowType(frog.row);

  if (rowType === 'road') {
    if (isFrogHit(frog, state.obstacles, state.tileSize)) {
      return resetFrog(state, 'Tertabrak kendaraan!');
    }
  }

  if (rowType === 'river') {
    const log = findLogUnderFrog(frog, state.obstacles, state.tileSize);
    if (log === null) {
      return resetFrog(state, 'Katak tenggelam!');
    }

    // Katak ikut terbawa kayu
    const newX = frog.x + log.speed * log.direction * state.speedMultiplier * dt;
    const tooLeft = newX < -state.tileSize / 2;
    const tooRight = newX > state.boardWidth - state.tileSize / 2;
    if (tooLeft || tooRight) {
      return resetFrog(state, 'Terbawa arus!');
    }
    return { ...state, frog: { x: newX, row: frog.row } };
  }

  return state;
}

// Dipanggil setiap frame oleh game loop
export function updateGame(state, dtRaw) {
  if (state.isOver) {
    return state;
  }

  const dt = dtRaw > MAX_DELTA ? MAX_DELTA : dtRaw;
  const timeLeft = state.timeLeft - dt;

  if (timeLeft <= 0) {
    return { ...state, timeLeft: 0, isOver: true };
  }

  const obstacles = state.obstacles.map(function (item) {
    return moveObstacle(item, dt, state.speedMultiplier, state.boardWidth);
  });

  let messageTimer = state.messageTimer - dt;
  if (messageTimer < 0) messageTimer = 0;

  let next = {
    ...state,
    timeLeft: timeLeft,
    obstacles: obstacles,
    messageTimer: messageTimer,
    message: messageTimer === 0 ? '' : state.message,
  };

  next = applyFrogRules(next, dt);
  next = updateFly(next, dt);
  return next;
}
