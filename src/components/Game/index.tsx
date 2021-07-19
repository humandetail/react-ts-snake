import React, { FC, useEffect, useRef } from 'react';
import { IGameProps } from '../../types';

import Snake from '../../libs/Snake/Snake';
import styles from './index.module.scss';

const Game: FC<IGameProps> = ({ status, snakeSize, canvasSize, level }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const oCanvas = canvasRef.current;

    const snake = Snake.getSnake({
      el: oCanvas!,
      snakeSize: snakeSize,
      canvasSize: canvasSize,
      level
    });

    switch (status) {
      case 'PLAYING':
        snake.start();
        break;
      case 'PAUSE':
        console.log('here');
        snake.pause();
        break;
      case 'FINISH':
        snake.finish();
        break;
      default:
        break;
    }

    return () => {
      snake.pause();
    }
  }, [status, snakeSize, canvasSize, level]);

  return (
    <div className={ styles.wrapper }>
      <canvas
        ref={ canvasRef }
        className={ styles.canvas }
        width={ snakeSize * canvasSize[0] }
        height={ snakeSize * canvasSize[1] }
      />
    </div>
  );
}

export default Game;
