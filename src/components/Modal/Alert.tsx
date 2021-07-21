import React, { FC } from 'react';
import { IAlertModalProps } from '../../types';

import Modal from './index';

const Alert: FC<IAlertModalProps> = ({ visible, content, okText, onOk }) => {
  return (
    <Modal
      visible={ visible }
      type="Alert"
      title={ null }
      footer={ true }
      okText={ okText }
      content={ content }
      onOk={ onOk }
    />
  );
}

export default Alert;
