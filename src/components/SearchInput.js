import React from 'react';

const SearchInput = ({ onChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
