/**
 * Snake
 */

import { Direction, Level, speed } from '../../config/snake.config';
import { ISnakeItem, IFoodItem, ISnakeInitOptions } from '../../types';
import EventEmitter, { EventCallback } from '../EventEmitter';
import GameCanvas from '../GameCanvas/GameCanvas';
import { getRandom } from '../utils/tools';

class Snake {
  private static instance: Snake | null = null;

  protected el!: HTMLCanvasElement;

  protected snake: ISnakeItem[] = [];
  protected food: IFoodItem | null = null;

  protected snakeSize!: number;
  protected canvasSize!: [number, number];
  protected level!: Level;

  protected gameCanvas!: GameCanvas;
  protected direction: Direction = Direction.RIGHT;
  // 使用缓存方向来防止用户连按触发调头的 bug
  protected cachedDirctions: Direction[] = [Direction.RIGHT];
  protected speed!: number;

  protected _eventEmitter: EventEmitter;

  protected timer: NodeJS.Timeout | null = null; // 动画id

  private constructor () {
    this._eventEmitter = new EventEmitter();
  }

  static getSnake () {
    if (Snake.instance === null) {
      Snake.instance = new Snake();
    }
    
    return Snake.instance;
  }

  public init ({
    el,
    snakeSize,
    canvasSize,
    level
  }: ISnakeInitOptions): Promise<void> {
    this.el = el;
    this.snakeSize = snakeSize;
    this.canvasSize = canvasSize;
    this.level = level;
    this.speed = speed[this.level];
    this.gameCanvas = new GameCanvas(el, this.snakeSize);
    this.direction = Direction.RIGHT;
    this.cachedDirctions = [];

    this.initSnake();
    this.food = this.genFood();

    return Promise.resolve();
  }

  protected initSnake () {
    const { canvasSize: [width, height] } = this;
    const x = Math.floor(width / 2);
    const y = Math.floor(height / 2);

    this.snake = [
      {
        x: x + 1,
        y
      },
      {
        x,
        y
      },
      {
        x: x - 1,
        y
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

  // 获取合法的方向值
  getDirection (): Direction {
    const current = this.direction;
    const cachedDirctions = this.cachedDirctions;

    const illegalMap = {
      [Direction.UP]: Direction.DOWN,
      [Direction.DOWN]: Direction.UP,
      [Direction.LEFT]: Direction.RIGHT,
      [Direction.RIGHT]: Direction.LEFT
    }

    let last = cachedDirctions.pop() || current;
    if (illegalMap[current] === last) {
      console.log('1', Direction[current]);
      last = current;
    }

    this.direction = last;
    this.cachedDirctions = [last];
    return last;
  }

  protected getNextSnake (): ISnakeItem[] | null {
    const dir = this.direction;
    const snake = this.snake;
    const food = this.food!;

    const { x, y } = snake[0];
    let head: ISnakeItem;

    if (this.isEncounterBoudary(snake, dir)) {
      this.finish();
      this.publish('UPDATE_STATUS', 'FINISH');
      return null;
    }

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
        throw new Error('Invalid direction');
    }

    if (this.isEncounterFood(head, food)) {
      // 重新生成 food
      this.food = this.genFood();
      return [
        {
          x: food.x,
          y: food.y
        },
        ...snake
      ];
    }

    const newSnake = [
      head,
      ...snake.slice(0, -1)
    ];

    return newSnake;
  }

  protected isEncounterBoudary (snake: ISnakeItem[], dir: Direction): boolean {
    let [{ x, y }, ...body] = snake;
    const [maxX, maxY] = this.canvasSize;

    switch (dir) {
      case Direction.UP:
        y -= 1;
        break;
      case Direction.DOWN:
        y += 1;
        break;
      case Direction.LEFT:
        x -= 1;
        break;
      case Direction.RIGHT:
        x += 1;
        break;
      default:
        throw new Error('Invalid direction');
    }

    if (
      x < 0 || x >= maxX ||
      y < 0 || y >= maxY
    ) {
      return true;
    }
    
    // 触碰自身其它位置
    return body.some((item) => item.x === x && item.y === y);
  }

  protected isEncounterFood (head: ISnakeItem, food: IFoodItem): boolean {
    return head.x === food.x && head.y === food.y;
  }

  handleKeydown = (e: KeyboardEvent) => {
    const { key } = e;

    switch (key) {
      case 'ArrowUp':
        this.cachedDirctions.push(Direction.UP);
        break;
      case 'ArrowRight':
        this.cachedDirctions.push(Direction.RIGHT);
        break;
      case 'ArrowDown':
        this.cachedDirctions.push(Direction.DOWN);
        break;
      case 'ArrowLeft':
        this.cachedDirctions.push(Direction.LEFT);
        break;
      default:
        break;
    }
  }

  protected run () {
    this.getDirection();
    const snake = this.getNextSnake();
    if (!snake) {
      return false;
    }

    this.snake = snake;

    this.gameCanvas.draw(this.snake, this.food!, this.direction);
    console.log(`run ${JSON.stringify(this.snake)}`, this.food, Direction[this.direction], this.cachedDirctions);
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

  addSubscribe (topic: string, callback: EventCallback) {
    this._eventEmitter.on(topic, callback);
  }

  removeSubscribe (topic: string, callback: EventCallback) {
    this._eventEmitter.off(topic, callback);
  }

  publish (topic: string, status: string) {
    this._eventEmitter.emit(topic, status);
  }

  addKeyboardListener () {
    window.addEventListener('keydown', this.handleKeydown, false);
  }

  removeKeyboardListener () {
    window.removeEventListener('keydown', this.handleKeydown, false);
  }
}

export default Snake;
