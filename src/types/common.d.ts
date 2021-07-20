/**
 * common definition
 */

import React from "react";

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface IButtonProps {
  type?: ButtonType;
  htmlType?: string;
  onClick?: Function;
  children?: React.ReactNode;
}
