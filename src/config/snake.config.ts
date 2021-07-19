
export const snakeSize = 16;

export const canvasSize: [number, number] = [35, 35]

export enum Level {
  ESAY = 'ESAY',
  NORMAL = 'NORMAL',
  HARD = 'HARD'
}

export enum Direction {
  UP = 1,
  RIGHT = 2,
  DOWN = 3,
  LEFT = 4
}

export const speed = {
  [Level.ESAY]: 1000,
  [Level.NORMAL]: 500,
  [Level.HARD]: 300
}
