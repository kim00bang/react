import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from 'react-js-pagination';
import '../Pagination.css';
import OrderModal from './OrderModal';

const OrderList = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const size = 3;

    const getPurchase = async () => {
        setLoading(true);
        const res = await axios(`/orders/list/purchase.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getPurchase();
    }, [location]);

    const onChangePage = (page) => {
        navi(`/orders/list?page=${page}`);
    }

    if (loading) return <div className='my-5 text-center'><Spinner variant='dark' /></div>
    return (
        <div className=' my-5'>
            <h1>주문목록</h1>
            <Table variant="dark" hover striped bordered>
                <thead className='text-center'>
                    <tr>
                        <th>주문번호</th>
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
                            <td>{p.fmtdate}</td>
                            <td>{p.rphone}</td>
                            <td>{p.raddress1} {p.raddress2}</td>
                            <td className='text-end'>{p.fmtsum}원</td>
                            <td>{p.str_status}</td>
                            <td><OrderModal purchase={p} sum={p.fmtsum}/></td>
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

export default OrderList