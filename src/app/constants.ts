export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;
export const CAR_WIDTH = 3;
export const CAR_HEIGHT = 4;
export const PADDING = 2;
export const POINTS_PER_LEVEL = 10;

export const COLORS = [
  'rgba(105,105,105)',
  'rgba(192,192,192)',
];

export const SHAPES = [
  [[0, 1, 0], [1, 1, 1], [0, 1, 0], [1, 0, 1]],
  [[1, 0, 1], [0, 1, 0], [1, 1, 1], [0, 1, 0]], //машинка энеми
  [[1],[1],[1],[0]]
];

export class KEY {
  static readonly ESC = 27;
  static readonly LEFT = 37;
  static readonly RIGHT = 39;
  static readonly DOWN = 40;
  static readonly SPACE = 32;
}

export class LEVEL {
  static readonly 0 = 150;
  static readonly 1 = 120;
  static readonly 2 = 90;
  static readonly 3 = 70;
  static readonly 4 = 60;
  static readonly 5 = 50;
  static readonly 6 = 40;
  static readonly 7 = 30;
  static readonly 8 = 20;
}