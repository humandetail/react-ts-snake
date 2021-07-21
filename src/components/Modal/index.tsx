import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { IModalProps } from '../../types';

import styles from './index.module.scss';

const Modal: FC<IModalProps> = ({
  visible,
  type,
  title,
  content,
  children,
  footer,
  okText,
  cancelText,
  onOk,
  onCancel
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(visible);

  function handleOk (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setModalVisible(false);

    onOk && onOk(e);
  }

  function handleCancel (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setModalVisible(false);

    onCancel && onCancel(e);
  }

  if (!modalVisible) {
    return null;
  }

  return ReactDOM.createPortal((
    <div className={ `${styles.modal} ${type ? styles[type + '-modal'] : ''}` }>
      <div className={ styles.mask }></div>
      <div className={ styles.container }>
        <div className={ styles.wrapper }>
          {
            title && (
              <h4 className={ styles.title }>
                { title }
              </h4>
            )
          }
          {
            content
              ? (<div className={ styles.content }>{ content }</div>)
              : children
          }
          {
            footer !== null && (
              <footer className={ styles.footer }>
                <button
                  className={ `${styles.btn} ${styles['btn-ok']}` }
                  onClick={ handleOk }>
                  { okText || '确认' }
                </button>
                {
                  type !== 'Alert' && (
                    <button
                      className={ `${styles.btn} ${styles['btn-cancel']}` }
                      onClick={ handleCancel }>
                      { cancelText || '取消' }
                    </button>
                  )
                }
              </footer>
            )
          }
        </div>
      </div>
    </div>
  ), document.body);
}

export default Modal;
