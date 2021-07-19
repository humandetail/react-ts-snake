/**
 * Game Canvas
 */

import { IFoodItem, ISnakeItem } from '../../types';
import {
  Direction
} from '../../config/snake.config';

class GameCanvas {
  protected el: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected width: number;
  protected height: number;

  public snapshots: ImageData[] = [];

  constructor (el: HTMLCanvasElement) {
    this.el = el;
    this.ctx = el.getContext('2d')!;
    this.width = el.width;
    this.height = el.height;
  }

  protected clear () {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public draw (snake: ISnakeItem[], food: IFoodItem, direction: Direction) {
    const len = snake.length;
    snake.forEach((item, index) => {
      if (index === 0) {
        // 头部
      } else if (index === len - 1) {
        // 尾部
      } else {
        // 身体
      }
    })
  }

  protected saveSnapshot (data: ImageData) {
    this.snapshots.unshift(data);
    if (this.snapshots.length > 50) {
      this.snapshots.length = 50;
    }
  }

  protected getSnapshot (index: number): ImageData | null {
    if (index < 0 || index > this.snapshots.length) return null;
    return this.snapshots[index];
  }

  protected restoreSnapshot (data: ImageData) {
    this.clear();
    this.ctx.putImageData(data, 0, 0);
  }
}

export default GameCanvas;
