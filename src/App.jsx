import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, selectTheme } from './store/slices/uiSlice'
import Header from "./components/Header"
import SearchSection from "./components/SearchSection"
import TaskManager from "./components/TaskManager"


function App() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  // Initialize theme from localStorage on app startup
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  return (
   <div className={`${
     theme === 'dark' ? 'bg-gray-900' : 'bg-[#F4F4F5]'
   } pt-2.5 h-screen transition-colors duration-300`} style={{fontFamily:"Inter" }}>
    <Header/>
    <SearchSection/>
    <TaskManager/>
   </div>
  )
}

export default App
