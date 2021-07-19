/**
 * Snake definition
 */

import { level } from "../config/snake.config";

export interface ISnakeOptions {
  el: HTMLCanvasElement,
  snakeSize: number;
  canvasSize: [number, number],
  level: level
}

export interface ISnakeItem {
  x: number;
  y: number;
}

export interface IFoodItem {
  x: number;
  y: number;
}
