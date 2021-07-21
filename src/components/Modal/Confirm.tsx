import React, { FC } from 'react';
import { IConfirmModalProps } from '../../types';

import Modal from './index';

const Confirm: FC<IConfirmModalProps> = ({ visible, content, onOk, onCancel }) => {
  return (
    <Modal
      visible={ visible }
      type="Confirm"
      title={ null }
      footer={ true }
      okText="确认"
      cancelText="取消"
      content={ content }
      onOk={ onOk }
      onCancel={ onCancel }
    />
  );
}

export default Confirm;
