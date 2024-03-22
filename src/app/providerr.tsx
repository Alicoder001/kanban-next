"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import RootProvider from "./rootProvider";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <RootProvider>{children}</RootProvider>
    </Provider>
  );
};

export default Providers;
