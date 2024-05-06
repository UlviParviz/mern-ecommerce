import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
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
    };

    return (
        <form onSubmit={submitHandler} className='flex justify-between items-center border-2 rounded-lg  '>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search'
                type="text"
                className='py-2 font-bold border-none rounded-md outline-amber-50 focus:outline-0 w-[100%]'
            />
        </form>
    );
};

export default Search;
