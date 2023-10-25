import React from 'react'
import { NavLink,Routes, Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import LocalSearch from './LocalSearch'

const RouterPage = () => {
    return (
        <div>
            <div>
                <NavLink to="/book">도서검색</NavLink>
                <NavLink to="/local?page=1&query=카카오프렌즈" className="mx-3">지역검색</NavLink>
            </div>
            <hr/>
            <Routes>
                <Route path='/book' element={<BookSearch/>}/>
                <Route path='/local' element={<LocalSearch/>}/>
            </Routes>
        </div>
    )    
}

export default RouterPage;