import Header from "./components/Header"
import SearchSection from "./components/SearchSection"
import TaskManager from "./components/TaskManager"


function App() {

  return (
   <div className="bg-[#F4F4F5] pt-2.5 h-screen" style={{fontFamily:"Inter" }}>
    <Header/>
    <SearchSection/>
    <TaskManager/>
   </div>
  )
}

export default App
