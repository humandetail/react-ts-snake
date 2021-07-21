/**
 * common definition
 */

import React from "react";
import { Level } from "../config/snake.config";

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export interface IButtonProps {
  type?: ButtonType;
  htmlType?: string;
  onClick?: Function;
  children?: React.ReactNode;
}

export type ModalType = 'Confirm' | 'Alert';

export interface IModalProps {
  visible: boolean;
  type?: ModalType;
  title?: string | null;
  content?: string;
  footer?: any;
  okText?: string;
  cancelText?: string;
  onOk?: Function;
  onCancel?: Function;
  children?: React.ReactNode;
}

export type IConfirmModalProps = IModalProps;

export interface ILevelBoardProps {
  changeLevel: (level: Level) => void;
}
