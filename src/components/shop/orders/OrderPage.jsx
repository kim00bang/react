import React, { useState } from 'react'
import { Table, Row, Col, Spinner, Button } from 'react-bootstrap'

const OrderPage = ({ books }) => {
    return (
        <div className='my-5'>
            <h1 className='text-center'>주문하기</h1>
            <Table hover striped bordered variant='dark'>
                <thead className='text-center'>
                    <tr>
                        <th>표지</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                    </tr>
                </thead>

                <tbody className='text-center'>
                    {books.map(book => book.checked &&
                        <tr key={book.cid}>
                            <td><img src={book.image || "http://via.placeholde.com"} width={100} /></td>
                            <td>[{book.bid}] {book.title}</td>
                            <td>{book.fmtprice}원</td>
                            <td>{book.qnt}권</td>
                            <td>{book.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>

    )
}

export default OrderPage