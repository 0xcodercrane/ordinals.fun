import React from "react";
import Head from "next/head";
import MenuBar from "@/components/sections/Menu";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <main className="text-black dark:text-white">
      <Head>
        <title>LiteMap</title>
        <meta name="description" content="Ordinal audio inscriptions." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center flex-col container min-h-screen py-[90px] relative">
        <MenuBar />
        {props.children}
        <Footer />
      </div>
    </main>
  );
}
