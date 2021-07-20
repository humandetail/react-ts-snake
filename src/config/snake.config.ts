
export const snakeSize = 16;

export const canvasSize: [number, number] = [35, 35]

export enum Level {
  ESAY = 'ESAY',
  NORMAL = 'NORMAL',
  HARD = 'HARD'
}

export const levelText = {
  [Level.ESAY]: '简单模式',
  [Level.NORMAL]: '普通模式',
  [Level.HARD]: '困难模式'
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
  normal: '#333',
  food: '#f5222d'
}
