import Header from "./components/Header/Header"
import SearchSection from "./components/Header/SearchSection"


function App() {

  return (
   <div className="bg-[#F4F4F5] pt-2.5 h-screen" style={{fontFamily:"Inter" }}>
    <Header/>
    <SearchSection/>
   </div>
  )
}

export default App
