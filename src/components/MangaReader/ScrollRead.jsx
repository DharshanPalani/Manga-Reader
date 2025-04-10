import { useEffect } from "react";
import API from "../../utils/apiConfig";
import NavigationZones from "./NavigationZones";


function ScrollRead({ chapter, pages, menuOpen, setMenuOpen, goNextPage, goPrevPage}) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapter, pages]);
  

  return (
    <div className="relative">
      <NavigationZones
        toggleMenu={() => setMenuOpen(!menuOpen)}
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
      />
      <div className="flex flex-col items-center ">
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
