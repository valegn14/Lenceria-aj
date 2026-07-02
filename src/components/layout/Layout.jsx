import Footer2 from "./Footer2";
import Header2 from "./Header2";
import SearchOverlay from "../search/SearchOverlay";
import React, { useState } from "react";

export default function Layout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 onSearchOpen={() => setIsSearchOpen(true)} />
      <main className="animate-fadeIn">
        <div className="w-full overflow-x-hidden">
          {React.cloneElement(children)}
        </div>
      </main>
      <Footer2 />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
