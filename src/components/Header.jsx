import React from "react";
import { useSelector } from 'react-redux';
import { selectTaskCounts } from '../store/slices/tasksSlice';
import { selectTheme } from '../store/slices/uiSlice';
import DarkModeToggle from '../utils/DarkModeToggle';

const Header = () => {
  const { allCount, activeCount, completedCount } = useSelector(selectTaskCounts);
  const theme = useSelector(selectTheme);
  
  return (
    <div className={`rounded-xl px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full max-w-6xl mx-auto ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-lg mb-4 transition-colors duration-300`}>
      <div className="flex justify-between items-center">
        <ul className={`flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 font-bold ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        } flex-1`}>
          <li className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded">
              ALL:
            </span>
            <span className="text-lg">{allCount}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded">
              ACTIVE:
            </span>
            <span className="text-lg">{activeCount}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded">
              COMPLETED:
            </span>
            <span className="text-lg">{completedCount}</span>
          </li>
        </ul>
        <div className="ml-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;