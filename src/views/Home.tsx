import React, { FC, useState } from 'react';

import {
  snakeSize,
  Level,
  canvasSize
} from '../config/snake.config';

import Game from '../components/Game';
import { GameStatus } from '../types';

const Home: FC = () => {
  const [status, setStauts] = useState<GameStatus>('PLAYING');

  // setTimeout(() => {
  //   setStauts('PAUSE')
  // }, 3000);

  return (
    <div>
      <Game
        status={ status }
        snakeSize={ snakeSize }
        level={ Level.NORMAL }
        canvasSize={ canvasSize }
      />
    </div>
  );
}

export default Home;
