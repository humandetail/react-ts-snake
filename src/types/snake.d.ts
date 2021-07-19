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

export interface ICoordinate {
  x: number;
  y: number;
}

export type ISnakeItem = ICoordinate;

export type IFoodItem = ICoordinate;
