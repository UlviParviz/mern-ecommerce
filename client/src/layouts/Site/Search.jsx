import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWindowClose, FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
const Search = ({ onSearchComplete }) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword?.trim()) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate(`/`);
        }

        setKeyword("");
        onSearchComplete();
    };

    return (
        <form onSubmit={submitHandler} className='flex justify-between items-center border-2 rounded-lg z-50 w-full h-[35px]'>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search'
                type="text"
                className='font-bold border-none rounded-sm outline-amber-50 focus:outline-0 w-full h-full'
            />
                <button class="before:ease relative px-2 h-full overflow-hidden shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180">
      <span class="relative z-10 "><FaSearch/></span>
    </button>
            <button
                type="button"
                onClick={onSearchComplete}
                className='p-2 text-xl  hover:bg-black hover:text-white flex justify-center items-center  bg-white text-black h-full md:hidden '
            >
                <MdClose/>
            </button>
        </form>
    );
};

export default Search;
