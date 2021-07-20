import React, { FC } from 'react';
import { IHeaderProps } from '../../types';

import { levelText } from '../../config/snake.config';

import styles from './index.module.scss';

const Header: FC<IHeaderProps> = ({ hasBack = false, goBack, title, level }) => {
  return (
    <header className={ styles.header }>
      {
        goBack && (
          <div className={ styles.back } onClick={ goBack }>
            <svg className={ styles['icon-back'] } viewBox="0 0 1354 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3823" width="20" height="20"><path d="M1091.899077 395.0592C1171.771077 442.683077 1269.76 571.092677 1310.530954 725.700923c40.770954 154.592492 34.028308 293.037292 34.028308 293.037292s-52.791138-85.244062-74.200616-115.129107c-21.393723-29.9008-111.584492-141.248985-251.557415-205.776739-139.988677-64.543508-373.9648-53.0432-373.9648-53.0432v268.729108L0 456.767015 644.836431 0v271.202462s154.907569 11.657846 235.882338 28.435692c136.381046 28.246646 211.180308 95.421046 211.180308 95.421046z" p-id="3824"></path></svg>
          </div>
        )
      }

      <h1 className={ styles.title }>
        { title }
      </h1>

      <div className={ styles.level }>
        [{ levelText[level] }]
      </div>
    </header>
  );
}

export default Header;
