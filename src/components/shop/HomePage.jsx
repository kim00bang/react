import axios from 'axios';
import React, { useEffect } from 'react'

const HomePage = () => {

    const getBooks = async() => {
        const url=`/books/list.json?query=&page=1&size=5`;
        const res= await axios(url);
        console.log(res.data);
    }

    useEffect(()=>{
        getBooks();
    },[]);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>홈페이지</h1>
        </div>
    )
}

export default HomePage