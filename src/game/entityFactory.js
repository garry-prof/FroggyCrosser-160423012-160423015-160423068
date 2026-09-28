import LANES from '../constants/lanes';
import VEHICLE_TYPES from '../constants/vehicles';

// Posisi & ukuran disimpan dalam pixel, dihitung dari tileSize
export function createObstacles(tileSize, boardWidth) {
  const result = [];
  let counter = 0;

  for (let i = 0; i < LANES.length; i++) {
    const lane = LANES[i];
    const gap = boardWidth / lane.count;

    let length = lane.length;
    let speed = lane.speed;
    let kind = 'log';

    if (lane.type === 'vehicle') {
      const vehicle = VEHICLE_TYPES[lane.vehicle];
      length = vehicle.length;
      speed = vehicle.speed;
      kind = lane.vehicle;
    }

    for (let j = 0; j < lane.count; j++) {
      counter = counter + 1;
      result.push({
        id: 'obj-' + counter,
        type: lane.type,
        kind: kind,
        row: lane.row,
        x: j * gap + lane.offset * tileSize,
        width: length * tileSize,
        speed: speed * tileSize,
        direction: lane.direction,
      });
    }
  }
  return result;
}

// Geser objek; kalau keluar layar, muncul lagi dari sisi seberang
export function moveObstacle(item, dt, multiplier, boardWidth) {
  const cycle = boardWidth + item.width;
  let x = item.x + item.speed * item.direction * multiplier * dt;

  if (item.direction === 1 && x > boardWidth) {
    x = x - cycle;
  }
  if (item.direction === -1 && x < -item.width) {
    x = x + cycle;
  }
  return { ...item, x: x };
}
