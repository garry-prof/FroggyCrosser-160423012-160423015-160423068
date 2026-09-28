const LANES = [
  //Sungai
  { row: 1, type: 'log', length: 3, speed: 1.3, direction: 1, count: 2, offset: 0 },
  { row: 2, type: 'log', length: 4, speed: 0.9, direction: -1, count: 2, offset: 1 },
  { row: 3, type: 'log', length: 2, speed: 1.8, direction: 1, count: 3, offset: 0.5 },
  { row: 4, type: 'log', length: 3, speed: 1.1, direction: -1, count: 2, offset: 2 },
  { row: 5, type: 'log', length: 3, speed: 1.5, direction: 1, count: 2, offset: 1 },
  //Jalanraya
  { row: 7, type: 'vehicle', vehicle: 'truck', direction: -1, count: 2, offset: 0 },
  { row: 8, type: 'vehicle', vehicle: 'car', direction: 1, count: 2, offset: 1 },
  { row: 9, type: 'vehicle', vehicle: 'racecar', direction: -1, count: 1, offset: 3 },
  { row: 10, type: 'vehicle', vehicle: 'car', direction: -1, count: 2, offset: 0 },
  { row: 11, type: 'vehicle', vehicle: 'truck', direction: 1, count: 2, offset: 2 },
];

export default LANES;
