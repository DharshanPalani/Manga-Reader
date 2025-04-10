function ProgressBar({ progress }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-1 z-20">
      <div className="w-full h-full">
        {/* Filled portion of the progress bar */}
        <div
          className="fixed top-0 left-0 h-full bg-orange-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
