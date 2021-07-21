import React, { FC } from 'react';

import styles from './index.module.scss';

const Loading: FC = () => {
  return (
    <div className={ styles.loading }>
      <svg className={ styles.icon } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5306" width="32" height="32">
        <path d="M204.8 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#0070f3" p-id="5307"></path>
        <path d="M819.2 204.8m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#84baf8" p-id="5308"></path>
        <path d="M819.2 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#84baf8" p-id="5309"></path>
        <path d="M204.8 819.2m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" fill="#84baf8" p-id="5310"></path>
      </svg>
    </div>
  );
}

export default Loading;
