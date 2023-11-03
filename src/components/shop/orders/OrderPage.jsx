import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Alert } from 'react-bootstrap'
const OrderPage = ({ books }) => {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);//주문할 전체 상품 갯수
    const [sum, setSum] = useState(0); //주문할 상품 합계

    useEffect(() => {
        const list = books.filter(book => book.checked);
        setOrders(list);
        //console.log(list);
        let sum = 0;
        let total = 0;
        list.forEach(book => {
            sum += book.sum;
            total += book.qnt;
        });
        setSum(sum);
        setTotal(total);
    }, []);

    return (
        <div className='my-5'>
            <h1 className='text-center'>주문하기</h1>
            <Table hover bordered striped variant='dark'>
                <thead>
                    <tr className='text-center'>
                        <th>제목</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(book =>
                        <tr key={book.cid}>
                            <td className='text-center ellipsis'>[{book.bid}] {book.title}</td>
                            <td className='text-end'>{book.fmtprice}원</td>
                            <td className='text-end'>{book.qnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개</td>
                            <td className='text-end'>{book.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert>
                <Row>
                    <Col>총 주문수량 : {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}권</Col>
                    <Col className='text-end'>총 주문가격 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                </Row>
            </Alert>
        </div>

    )
}

export default OrderPage