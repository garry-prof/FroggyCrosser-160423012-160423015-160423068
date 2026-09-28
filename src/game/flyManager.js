import {
  FLY_LIFETIME,
  FLY_MIN_DELAY,
  FLY_MAX_DELAY,
  FLY_BONUS_POINTS,
  MESSAGE_DURATION,
} from '../constants/gameConfig';

export function randomFlyDelay() {
  return FLY_MIN_DELAY + Math.random() * (FLY_MAX_DELAY - FLY_MIN_DELAY);
}

function spawnFly(state) {
  const logs = state.obstacles.filter(function (item) {
    return item.type === 'log';
  });
  const log = logs[Math.floor(Math.random() * logs.length)];
  const slots = Math.floor(log.width / state.tileSize);
  const slot = Math.floor(Math.random() * slots);

  return {
    id: 'fly-' + Date.now(),
    logId: log.id,
    offset: slot * state.tileSize,
    timeLeft: FLY_LIFETIME,
  };
}

export function getFlyPosition(fly, obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].id === fly.logId) {
      return { x: obstacles[i].x + fly.offset, row: obstacles[i].row };
    }
  }
  return null;
}

export function updateFly(state, dt) {
  if (state.fly === null) {
    const flyTimer = state.flyTimer - dt;
    if (flyTimer <= 0) {
      return { ...state, fly: spawnFly(state), flyTimer: randomFlyDelay() };
    }
    return { ...state, flyTimer: flyTimer };
  }

  const remaining = state.fly.timeLeft - dt;
  if (remaining <= 0) {
    return { ...state, fly: null };
  }

  const fly = { ...state.fly, timeLeft: remaining };
  const position = getFlyPosition(fly, state.obstacles);

  if (position !== null && position.row === state.frog.row) {
    if (Math.abs(position.x - state.frog.x) < state.tileSize * 0.6) {
      return {
        ...state,
        fly: null,
        bonusPoints: state.bonusPoints + FLY_BONUS_POINTS,
        fliesCaught: state.fliesCaught + 1,
        message: 'Lalat tertangkap! +' + FLY_BONUS_POINTS,
        messageTimer: MESSAGE_DURATION,
      };
    }
  }

  return { ...state, fly: fly };
}
