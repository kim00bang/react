import React, { useContext, useEffect, useState } from 'react'
import OrderPage from './OrderPage'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Table, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { BiAccessibility } from "react-icons/bi";
import { GiCook, GiCardJoker, GiCantua, Gi3DGlasses, Gi3DHammer, GiAbstract018, GiAk47U, GiArcher, GiArrowed, GiAnvil, GiCampingTent } from "react-icons/gi";
import { BoxContext } from '../BoxContext';

const CartPage = () => {
    const { setBox } = useContext(BoxContext);
    const location = useLocation();
    //console.log(location);
    const search = new URLSearchParams(location.search);
    const pathname = location.pathname;
    const show = search.get("show") ? search.get("show") : 'cart';
    //console.log(show);
    const navi = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);//체크된 체크박스 갯수

    const onClickOrder = () => {
        if(count===0){
            setBox({
                show:true,
                message:"주문할 상품을 선택하세요."
            });
        }else{
            navi(`${pathname}?show=order`);
        }
        
    }

    const getCart = async () => {
        setLoading(true);
        const res = await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}`);
        let list = res.data.list;
        list = list.map(book => book && { ...book, checked: false });
        //console.log(list);
        setBooks(list);
        let sum1 = 0;
        let total = 0;
        list.forEach(book => {
            sum1 += book.sum;
            total += book.qnt;
        });
        setSum(sum1);
        setTotal(total);
        setLoading(false);
    }

    useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
        let count = 0;
        books.forEach(book => book.checked && count++);
        setCount(count);
    }, [books]);

    const onDelete = (cid) => {
        setBox({
            show: true,
            message: `${cid}번 상품을 삭제 하시겠습니까?`,
            action: async () => {
                await axios.post('/cart/delete', { cid });
                getCart();
            }
        })
    }

    const onChange = (cid, e) => {
        const list = books.map(book => book.cid === cid ? { ...book, qnt: e.target.value } : book);
        setBooks(list);
    }

    const onUpdate = (cid, qnt) => {
        setBox({
            show: true,
            message: `${cid}번 수량을 ${qnt}개로 변경 하시겠습니까?`,
            action: async () => {
                await axios.post("/cart/update", { cid, qnt });
                getCart();
            }
        })
    }

    const onChangeAll = (e) => {
        const list = books.map(book => book && { ...book, checked: e.target.checked });
        setBooks(list);
    }

    const onChangeSingle = (e, cid) => {
        const list = books.map(book => book.cid === cid ? { ...book, checked: e.target.checked } : book);
        setBooks(list);
    }

    const onDeleteChecked = () => {
        if (count === 0) {
            setBox({ show: true, message: "삭제할 상품을 선택하세요!" });
        } else {
            setBox({
                show: true,
                message: `${count}개의 장바구니를 삭제 하시겠습니까?`,
                action: async () => {
                    for (const book of books) {
                        if (book.checked) {
                            await axios.post('/cart/delete', { cid: book.cid });
                        }
                    }
                    getCart();
                }
            })
        }
    }
    if (loading) return <div className='text-center my-5'><Spinner variant='danger'><BiAccessibility /></Spinner></div>
    return (
        <>
            {show === "cart" &&
                <div className='my-5'>
                    <h1 className='text-center mb-5'>장바구니</h1>
                    <div className='text-end'><Button onClick={onDeleteChecked} variant='dark' className='mb-2'>선택상품삭제</Button></div>
                    <Table hover striped bordered variant='dark'>
                        <thead className='text-center'>
                            <tr>
                                <th><GiCardJoker size={30} />
                                    <input checked={books.length === count} onChange={onChangeAll} type='checkbox' />
                                    <GiCardJoker size={30} />
                                </th>
                                <th><Gi3DGlasses size={30} /> 제목 <Gi3DGlasses size={30} /></th>
                                <th><Gi3DHammer size={30} /> 가격 <Gi3DHammer size={30} /></th>
                                <th><GiAbstract018 size={30} /> 수량 <GiAbstract018 size={30} /></th>
                                <th><GiAk47U size={30} /> 합계 <GiAk47U size={30} /></th>
                                <th><GiCook size={30} /> 삭제 <GiCook size={30} /></th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {books.map(book =>
                                <tr key={book.cid}>
                                    <td> <input type='checkbox' onChange={(e) => onChangeSingle(e, book.cid)} checked={book.checked} /></td>
                                    <td><div className='ellipsis'>[{book.bid}] {book.title}</div></td>
                                    <td className='text-end'>{book.fmtprice}원</td>
                                    <td className='text-end'>
                                        <input value={book.qnt} size={2} className='text-end me-1' onChange={(e) => onChange(book.cid, e)} />개
                                        <Button onClick={() => onUpdate(book.cid, book.qnt)} variant='dark'>변경</Button>
                                    </td>
                                    <td className='text-end'>{book.fmtsum}원</td>
                                    <td><GiCampingTent onClick={() => onDelete(book.cid)} size={30} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert>
                        <Row>
                            <Col><GiCantua size={30} /> 전체 : {total}권 <GiCantua size={30} /></Col>
                            <Col className='text-end'><GiAnvil size={30} />합계 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원<GiAnvil size={30} /></Col>
                        </Row>
                    </Alert>
                    <div className='text-center'>
                        {books.length > 0 && 
                        <Button onClick={onClickOrder} variant='dark'><GiArcher size={30} /> 주문하기 <GiArrowed size={30} /></Button> 
                        }
                        <Button variant='dark' className='ms-2'> <GiArcher size={30}/> 쇼핑계속하기 <GiArrowed size={30} /></Button>
                    </div>
                </div>
            }

            {show === "order" &&
                <OrderPage books={books}/>
            }
        </>

    )
}

export default CartPage