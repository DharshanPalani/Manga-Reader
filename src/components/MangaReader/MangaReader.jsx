import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useChapters from "../../hooks/useChapters";
import useChapterPages from "../../hooks/useChapterPages";
import useChapterNavigation from "../../hooks/useChapterNavigation";
import ChapterImage from "./ChapterImage";
import NavigationZones from "./NavigationZones";
import MenuPanel from "./MenuPanel";
import ProgressBar from "./ProgressBar";

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

  useEffect(() => {
    setPageIndex(0); // Reset to first page on chapter change
  }, [chapter]);

  useEffect(() => {
    if (pages.length > 0) {
      setProgress(((pageIndex + 1) / pages.length) * 100);
    }
  }, [pageIndex, pages]);

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
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <ChapterImage chapter={chapter} page={pages[pageIndex]} total={pages.length} />
      <NavigationZones
        goPrevPage={goPrevPage}
        toggleMenu={() => setMenuOpen(!menuOpen)}
        goNextPage={goNextPage}
      />
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
        />
      )}
      <ProgressBar progress={progress} />
    </div>
  );
}

export default MangaReader;
