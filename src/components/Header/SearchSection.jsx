import {CiSearch} from "react-icons/ci"
import { MdOutlineCancel } from "react-icons/md";

const SearchSection = () => {
    return (
        <div className="rounded-xl px-10 py-6 w-[85%] m-4 mx-auto bg-white shadow-lg">
        <div className="flex justify-between items-center font-bold">
            <img src="https://i.ibb.co.com/nqZNwg15/Vista-Sys-Tech-Logo.png" className="w-14" alt="VistaSysTechLogo" />
            {/* search field */}
            <div className="relative flex items-center mx-6">
            <input type="text" placeholder="       Search Tasks..."   className="px-5 py-3 bg-[#F8FAFC]"/>
            <button className="cursor-pointer absolute left-0 px-5"><CiSearch /></button>
            <button  className="cursor-pointer absolute right-0 px-5"><MdOutlineCancel/></button>
            </div>
            {/* Filter button dropdown */}
            <div className="relative flex items-center mx-6">
            <select name="filters" className="p-4">
                <option value="all" className="rounded bg-[#F8FAFC]" >ALL</option>
            </select>
           
            </div>
        
         
        </div>

      </div>
    );
};

export default SearchSection;