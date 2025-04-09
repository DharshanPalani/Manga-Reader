import { useNavigate } from "react-router-dom";

function useChapterNavigation(chapters, currentChapter) {
  const navigate = useNavigate();
  const currentIndex = chapters.indexOf(currentChapter);

  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  // Navigate to previous chapter if available
  const goToPrevChapter = () => {
    if (prevChapter) navigate(`/chapter/${prevChapter}`);
  };

  // Navigate to next chapter and update localStorage progress
  const goToNextChapter = () => {
    const currentNumber = parseInt(currentChapter.replace(/[^\d]/g, ""));
    const highestRead = parseInt(localStorage.getItem("highestRead")) || 0;

    if (currentNumber > highestRead) {
      localStorage.setItem("highestRead", currentNumber);
    }

    if (nextChapter) navigate(`/chapter/${nextChapter}`);
  };

  return {
    currentIndex,
    prevChapter,
    nextChapter,
    goToPrevChapter,
    goToNextChapter,
  };
}

export default useChapterNavigation;
