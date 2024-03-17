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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slice/service";
import Modal from "../Modal/modal";
import { setCurrentTask } from "@/redux/slice/board";
const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const { boardId } = useParams();
  console.log(boardId);
  const [show, setShow] = useState(false);
  const { boards } = useSelector((state: RootState) => state.board);
  const { modalType } = useSelector((state: RootState) => state.service);
  const dispatch = useDispatch();
  const board = boards.find((item) => item.uid === boardId);
  return (
    <div className={cn(styles.header)} {...props}>
      {modalType === "header" && <Modal data={board} type="add-task" />}
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
          <button
            onClick={() => {
              dispatch(setModal("header"));
            }}
            className={cn(styles.button, "button")}
          >
            +Add New Task
          </button>
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
