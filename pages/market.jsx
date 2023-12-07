import Layout from "@/components/Layout";
import React from "react";

export default function market() {
  return (
    <Layout>
      <div className="my-auto flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
         Coming Soon
        </h1>
        <p className="text-white text-lg mb-8 text-center">
          We are working hard to give you something cool. <br /> Please wait a little bit.
        </p>
      </div>
    </Layout>
  );
}
