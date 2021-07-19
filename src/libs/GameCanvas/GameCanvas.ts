/**
 * Game Canvas
 */

import { IFoodItem, ISnakeItem, ICoordinate } from '../../types';
import {
  Direction,
  itemColor
} from '../../config/snake.config';

class GameCanvas {
  protected el: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected width: number;
  protected height: number;

  protected itemSize: number;

  public snapshots: ImageData[] = [];

  constructor (el: HTMLCanvasElement, itemSize: number) {
    this.el = el;
    this.ctx = el.getContext('2d')!;
    this.width = el.width;
    this.height = el.height;
    this.itemSize = itemSize;
  }

  protected clear () {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public draw (snake: ISnakeItem[], food: IFoodItem, direction: Direction) {
    // 先清除画布
    this.clear();
    const len = snake.length;
    snake.forEach((item, index) => {
      if (index === 0) {
        // 头部
        this.drawItemHead(item, direction);
      } else if (index === len - 1) {
        // 尾部
        this.drawItemTail(item, snake[index - 1]);
      } else {
        // 身体
        this.drawItem(item);
      }
    });

    this.drawFood(food);

    // 每次画完保存 snapshot
    this.saveSnapshot(this.ctx.getImageData(0, 0, this.width, this.height));
  }

  drawItemHead (item: ISnakeItem, dir: Direction) {
    const { ctx, itemSize: size } = this;
    const color = itemColor.normal;

    ctx.save();
    ctx.translate(item.x * size, item.y * size);

    // for (let i = 0; i <= 3; i++) {
    //   if (i === 2) continue;
    //   ctx.fillStyle = i % 2 === 0 || i === 3 ? '#fff' : color;

    //   ctx.fillRect(i, i, size - i * 2, size - i * 2);
    // }

    for (let i = 0; i <= 2; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#fff' : color;
      ctx.fillRect(i, i, size - i * 2, size - i * 2);
    }

    let coorA: ICoordinate;
    let coorB: ICoordinate;
    switch (dir) {
      case Direction.UP:
        coorA = {
          x: 5,
          y: 5
        };
        coorB = {
          x: size - 5,
          y: 5
        };
        break;
      case Direction.DOWN:
        coorA = {
          x: 5,
          y: size - 5
        };
        coorB = {
          x: size - 5,
          y: size - 5
        };
        break;
      case Direction.LEFT:
        coorA = {
          x: 5,
          y: 5
        };
        coorB = {
          x: 5,
          y: size - 5
        };
        break;
      case Direction.RIGHT:
        coorA = {
          x: size - 5,
          y: 5
        };
        coorB = {
          x: size - 5,
          y: size - 5
        };
        break;
      default:
        throw new Error('Invalid direction');
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(coorA.x, coorA.y, 2, 0, 2 * Math.PI);
    ctx.arc(coorB.x, coorB.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }

  drawItem (item: ISnakeItem, color: string = itemColor.normal) {
    const ctx = this.ctx;
    const size = this.itemSize;

    ctx.save();
    ctx.translate(item.x * size, item.y * size);

    for (let i = 0; i <= 3; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#fff' : color;
      ctx.fillRect(i, i, size - i * 2, size - i * 2);
    }

    ctx.restore();
  }

  drawItemTail (item: ISnakeItem, prev: ISnakeItem) {
    const { ctx, itemSize: size } = this;
    const color = itemColor.normal;

    ctx.save();
    ctx.translate(item.x * size, item.y * size);

    for (let i = 0; i <= 2; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#fff' : color;
      ctx.fillRect(i, i, size - i * 2, size - i * 2);
    }

    const dir = this.getTailDirection(item, prev);

    let angleA: ICoordinate;
    let angleB: ICoordinate;
    let angleC: ICoordinate;
    
    switch (dir) {
      case Direction.UP:
        angleA = {
          x: size / 2,
          y: 3
        };
        angleB = {
          x: 3,
          y: size - 3
        };
        angleC = {
          x: size - 3,
          y: size - 3
        }
        break;
      case Direction.DOWN:
        angleA = {
          x: size / 2,
          y: size - 3
        };
        angleB = {
          x: 3,
          y: 3
        };
        angleC = {
          x: size - 3,
          y: 3
        }
        break;
      case Direction.LEFT:
        angleA = {
          x: 3,
          y: size / 2
        };
        angleB = {
          x: size - 3,
          y: 3
        };
        angleC = {
          x: size - 3,
          y: size - 3
        }
        break;
      case Direction.RIGHT:
        angleA = {
          x: size - 3,
          y: size / 2
        };
        angleB = {
          x: 3,
          y: 3
        };
        angleC = {
          x: 3,
          y: size - 3
        }
        break;
      default:
        throw new Error('Invalid tail');
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(angleA.x, angleA.y);
    ctx.lineTo(angleB.x, angleB.y);
    ctx.lineTo(angleC.x, angleC.y);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  drawFood (food: IFoodItem) {
    this.drawItem(food, itemColor.food);
  }

  // 获取尾巴的朝向
  protected getTailDirection (item: ISnakeItem, prev: ISnakeItem) {
    if (item.x === prev.x) {
      return item.y + 1 === prev.y
        ? Direction.UP
        : Direction.DOWN;
    }

    if (item.y === item.y) {
      return item.x + 1 === prev.x
        ? Direction.LEFT
        : Direction.RIGHT;
    }

    throw new Error('Invalid tail.');
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
