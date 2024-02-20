import React from "react";
import styles from "./label.module.css";
import cn from "classnames";
import Input from "../input/input";
import { LabelProps } from "./label.props";
const Label = ({ title, children, ...props }: LabelProps) => {
  return (
    <label className={styles.label} {...props}>
      <h4 className={styles.span}>{title}</h4>
      {children}
    </label>
  );
};

export default Label;
