import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchValue,
  selectFilterValue,
  selectTheme,
  setSearchValue,
  setFilterValue,
  clearSearch
} from '../store/slices/uiSlice';
import { CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const SearchSection = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  const filterValue = useSelector(selectFilterValue);
  const theme = useSelector(selectTheme);

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilterValue(e.target.value));
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className={`rounded-xl px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg transition-colors duration-300`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 font-bold">
            {/* Logo */}
            <div className="flex-shrink-0 order-1 md:order-1">
              <img
                src="https://i.ibb.co.com/nqZNwg15/Vista-Sys-Tech-Logo.png"
                className="w-10 sm:w-12 md:w-14"
                alt="VistaSysTechLogo"
              />
            </div>

            {/* Search field */}
            <div className="relative flex items-center w-full md:flex-1 md:mx-4 lg:mx-6 order-3 md:order-2">
              <input
                type="text"
                placeholder="Search Tasks..."
                value={searchValue}
                onChange={handleSearchChange}
                className={`pl-10 pr-10 py-2 md:py-3 w-full ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-[#F8FAFC] border-gray-200'
                } rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
              />
              <button className={`cursor-pointer absolute left-0 px-3 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <CiSearch className="text-xl" />
              </button>
              {searchValue && (
                <button
                  onClick={handleClearSearch}
                  className={`cursor-pointer absolute right-0 px-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <MdOutlineCancel className="text-xl" />
                </button>
              )}
            </div>

            {/* Filter button dropdown */}
            <div className="relative flex items-center w-full md:w-auto order-2 md:order-3">
              <select
                name="filters"
                value={filterValue}
                onChange={handleFilterChange}
                className={`p-2 md:p-3 w-full md:w-auto ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-[#F8FAFC] border-gray-200'
                } rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
              >
                <option value="all">ALL</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SearchSection;