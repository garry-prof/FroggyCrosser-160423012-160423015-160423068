const VEHICLE_SPEEDS = {
  slow: 1.2,
  medium: 2.2,
  fast: 4,
};

const VEHICLE_TYPES = {
  truck: { label: 'Truk', emoji: '🚚', speed: VEHICLE_SPEEDS.slow, length: 2, color: '#FB8C00' },
  car: { label: 'Mobil', emoji: '🚗', speed: VEHICLE_SPEEDS.medium, length: 1, color: '#EF5350' },
  racecar: { label: 'Mobil Balap', emoji: '🏎️', speed: VEHICLE_SPEEDS.fast, length: 1, color: '#AB47BC' },
};

export default VEHICLE_TYPES;
