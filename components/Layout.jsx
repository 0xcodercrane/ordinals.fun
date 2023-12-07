import React from "react";
import Head from "next/head";
import MenuBar from "@/components/Menu";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <main>
      <Head>
        <title>BitBitmap</title>
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
