import React from 'react'
import ChapterImage from './ChapterImage'
import NavigationZones from './NavigationZones'

function PaginationRead({chapter, pages, pageIndex, goPrevPage, goNextPage, menuOpen, setMenuOpen}) {
  return (
  <div className="relative h-screen w-screen overflow-hidden bg-black">
      <ChapterImage chapter={chapter} page={pages[pageIndex]} total={pages.length} />
      <NavigationZones
        goPrevPage={goPrevPage}
        toggleMenu={() => setMenuOpen(!menuOpen)}
        goNextPage={goNextPage}
      />
    </div>  
    )
}

export default PaginationRead