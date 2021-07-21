import {
  Level
} from '../config/snake.config'

export type GameStatus = 'LOADING' | 'LOADED' | 'START' | 'PLAYING' | 'PAUSE' | 'FINISH';

export interface IGameProps {
  status: GameStatus;
  snakeSize: number;
  canvasSize: [number, number];
  level: Level;
  setStatus: (status: GameStatus) => void
}

export interface IHeaderProps {
  hasBack?: boolean;
  goBack?: () => void;
  title: string;
  level: Level;
}
