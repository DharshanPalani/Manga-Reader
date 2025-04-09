function NavigationZones({ goPrevPage, toggleMenu, goNextPage }) {
  return (
    <>
      {/* Left zone: go to previous page */}
      <div className="absolute top-0 left-0 h-full w-[40%] z-10" onClick={goPrevPage} />

      {/* Center zone: toggle menu */}
      <div className="absolute top-0 left-[40%] h-full w-[20%] z-10" onClick={toggleMenu} />

      {/* Right zone: go to next page */}
      <div className="absolute top-0 right-0 h-full w-[40%] z-10" onClick={goNextPage} />
    </>
  );
}

export default NavigationZones;
