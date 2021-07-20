import React, { FC, useState } from 'react';

import {
  snakeSize,
  Level,
  canvasSize
} from '../config/snake.config';

import Game from '../components/Game';
import Button from '../components/Button';
import { GameStatus } from '../types';

const Home: FC = () => {
  const [status, setStatus] = useState<GameStatus>('LOADING');

  // setTimeout(() => {
  //   setStauts('PAUSE')
  // }, 3000);
  if (status === 'LOADING') {
    setTimeout(() => {
      setStatus('LOADED');
    }, 1000);
    return <div>Loading</div>
  }

  if (status === 'LOADED') {
    return (
      <div>
        <h1>Home</h1>
        <Button onClick={ () => setStatus('PLAYING') }>BUTTON A</Button>
        <br />
        <Button type="primary">BUTTON B</Button>
        <br />
        <Button type="danger">BUTTON C</Button>
        <br />
        <Button type="warning">BUTTON D</Button>
        <br />
        <Button type="success">BUTTON E</Button>
      </div>
    );
  }

  return (
    <div>
      <Game
        status={ status }
        snakeSize={ snakeSize }
        level={ Level.HARD }
        canvasSize={ canvasSize }
        setStatus={ setStatus }
      />

      {
        status === 'FINISH' && (
          <div>Game over</div>
        )
      }
    </div>
  );
}

export default Home;
