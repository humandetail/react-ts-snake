import {
  Level
} from '../config/snake.config'

export type GameStatus = 'LOADING' | 'PLAYING' | 'PAUSE' | 'FINISH';

export interface IGameProps {
  status: GameStatus;
  snakeSize: number;
  canvasSize: [number, number];
  level: Level;
}
