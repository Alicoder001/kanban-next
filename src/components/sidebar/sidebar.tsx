"use client";
import { SidebarProps } from "./sidebar.props";
import styles from "./sidebar.module.css";
import cn from "classnames";
import Image from "next/image";
import logoLight from "../../images/logo-light.svg";
import logoDark from "../../images/logo-dark.svg";
import iconLight from "../../images/category-icon-light.svg";
import sunLight from "../../images/sunLight.svg";
import moonLight from "../../images/moonLight.svg";
import eyesLight from "../../images/eyes-light.svg";
import eye from "../../images/eye-light.svg";
import Link from "next/link";
import Modal from "../Modal/modal";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentTask } from "@/redux/slice/board";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setModal, setMode, setSidebar } from "@/redux/slice/service";
const Sidebar = ({ className }: SidebarProps): JSX.Element => {
  const dispatch = useDispatch();
  const { boards: currentBoards } = useSelector(
    (state: RootState) => state.board
  );
  const { modalType, dark, sidebarShow } = useSelector(
    (state: RootState) => state.service
  );
  const { user } = useSelector((state: RootState) => state.user);
  const params = useParams();
  const boardId = params.boardId;

  const board =
    currentBoards?.find((item) => item.uid === boardId) ||
    (currentBoards && currentBoards[0]);
  return (
    <>
      {modalType === "sidebar-board-add" && (
        <Modal data={board} type="add-board" />
      )}
      <div
        id="sidebar"
        className={cn(className, styles.sidebar, {
          [styles.left]: !sidebarShow,
        })}
      >
        <div className={styles.sidebarWrap}>
          <div className={cn(styles.header)}>
            <Image
              className={styles.logo}
              src={!dark ? logoLight : logoDark}
              alt="logo"
            />
          </div>
          <div className={styles.main}>
            <h4 className={styles.title}>
              ALL BOARDS ({currentBoards?.length})
            </h4>
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
                    href={`${
                      user
                        ? "/user/" + user + "/" + item.uid
                        : "/template/" + item.uid
                    }`}
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
                  dispatch(setModal("sidebar-board-add"));
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
                  dispatch(setMode(dark));
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
                dispatch(setSidebar(false));
              }}
              className={styles.hide}
            >
              <Image src={eyesLight} alt="hide-icon" />
              <h3 className={styles.hideTitle}>Hide Sidebar</h3>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(setSidebar(true));
        }}
        className={cn(styles.eyes, { [styles.left]: sidebarShow })}
      >
        <Image src={eye} alt="eye" />
      </div>
    </>
  );
};

export default Sidebar;
