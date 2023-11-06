import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Table, Alert} from 'react-bootstrap'

const OrderModal = ({ purchase, sum }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [list, setList] = useState([]);

    const getOrder = async () => {
        const res = await axios("/orders/list/order.json?pid=" + purchase.pid);
        //console.log(res.data);
        setList(res.data);
    }

    useEffect(() => {
        getOrder();
    }, [])
    return (
        <>
            <Button variant="light" onClick={handleShow}>
                주문상품
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>주문 상품</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>받는이 : {purchase.rname} ({purchase.str_status})</div>
                        <div>배송지 : {purchase.raddress1} {purchase.raddress2}</div>
                        <div>전화번호 : {purchase.rphone}</div>
                        <hr/>
                        <Table hover striped bordered variant='dark'>
                            <thead>
                                <tr>
                                    <th>표지</th>
                                    <th>상품번호</th>
                                    <th>제목</th>
                                    <th>수량</th>
                                    <th>가격</th>
                                    <th>합계</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(book=>
                                    <tr key={book.bid}>
                                        <td><img src={book.image || "http://via.placeholder.com/100x100"} width="30%" /></td>
                                        <td>{book.bid}번</td>
                                        <td>{book.title}</td>
                                        <td>{book.qnt}개</td>
                                        <td>{book.fmtprice}원</td>
                                        <td>{book.fmtsum}원</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <Alert className='text-end'>
                            총 합계 : {sum}원
                        </Alert>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrderModal