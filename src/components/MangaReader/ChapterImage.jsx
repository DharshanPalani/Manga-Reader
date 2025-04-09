import React from "react";
import API from "../../utils/apiConfig";

// Renders a manga page image or a fallback message if the page doesn't exist
function ChapterImage({ chapter, page, total }) {
  if (!page) {
    return (
      <div className="text-white text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        No pages to display
      </div>
    );
  }

  return (
    <img
      src={`${API}/manga/${chapter}/${page}`}
      alt={`Page`}
      className="absolute top-1/2 left-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain z-0"
      draggable={false}
    />
  );
}

export default ChapterImage;
