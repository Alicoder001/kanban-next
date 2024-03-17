"use client";
import React, { useEffect, useState } from "react";
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
import Modal from "../Modal/modal";
import { useDispatch } from "react-redux";
import { getAllBoard, setCurrentTask } from "@/redux/slice/board";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setModal } from "@/redux/slice/service";
const Sidebar = ({
  className,
  boards,
  ...props
}: SidebarProps): JSX.Element => {
  const { boards: currentBoards } = useSelector(
    (state: RootState) => state.board
  );
  const { modalType } = useSelector((state: RootState) => state.service);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);
  const params = useParams();
  const boardId = params.boardId;
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dispatch(setModal("none"));
      }
    });
  }
  useEffect(() => {
    dispatch(getAllBoard(boards));
  }, [boards]);
  const board =
    currentBoards?.find((item) => item.uid === boardId) ||
    (currentBoards && currentBoards[0]);
  return (
    <>
      {modalType === "sidebar" && <Modal data={board} type="add-board" />}
      <div
        className={cn(className, styles.sidebar, {
          [styles.left]: !show,
        })}
      >
        <div className={cn(styles.header)}>
          <Image src={logoLight} alt="logo" />
        </div>
        <div className={styles.main}>
          <h4 className={styles.title}>ALL BOARDS ({boards?.length})</h4>
          <ul className={styles.list}>
            {currentBoards &&
              currentBoards.map((item) => (
                <Link
                  onClick={() => {
                    dispatch(
                      setCurrentTask({
                        boardId,
                        taskId: "",
                        columnId: "",
                      })
                    );
                  }}
                  href={`/template/${item.uid}`}
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
                  <h3>{item.title}</h3>
                </Link>
              ))}

            <li
              onClick={() => {
                dispatch(setModal("sidebar"));
              }}
              className={cn(styles.item, styles.createItem)}
            >
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
