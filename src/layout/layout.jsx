import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container mx-auto min-h-[calc(100vh-180px)] ">
        {children}
      </div>
      <Footer />
    </>
  );
}
