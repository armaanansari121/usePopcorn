import React, { useState } from 'react'
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';




function WatchedBox() {
  const [isOpen2, setIsOpen2] = useState(true);


  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>

        </>
      )}
    </div>
  )
}

export default WatchedBox
