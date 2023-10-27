import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import BookSearch from './Books/BookSearch'
import BookList from './Books/BookList'

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/books/search' element={<BookSearch/>}/>
            <Route path='/books/list' element={<BookList/>}/>
        </Routes>
    )
}

export default RouterPage