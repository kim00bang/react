import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import BookSearch from './Books/BookSearch'
import BookList from './Books/BookList'
import LoginPage from './users/LoginPage'
import MyPage from './users/MyPage'
import UpdatePage from './users/UpdatePage'
import BookRead from './Books/BookRead'
import BookUpdate from './Books/BookUpdate'

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/books/search' element={<BookSearch />} />
            <Route path='/books/list' element={<BookList />} />
            <Route path='/books/read/:bid' element={<BookRead />} />
            <Route path='/books/update/:bid' element={<BookUpdate/>}/>
            <Route path='/users/login' element={<LoginPage />} />
            <Route path='/users/mypage' element={<MyPage />} />
            <Route path='/users/update' element={<UpdatePage />} />
        </Routes>
    )
}

export default RouterPage