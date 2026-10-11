import Footer2 from "./Footer2";
import Header2 from "./Header2";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />
      <main className="animate-fadeIn">
        <div className="w-full overflow-x-hidden">
          {React.cloneElement(children)}
        </div>
      </main>
      <Footer2 />
    </div>
  );
}
