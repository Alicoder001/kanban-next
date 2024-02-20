import React from "react";
import { ButtonProps } from "./button.props";
import styles from "./button.module.css";
import cn from "classnames";
const Button = ({ title, buttonType = "primary-S", ...props }: ButtonProps) => {
  return (
    <button className={cn(styles.button, styles[buttonType])} {...props}>
      {title}
    </button>
  );
};

export default Button;
