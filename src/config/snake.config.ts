
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
  [Level.ESAY]: 500,
  [Level.NORMAL]: 300,
  [Level.HARD]: 100
}

export const itemColor = {
  // outline: '#d9d9d9',
  normal: '#ccc',
  food: '#f5222d'
}
