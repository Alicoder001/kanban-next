"use client";
import React, { useState } from "react";
import styles from "./header.module.css";
import cn from "classnames";
import { HeaderProps } from "./header.props";
import LogoLight from "../../images/logo-light.svg";
import logoDark from "../../images/logo-dark.svg";
import menuLight from "../../images/menu-icon-light.svg";
import menuDark from "../../images/menu-icon-dark.svg";
import logo from "../../images/logo-icon.svg";
import Image from "next/image";
const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const [show, setShow] = useState(false);
  return (
    <div className={cn(styles.header)} {...props}>
      <div
        className={cn(styles.headerLogoWrapper, { [styles.logoHidden]: show })}
      >
        <Image className={styles.logo} src={LogoLight} alt="logo" />
        <Image className={styles.miniLogo} src={logo} alt="logo" />
      </div>
      <div
        className={cn(styles.headerWrapper, { [styles.wrapperRight]: show })}
      >
        <h1>Platform Launch</h1>
        <div className={styles.headerLeftWrapper}>
          <button className={cn(styles.button, "button")}>+Add New Task</button>
          <Image src={menuLight} alt="logo" />
        </div>
      </div>
      {/* <div
        className={cn(styles.sidebar, {
          [styles.left]: !show,
        })}
      >
        <div className={cn(styles.sHeader)}>
          <Image src={LogoLight} alt="logo" />
        </div>
      </div> */}
    </div>
  );
};

export default Header;
