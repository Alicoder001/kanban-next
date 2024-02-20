import React from "react";
import { TextareaProps } from "./textarea.props";
import styles from "./textarea.module.css";
const Textarea = ({ ...props }: TextareaProps): JSX.Element => {
  return <textarea className={styles.textarea} {...props} />;
};

export default Textarea;
