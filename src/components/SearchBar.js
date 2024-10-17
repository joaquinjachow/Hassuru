import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { debounce } from 'lodash';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = debounce((query) => {
    if (query.trim()) {
      onSearch(query);
    } else {
      onSearch('');
    }
  }, 300);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar"
          className={`border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 absolute ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
          style={{ right: '100%' }}
        />
        <button 
          type="button" 
          className="focus:outline-none ml-2" 
          onClick={toggleSearchBar}
        >
          <FaSearch className="text-gray-600" size={20} />
        </button>
      </form>
    </div>
  );
}
