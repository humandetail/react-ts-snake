import React, { FC } from 'react';

import { IGameOverProps } from '../../types';
import { Level, levelText } from '../../config/snake.config';
import { ButtonType } from '../../types';

import Button from '../Button';
import Modal from '../Modal';

import styles from './index.module.scss';

const GameOverBoard: FC<IGameOverProps> = ({ setStatus, setLevelBoardVisible }) => {
  return (
      <Modal
        visible={ true }
        footer={ null }
      >
        <section className={ styles['game-over-board'] }>
          <section className={ styles.tips }>游戏结束！</section>
          <Button
            type="success"
            onClick={ () => setStatus('START') }>
            再来一局
          </Button>
          <Button
            type="primary"
            onClick={ () => setLevelBoardVisible(true) }>
            选择难度
          </Button>
          <Button
            type="danger"
            onClick={ () => setStatus('LOADED') }>
            退出游戏
          </Button>
        </section>
      </Modal>
  );
}

export default GameOverBoard;
