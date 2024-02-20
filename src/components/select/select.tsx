import React from "react";
import { SelectProps } from "./select.props";
import styles from "./select.module.css";
import cn from "classnames";
import Image from "next/image";
import accordion from "../../images/accordion-light.svg";
const Select = ({
  id,
  title,
  isOpen = false,
  elements,
}: SelectProps): JSX.Element => {
  return (
    <div className={cn(styles.select)}>
      <header className={cn(styles.header, { [styles.open]: isOpen })}>
        <p className={styles.title}>{title}</p>
        <Image className={styles.accordion} src={accordion} alt="accordion" />
      </header>
      {isOpen && (
        <ul className={styles.list}>
          {elements.map((item, index) => {
            return (
              <li key={index} className={styles.item}>
                {item.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
