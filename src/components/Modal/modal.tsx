import React from "react";
import { ModalProps } from "./module.props";

const Modal = ({ children, ...props }: ModalProps): JSX.Element => {
  return <div {...props}>{children}</div>;
};

export default Modal;
