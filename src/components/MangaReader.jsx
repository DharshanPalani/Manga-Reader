import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API from "../utils/apiConfig.js";

function MangaReader() {
  const { chapter } = useParams(); // This grabs chapter ID from the url.
  const navigate = useNavigate(); // This is used to switch between chapters
  const [pages, setPages] = useState([]); // This grabs and holds all the images for the chapters to be shown
  const [chapters, setChapters] = useState([]); // This holds the list of all chapter names
  const [pageIndex, setPageIndex] = useState(0); // This tracks the page the user is on, storing the index of it
  const [menuOpen, setMenuOpen] = useState(false); // This Toggles the right menu (Can be accessed when clicking in the middle)
  const [progress, setProgress] = useState(0); // This handles the chapter progress bar value (if finished 5 out of 100 pages it's 5%)

  // This grab all chapter names when component loads
  useEffect(() => {
    axios.get(`${API}/api/chapters`)
      .then(res => {
        // This handles the sorting algorithm and stores them in order.
        const sorted = res.data.sort((a, b) => {
          const numA = parseFloat(a.replace(/[^\d.]/g, ""));
          const numB = parseFloat(b.replace(/[^\d.]/g, ""));
          return numA - numB;
        });
        setChapters(sorted);
      });
  }, []);

  // when the chapter changes, fetch its pages
  useEffect(() => {
    axios.get(`${API}/api/chapters/${chapter}`)
      .then(res => {
        setPages(res.data);
        setPageIndex(0); // reset to first page when switching chapters
      });
  }, [chapter]);

  // This handles the updating the progress bar when reading.
  useEffect(() => {
    if (pages.length > 0) {
      const newProgress = ((pageIndex + 1) / pages.length) * 100;
      setProgress(newProgress);
    }
  }, [pageIndex, pages]);

  // This 3 lines of code gets the current chapter we are reading (currentIndex)... 
  // ...the previous chapter (prevChapter) and the next chapter (nextChapter)
  const currentIndex = chapters.indexOf(chapter);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  // handle chapter nav backwards
  const goToPrevChapter = () => {
    if (prevChapter) navigate(`/chapter/${prevChapter}`);
  };

  // This forwards nav and update highest read chapter in local storage
  const goToNextChapter = () => {
    const currentNumber = parseInt(chapter.replace(/[^\d]/g, ""));
    const highestRead = parseInt(localStorage.getItem("highestRead")) || 0;
    if (currentNumber > highestRead) {
      localStorage.setItem("highestRead", currentNumber);
    }
    if (nextChapter) navigate(`/chapter/${nextChapter}`);
  };

  // clicking right side or tapping screen advances page
  const goNextPage = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex((prev) => prev + 1);
    } else {
      goToNextChapter(); // if last page, go to next chapter
    }
  };

  // clicking left side or swipe left goes back
  const goPrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    } else {
      goToPrevChapter(); // if first page, go to previous chapter
    }
  };

  // save current spot in cookies just in case we wanna come back later
  useEffect(() => {
    document.cookie = `lastChapter=${chapter}`;
    document.cookie = `lastPage=${pageIndex}`;
  }, [chapter, pageIndex]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">

      {/* show current page image if it exists */}
      {pages[pageIndex] ? (
        <img
          src={`${API}/manga/${chapter}/${pages[pageIndex]}`}
          alt={`Page ${pageIndex + 1}`}
          className="absolute top-1/2 left-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain z-0"
          draggable={false}
        />
      ) : (
        <div className="text-white text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          No pages to display
        </div>
      )}

      {/* invisible click zones for prev/menu/next actions */}
      <div className="absolute top-0 left-0 h-full w-[40%] z-10" onClick={goPrevPage} />
      <div className="absolute top-0 left-[40%] h-full w-[20%] z-10" onClick={() => setMenuOpen(!menuOpen)} />
      <div className="absolute top-0 right-0 h-full w-[40%] z-10" onClick={goNextPage} />

      {/* slide-out side menu on right */}
      {menuOpen && (
        <div className="absolute top-0 right-0 h-full w-[300px] bg-zinc-900 text-white p-4 shadow-xl z-20">
          <Link to="/" className="text-orange-400 text-lg font-bold block mb-4">⟵ Back</Link>
          <p className="mb-2">{chapter.replace('_', ' ')}</p>
          <p className="mb-2">Page: {pageIndex + 1} / {pages.length}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={goToPrevChapter}
              disabled={!prevChapter}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded disabled:opacity-50"
            >Prev</button>

            <button
              onClick={goToNextChapter}
              disabled={!nextChapter}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded disabled:opacity-50"
            >Next</button>
          </div>

          {/* dropdown to jump to a specific chapter */}
          <select
            className="mt-4 w-full bg-[#292929] text-white p-2 rounded border border-orange-500"
            value={chapter}
            onChange={(e) => navigate(`/chapter/${e.target.value}`)}
          >
            {chapters.map((chap, i) => (
              <option key={i} value={chap}>{i + 1}</option>
            ))}
          </select>

          <button
            className="mt-6 bg-white text-black px-4 py-2 rounded w-full"
            onClick={() => setMenuOpen(false)}
          >Close Menu</button>
        </div>
      )}

      {/* Bottom progress bar overlayed on the image */}
      <div className="absolute bottom-0 left-0 w-full h-1 z-20">
        <div className="w-full h-full">
          <div
            className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}


export default MangaReader;