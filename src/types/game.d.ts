import {
  Level
} from '../config/snake.config'

export type GameStatus = 'LOADING' | 'LOADED' | 'PLAYING' | 'PAUSE' | 'FINISH';

export interface IGameProps {
  status: GameStatus;
  snakeSize: number;
  canvasSize: [number, number];
  level: Level;
  setStatus: (status: GameStatus) => void
}
