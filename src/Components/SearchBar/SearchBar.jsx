import React from "react";

const SearchBar = ({ onChange }) => {
  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(event) => onChange(event.target.value)} />
    </div>
  );
};

export default SearchBar;
