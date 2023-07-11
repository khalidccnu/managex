"use client";

import React from "react";
import { Provider } from "mobx-react";
import TasksProvider from "@/providers/TasksProvider";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider {...TasksProvider}>{children}</Provider>
      <Footer />
    </>
  );
};

export default Layout;
