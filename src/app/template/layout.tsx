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
  const snapShot = await getCollection("boards");
  const boards = snapShot.docs.map((item) => {
    return item.data();
  }) as BoardI[];

  return (
    <>
      <Header />
      <main className="main">
        <Sidebar boards={boards} />
        <Main boards={boards}>{children}</Main>
      </main>
    </>
  );
}
