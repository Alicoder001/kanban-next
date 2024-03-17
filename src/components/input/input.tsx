import { InputProps } from "./input.props";
import styles from "./input.module.css";
import cn from "classnames";
import trashIcon from "../../images/trash-light.svg";
import trashIconDark from "../../images/trash-dark.svg";
import Image from "next/image";
const Input = ({
  trash = false,
  itemKey = "",
  ...props
}: InputProps): JSX.Element => {
  return (
    <div className={cn(styles.wrap)}>
      <input className={styles.input} {...props} />
      {trash && (
        <Image
          data-uid={itemKey}
          id="trash"
          className={styles.trash}
          src={trashIcon}
          alt="trash"
        />
      )}
    </div>
  );
};

export default Input;
