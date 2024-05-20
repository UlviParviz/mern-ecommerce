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
                <button className=" relative px-2 h-full overflow-hidden shadow-2xl bg-transparent text-black ">
      <span class="relative z-10 "><FaSearch/></span>
    </button>
            <button
                type="button"
                onClick={onSearchComplete}
                className='p-2 text-xl   flex justify-center items-center  bg-transparent text-black h-full md:hidden '
            >
                <MdClose/>
            </button>
        </form>
    );
};

export default Search;
