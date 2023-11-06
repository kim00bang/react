import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderModal from './OrderModal';
import Pagination from 'react-js-pagination';
import '../Pagination.css';

const OrderAdmin = () => {
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const size = 5;
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState('');
    const navi = useNavigate();

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/orders/list.json?page=${page}&query=${query}&size=${size}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, [location])

    const onChangePage = () => {
        navi(`/orders/admin?page=${page}&size=${size}&query=${query}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/orders/admin?page=1&size=${size}&query=${query}`);
    }
    if (loading) return <div className='my-5 text-center'><Spinner variant='success' /></div>
    return (
        <div className='my-5'>
            <h1 className='mb-5'>주문 관리</h1>
            <Row>
                <Col lg={4}>
                    <form onClick={onSubmit}>
                        <InputGroup className='mb-2'>
                            <Form.Control onChange={(e) => setQuery(e.target.value)} placeholder='주문자,주소,전화번호' value={query} />
                            <Button type='submit' variant='dark'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='mt-2'>
                    검색수 : {total}건
                </Col>
            </Row>
            <Table variant="dark" hover striped bordered>
                <thead className='text-center'>
                    <tr>
                        <th>주문번호</th>
                        <th>아이디</th>
                        <th>주문자</th>
                        <th>주문일</th>
                        <th>전화번호</th>
                        <th>배송지</th>
                        <th>금액</th>
                        <th>주문상태</th>
                        <th>주문상품</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {list.map(p =>
                        <tr key={p.pid}>
                            <td>{p.pid}번</td>
                            <td>{p.uid}</td>
                            <td>{p.rname}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.rphone}</td>
                            <td>{p.raddress1} {p.raddress2}</td>
                            <td className='text-end'>{p.fmtsum}원</td>
                            <td>{p.str_result}</td>
                            <td><OrderModal purchase={p} sum={p.fmtsum} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
        </div>
    )
}

export default OrderAdmin