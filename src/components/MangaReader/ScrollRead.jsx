import React from "react";
import API from "../../utils/apiConfig";
import NavigationZones from "./NavigationZones";

function ScrollRead({ chapter, pages, menuOpen, setMenuOpen, goNextPage, goPrevPage }) {
  return (
    <div className="relative">
      <NavigationZones
        toggleMenu={() => setMenuOpen(!menuOpen)}
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
      />
      <div className="flex flex-col items-center gap-6 py-6 px-4">
        {pages.map((page, i) => (
          <img
            key={i}
            src={`${API}/manga/${chapter}/${page}`}
            alt={`Page ${i + 1}`}
            className="w-full max-w-screen-md object-contain"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

export default ScrollRead;
