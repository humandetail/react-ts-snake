/**
 * Snake
 */

import { Direction, Level, snakeSize, speed } from '../../config/snake.config';
import { ISnakeOptions, ISnakeItem, IFoodItem } from '../../types';
import GameCanvas from '../GameCanvas/GameCanvas';
import { getRandom } from '../utils/tools';

class Snake{
  private static instance: Snake | null = null;

  protected el: HTMLCanvasElement;

  protected snake: ISnakeItem[] = [];
  protected food: IFoodItem | null = null;

  protected snakeSize: number;
  protected canvasSize: [number, number];
  protected level: Level;

  protected gameCanvas: GameCanvas;
  protected direction: Direction = Direction.RIGHT;
  protected speed: number;

  protected timer: NodeJS.Timeout | null = null; // 动画id

  private constructor ({
    el,
    snakeSize,
    canvasSize,
    level
  }: ISnakeOptions) {
    this.el = el;
    this.snakeSize = snakeSize;
    this.canvasSize = canvasSize;
    this.level = level;
    this.speed = speed[this.level];
    this.gameCanvas = new GameCanvas(el);

    this.init();
  }

  static getSnake (opts: ISnakeOptions) {
    if (Snake.instance === null) {
      Snake.instance = new Snake(opts);
    }
    
    return Snake.instance;
  }

  protected init () {
    this.initSnake();
    this.genFood();
  }

  protected initSnake () {
    const { canvasSize: [width, height] } = this;
    const x = Math.floor(width / 2);
    const y = Math.floor(height / 2);

    this.snake = [
      {
        x: x - 1,
        y: y - 1
      },
      {
        x,
        y
      },
      {
        x: x + 1,
        y: y + 1
      },
    ];
  }

  protected genFood (): IFoodItem {
    const [maxX, maxY] = this.canvasSize;
    const snake = this.snake;
    const x = getRandom(0, maxX);
    const y = getRandom(0, maxY);

    let item: ISnakeItem;

    for (let i = 0, len = snake.length; i < len; i++) {
      item = snake[i];
      if (x === item.x && y === item.y) {
        return this.genFood();
      }
    }

    return { x, y };
  }

  protected getNextSnake (): ISnakeItem[] | null {
    const dir = this.direction;
    const snake = this.snake;
    const food = this.food!;

    if (this.isEncounterBoudary(snake)) {
      this.finish();
      this.publish('UPDATE_STATUS', 'GAME_OVER');
      return null;
    }

    if (this.isEncounterFood(snake[0], food, dir)) {
      // 重新生成 food
      this.food = this.genFood();
      return [
        food,
        ...snake
      ];
    }

    const { x, y } = snake[0];
    let head: ISnakeItem;

    switch (dir) {
      case Direction.UP:
        head = { x, y: y - 1 };
        break;
      case Direction.RIGHT:
        head = { x: x + 1, y };
        break;
      case Direction.DOWN:
        head = { x, y: y + 1 };
        break;
      case Direction.LEFT:
        head = { x: x - 1, y };
        break;
      default:
        break;
    }

    return [
      head!,
      ...snake.slice(0, -1)
    ]
  }

  protected isEncounterBoudary (snake: ISnakeItem[]): boolean {
    const [{ x, y }, ...body] = snake;
    const [maxX, maxY] = this.canvasSize;

    if (
      x === 0 || x === maxX ||
      y === 0 || y === maxY
    ) {
      return false;
    }
    
    // 触碰自身其它位置
    return body.some((item) => item.x === x && item.y === y);
  }

  protected isEncounterFood (head: ISnakeItem, food: IFoodItem, dir: Direction): boolean {
    return head.x === food.x && head.y === food.y;
  }

  handleKeydown = (e: KeyboardEvent) => {
    const { key } = e;

    switch (key) {
      case 'ArrowUp':
        this.direction = Direction.UP;
        break;
      case 'ArrowRight':
        this.direction = Direction.RIGHT;
        break;
      case 'ArrowDown':
        this.direction = Direction.DOWN;
        break;
      case 'ArrowLeft':
        this.direction = Direction.LEFT;
        break;
      case ' ':
        this.publish('UPDATE_STATUS', 'PAUSE');
        break;
      default:
        break;
    }
  }

  protected run () {
    const snake = this.getNextSnake();
    if (!snake) {
      return false;
    }

    this.snake = snake;
    console.log(`run ${JSON.stringify(this.snake)}`, this.food);
  }

  start () {
    if (this.food === null) {
      this.food = this.genFood();
    }

    this.addKeyboardListener();

    this.timer = setInterval(() => {
      this.run();
    }, this.speed);
  }

  pause () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.removeKeyboardListener();
    }
  }

  finish () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.removeKeyboardListener();
    }
  }

  publish (action: string, status: string) {
    console.log(action, status);
  }

  addKeyboardListener () {
    window.addEventListener('keydown', this.handleKeydown, false);
  }

  removeKeyboardListener () {
    window.removeEventListener('keydown', this.handleKeydown, false);
  }
}

export default Snake;
