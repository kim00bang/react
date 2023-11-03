import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { BsHeartbreakFill, BsHeart, BsFillEnvelopeFill } from "react-icons/bs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReviewPage from './ReviewPage';
import { BoxContext } from '../BoxContext';

const BookInfo = () => {
    const { setBox } = useContext(BoxContext);
    const { bid } = useParams();
    const [book, setBook] = useState('');
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const location = useLocation();
    //console.log('....',bid);

    const getBook = async () => {
        setLoading(true);
        const res = await axios(`/books/read/${bid}?uid=${sessionStorage.getItem("uid")}`);
        //console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    const onClickHeart = async (bid) => {
        if (sessionStorage.getItem("uid")) {
            await axios.post('/books/insert/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
            getBook();
        } else {
            sessionStorage.setItem("target", location.pathname);
            navi(`/users/login`);
        }
    }
    const onClickFillHeart = async (bid) => {
        await axios.post('/books/delete/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
        getBook();
    }

    const onClickCart = async () => {
        const res = await axios.post('/cart/insert', { bid, uid: sessionStorage.getItem("uid") });
        setBox({
            show: true,
            message: res.data === 0 ? '장바구니에 등록 되었습니다\n쇼핑을 계속 하시겠습니까?'
                : '이미 장바구니에 존재합니다.\n쇼핑을 계속 하시겠습니까?',
            action: () => {
                window.location.href = "/";
            }
        })
    }

    useEffect(() => {
        getBook();
    }, [])

    if (loading) return <div className='text-center'><Spinner variant='dark' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-3'>
                        <Row>
                            <Col className='px-3'>
                                <img src={book.image} width="90%" />
                            </Col>
                            <Col>
                                <h3 className='ellipsis mt-2'>{book.title}</h3>
                                <hr />
                                <div className=' mb-2'>저자 : {book.authors}</div>
                                <div className=' mb-2'>출판사 : {book.publisher}</div>
                                <div className=' mb-2'>가격 : {book.fmtprice}원</div>
                                <div className=' mb-2'>등록일 : {book.fmtdate}</div>
                                {sessionStorage.getItem("uid") &&
                                    <div>
                                        <Button onClick={onClickCart} size='sm' variant='success'>장바구니</Button>
                                        <Button className='ms-2' size='sm' variant='success'>바로 구매</Button>
                                    </div>
                                }
                                <span>
                                    <span className='ms-3'>{book.ucnt === 0 ?
                                        <BsHeart className='rs' onClick={() => onClickHeart(book.bid)} />
                                        :
                                        <BsHeartbreakFill className='rs' onClick={() => onClickFillHeart(book.bid)} />}</span>
                                    <span className='ms-1'>{book.fcnt}</span>
                                </span>
                                <span>
                                    {book.rcnt === 0 ||
                                        <span className='ms-2'>
                                            <span><BsFillEnvelopeFill className='r' /></span>
                                            <span className='ms-1'>{book.rcnt}</span>
                                        </span>
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Card>
                    <Tabs
                        defaultActiveKey="review"
                        id="uncontrolled-tab-example"
                        className="mb-3 mt-3">
                        <Tab eventKey="contents" title="내용">
                            <div>{book.contents}</div>
                        </Tab>
                        <Tab eventKey="review" title="리뷰">
                            <ReviewPage location={location} setBook={setBook} book={book} />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div>
    )
}

export default BookInfo