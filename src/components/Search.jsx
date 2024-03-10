import React, { useEffect, useRef, useState } from "react";
import { useKeys } from "../hooks/useKeys";

function Search({ query, setQuery }) {
  // How not to select elements in React
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  // Instead we use useRef hook
  // Step 1 : initialise useRef as null
  const inputEl = useRef(null);

  useKeys("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      // Step 2 : assign ref prop to the inputEl
      ref={inputEl}
    />
  );
}

export default Search;
