import type { Metadata } from "next";
import { Header, Main, Sidebar } from "@/components";
import { getCollection } from "@/lib";
import { BoardI } from "@/interfaces/user.interface";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { boardId?: string };
}>) {
  return (
    <>
      <Header />
      <main className="main">
        <Sidebar />
        <Main>{children}</Main>
      </main>
    </>
  );
}
