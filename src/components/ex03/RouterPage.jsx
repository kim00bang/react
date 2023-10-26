import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import LocalSearch from './LocalSearch'
import BlogSearch from './BlogSearch'
import ImageSearch from './ImageSearch'

const RouterPage = () => {
    return (
        <div>
            <div>
                <NavLink to="/book">도서검색</NavLink>
                <NavLink to="/local?page=1&query=카카오프렌즈" className="mx-3">지역검색</NavLink>
                <NavLink to="/blog?page=1&query=커피">블로그 검색</NavLink>
                <NavLink to="/image" className="mx-3">이미지 검색</NavLink>
            </div>
            <hr />
            <Routes>
                <Route path='/book' element={<BookSearch />} />
                <Route path='/local' element={<LocalSearch />} />
                <Route path='/blog' element={<BlogSearch/>} />
                <Route path="/image" element={<ImageSearch/>}/>
            </Routes>
        </div>
    )
}

export default RouterPage;