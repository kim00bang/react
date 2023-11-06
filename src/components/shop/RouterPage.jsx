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
import BookInfo from './Books/BookInfo'
import CartPage from './orders/CartPage'
import OrderList from './orders/OrderList'
import OrderAdmin from './orders/OrderAdmin'

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/books/search' element={<BookSearch />} />
            <Route path='/books/list' element={<BookList />} />
            <Route path='/books/read/:bid' element={<BookRead />} />
            <Route path='/books/update/:bid' element={<BookUpdate />} />
            <Route path='/books/info/:bid' element={<BookInfo />} />
            <Route path='/users/login' element={<LoginPage />} />
            <Route path='/users/mypage' element={<MyPage />} />
            <Route path='/users/update' element={<UpdatePage />} />
            <Route path='/orders/cart' element={<CartPage />} />
            <Route path='/orders/list' element={<OrderList />} />
            <Route path='/orders/admin' element={<OrderAdmin />} />
        </Routes>
    )
}

export default RouterPage