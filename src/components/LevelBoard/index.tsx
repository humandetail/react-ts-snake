import React, { FC } from 'react';

import { ILevelBoardProps } from '../../types';
import { Level, levelText } from '../../config/snake.config';
import { ButtonType } from '../../types';

import Button from '../Button';
import Modal from '../Modal';

import styles from './index.module.scss';

const buttonTypeMap = {
  [Level.ESAY]: 'primary' as ButtonType,
  [Level.NORMAL]: 'warning' as ButtonType,
  [Level.HARD]: 'danger' as ButtonType
}

const LevelBoard: FC<ILevelBoardProps> = ({ changeLevel }) => {
  return (
      <Modal
        visible={ true }
        footer={ null }
      >
        <section className={ styles['level-board'] }>
          {
            Object.entries(levelText).map(([key, value]) => (
              <Button
                key={ key }
                type={ buttonTypeMap[key as Level] }
                onClick={ () => changeLevel(key as Level) }>{ value }</Button>
            ))
          }
        </section>
      </Modal>
  );
}

export default LevelBoard;
