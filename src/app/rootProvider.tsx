"use client";
import { setMode } from "@/redux/slice/service";
import { RootState } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const RootProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("salom");
    const localMode = localStorage.getItem("dark") as string;
    const mode = localMode && JSON.parse(localMode);
    if (mode === true) {
      dispatch(setMode(!localMode));
    }
  }, []);

  const { dark } = useSelector((state: RootState) => state.service);
  return <div className={`root-provider ${dark && "dark"}`}>{children}</div>;
};

export default RootProvider;
