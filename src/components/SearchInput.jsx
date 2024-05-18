import React, { useRef } from 'react';

const SearchInput = ({ query, handleChange, handleSubmit, results, showDropdown, handleSelect }) => {
  const dropdownRef = useRef(null);

  return (
    <div className="search-container" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Enter city name or search locations..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {showDropdown && (
        <div className="dropdown">
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => handleSelect(result)}
                className="dropdown-item"
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;