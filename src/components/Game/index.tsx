import React, { FC, useEffect, useRef } from 'react';
import { IGameProps } from '../../types';

import Header from './Header';

import Snake from '../../libs/Snake/Snake';
import styles from './index.module.scss';

const Game: FC<IGameProps> = ({ status, snakeSize, canvasSize, level, setStatus }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleSpacePress (e: KeyboardEvent) {
    if (e.key === ' ') {
      setStatus(status === 'PAUSE' ? 'PLAYING' : 'PAUSE');
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleSpacePress, false);

    return () => {
      window.removeEventListener('keydown', handleSpacePress, false);
    }
  });

  useEffect(() => {
    const oCanvas = canvasRef.current;

    const snake = Snake.getSnake({
      el: oCanvas!,
      snakeSize: snakeSize,
      canvasSize: canvasSize,
      level
    });

    snake.addSubscribe('UPDATE_STATUS', setStatus);

    switch (status) {
      case 'PLAYING':
        snake.start();
        break;
      case 'PAUSE':
        snake.pause();
        break;
      case 'FINISH':
        snake.finish();
        break;
      default:
        break;
    }

    return () => {
      snake.removeSubscribe('UPDATE_STATUS', setStatus);
      snake.pause();
    }
  }, [status, snakeSize, canvasSize, level, setStatus]);

  return (
    <div className={ styles.container }>
      <Header
        hasBack={ true }
        goBack={ () => setStatus('LOADED') }
        title="贪吃小蛇"
        level={ level }
      />
      <section className={ styles.wrapper }>
        <canvas
          ref={ canvasRef }
          className={ styles.canvas }
          width={ snakeSize * canvasSize[0] }
          height={ snakeSize * canvasSize[1] }
        />
      </section>
    </div>
  );
}

export default Game;
