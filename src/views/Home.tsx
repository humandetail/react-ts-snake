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
import Alert from '../components/Modal/Alert';

import styles from '../assets/styles/home.module.scss';
import GameOverBoard from '../components/GameOverBaord';

const Home: FC = () => {
  const [status, setStatus] = useState<GameStatus>('LOADING');
  const [level, setLevel] = useState<Level>(Level.ESAY);
  const [boardVisible, setBoardVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setStatus('LOADED');
    }, 500);
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
                  onClick={ () => setStatus('START') }>
                  开始游戏
                </Button>
                <Button
                  type="primary"
                  onClick={ () => setBoardVisible(true) }>
                  选择难度
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
                  <Alert
                    visible={ true }
                    content="暂停游戏中"
                    okText="继续"
                    onOk={ () => setStatus('PLAYING') }
                  />
                )
              }

              {
                status === 'FINISH' && (
                  <GameOverBoard
                    setStatus={ setStatus }
                    setLevelBoardVisible={ setBoardVisible }
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
