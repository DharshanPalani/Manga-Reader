import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useChapters from "../../hooks/useChapters";
import useChapterPages from "../../hooks/useChapterPages";
import useChapterNavigation from "../../hooks/useChapterNavigation";

import MenuPanel from "./MenuPanel";
import ProgressBar from "./ProgressBar";

import PaginationRead from "./PaginationRead";
import ScrollRead from "./ScrollRead";

function MangaReader() {
  const { chapter } = useParams();
  const navigate = useNavigate();

  const chapters = useChapters(); // Fetch list of available chapters
  const pages = useChapterPages(chapter); // Fetch image pages for the current chapter

  const {
    prevChapter,
    nextChapter,
    goToPrevChapter,
    goToNextChapter,
  } = useChapterNavigation(chapters, chapter); // Handle chapter navigation

  const [pageIndex, setPageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const [scrollMode, setScrollMode] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setPageIndex(0); // Reset to first page on chapter change
  }, [chapter]);

  useEffect(() => {
    let scrollHandler;
  
    if (scrollMode) {
      scrollHandler = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(scrollProgress);
      };
  
      window.addEventListener("scroll", scrollHandler);
      // This is called only once to avoid lag
      scrollHandler();
    } else {
      if (pages.length > 0) {
        const pageProgress = ((pageIndex + 1) / pages.length) * 100;
        setProgress(pageProgress);
      }
    }
  
    return () => {
      if (scrollMode && scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [scrollMode, pageIndex, pages]);
  

  useEffect(() => {
    document.cookie = `lastChapter=${chapter}`;
    document.cookie = `lastPage=${pageIndex}`;
  }, [chapter, pageIndex]);

  const goNextPage = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex((prev) => prev + 1);
    } else {
      goToNextChapter();
    }
  };

  const goPrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    } else {
      goToPrevChapter();
    }
  };

  return (
  <div>

    {scrollMode ?  (
        <ScrollRead 
        chapter={chapter}
        pages={pages}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goToNextChapter={goToNextChapter}
        />
      ): (
      <PaginationRead 
        chapter={chapter} 
        pages={pages} 
        pageIndex={pageIndex} 
        goPrevPage={goPrevPage} 
        goNextPage={goNextPage} 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        />
      )}
        
    {/* Menu section */}
    {menuOpen && (
      <MenuPanel
      chapter={chapter}
      chapters={chapters}
      pageIndex={pageIndex}
      pages={pages}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      goToPrevChapter={goToPrevChapter}
      goToNextChapter={goToNextChapter}
      setMenuOpen={setMenuOpen}
      navigate={navigate}
      scrollMode={scrollMode}
      setScrollMode={setScrollMode}
            />
      )}

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {scrollMode && (
        <div className="flex justify-center my-12">
        <button 
          className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white text-center py-3 px-16 rounded shadow-lg transition-all"
          onClick={goToNextChapter}
        >
          Next Chapter
        </button>
      </div>
      
      )}
  </div>
  );
}

export default MangaReader;
