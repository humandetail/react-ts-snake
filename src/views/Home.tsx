import React, { FC, useEffect, useState } from 'react';

import {
  snakeSize,
  Level,
  canvasSize
} from '../config/snake.config';

import { GameStatus } from '../types';

import Header from '../components/Header';
import Game from '../components/Game';
import LevelBoard from '../components/LevelBoard';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Confirm from '../components/Modal/Confirm';

import styles from '../assets/styles/home.module.scss';

const Home: FC = () => {
  const [status, setStatus] = useState<GameStatus>('LOADING');
  const [level, setLevel] = useState<Level>(Level.ESAY);
  const [boardVisible, setBoardVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setStatus('LOADED');
    }, 1000);
  }, []);

  function handleChangeLevel (lev: Level) {
    setLevel(lev);
    setBoardVisible(false);
  }

  if (status === 'LOADING') {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Header
        hasBack={ status !== 'LOADED' }
        goBack={ () => setStatus('LOADED') }
        title="这是标题"
        level={ level }
      />
      {
        boardVisible && <LevelBoard changeLevel={ handleChangeLevel }/>
      }

      {
        status === 'LOADED'
          ? (
            <>
              <div className={ styles.home }>
                <Button
                  type="success"
                  onClick={ () => setStatus('PLAYING') }>
                  START
                </Button>
                <Button
                  type="primary"
                  onClick={ () => setBoardVisible(true) }>
                  SELECT MODE
                </Button>
              </div>
            </>
          )
          : (
            <>
              <Game
                status={ status }
                snakeSize={ snakeSize }
                level={ level }
                canvasSize={ canvasSize }
                setStatus={ setStatus }
              />

              {
                status === 'PAUSE' && (
                  <Confirm
                    visible={ true }
                    content="PAUSE"
                    onOk={ () => console.log('Confirm') }
                    onCancel={ () => console.log('Cancel') }
                  />
                )
              }

              {
                status === 'FINISH' && (
                  <Confirm
                    visible={ true }
                    content="Game over!"
                    onOk={ () => console.log('Confirm') }
                    onCancel={ () => console.log('Cancel') }
                  />
                )
              }
            </>
          )
      }
    </>
  );
}

export default Home;
