import { Link } from "react-router-dom";

function MenuPanel({
  chapter,
  chapters,
  pageIndex,
  pages,
  prevChapter,
  nextChapter,
  goToPrevChapter,
  goToNextChapter,
  setMenuOpen,
  navigate,
  scrollMode,
  setScrollMode
}) {
  return (
    <div className="fixed top-0 right-0 h-full w-[280px] bg-zinc-900 text-white p-4 shadow-xl z-30 overflow-y-auto">
      <Link to="/" className="text-orange-400 text-lg font-bold block mb-4">
        ⟵ Back
      </Link>

      <p className="mb-2">{chapter.replace("_", " ")}</p>
      <p className="mb-2">Page: {pageIndex + 1} / {pages.length}</p>

      {/* Prev/Next chapter navigation */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={goToPrevChapter}
          disabled={!prevChapter}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={goToNextChapter}
          disabled={!nextChapter}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Chapter selector dropdown */}
      <select
        className="mt-4 w-full bg-[#292929] text-white p-2 rounded border border-orange-500"
        value={chapter}
        onChange={(e) => navigate(`/chapter/${e.target.value}`)}
      >
        {chapters.map((chap, i) => (
          <option key={i} value={chap}>
            {i + 1}
          </option>
        ))}
      </select>


      {/* Mode change between pagination and scroll */}
      <button
        className="mt-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded w-full"
        onClick={() => setScrollMode((prev) => !prev)}
      >
        {scrollMode ? "Switch to Paginated View" : "Switch to Scroll View"}
      </button>


      <button
        className="mt-6 bg-white text-black px-4 py-2 rounded w-full"
        onClick={() => setMenuOpen(false)}
      >
        Close Menu
      </button>
    </div>
  );
}

export default MenuPanel;
