"use client";
import React, { useState } from "react";
import { SidebarProps } from "./sidebar.props";
import styles from "./sidebar.module.css";
import cn from "classnames";
import Image from "next/image";
import logoLight from "../../images/logo-light.svg";
import logoDark from "../../images/logo-dark.svg";
import iconLight from "../../images/category-icon-light.svg";
import iconDark from "../../images/category-icon-dark.svg";
import sunLight from "../../images/sunLight.svg";
import sunDark from "../../images/sun.svg";
import moonDark from "../../images/moon.svg";
import moonLight from "../../images/moonLight.svg";
import eyesLight from "../../images/eyes-light.svg";
import eyesDark from "../../images/eyes-dark.svg";
import eye from "../../images/eye-light.svg";
import Link from "next/link";
import { useParams } from "next/navigation";
const Sidebar = ({
  className,
  boards,
  ...props
}: SidebarProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);
  const params = useParams();
  const boardId = params.boardId;

  return (
    <>
      <div
        className={cn(className, styles.sidebar, {
          [styles.left]: !show,
        })}
      >
        <div className={cn(styles.header)}>
          <Image src={logoLight} alt="logo" />
        </div>
        <div className={styles.main}>
          <h4 className={styles.title}>ALL BOARDS (3)</h4>
          <ul className={styles.list}>
            {boards &&
              boards.map((item) => (
                <Link
                  href={`${item.uid}`}
                  key={item.uid}
                  className={cn(styles.item, {
                    [styles.active]: item.uid === boardId,
                  })}
                >
                  <Image
                    className={styles.iconActive}
                    src={iconLight}
                    alt="category-icon"
                  />
                  <h3>Platform Launch</h3>
                </Link>
              ))}

            <li className={cn(styles.item, styles.createItem)}>
              <Image src={iconLight} alt="category-icon" />
              <h3>+ Create New Board</h3>
            </li>
          </ul>
        </div>
        <div className={styles.footer}>
          <div className={styles.mode}>
            <Image src={sunLight} alt="sun-icon" />
            <div
              onClick={() => {
                setDark(!dark);
              }}
              className={styles.toggle}
            >
              <div
                className={cn(styles.circle, {
                  [styles.circleRight]: dark,
                })}
              ></div>
            </div>
            <Image src={moonLight} alt="moon-icon" />
          </div>
          <div
            onClick={() => {
              setShow(false);
            }}
            className={styles.hide}
          >
            <Image src={eyesLight} alt="hide-icon" />
            <h3 className={styles.hideTitle}>Hide Sidebar</h3>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setShow(true);
        }}
        className={cn(styles.eyes, { [styles.left]: show })}
      >
        <Image src={eye} alt="eye" />
      </div>
    </>
  );
};

export default Sidebar;
