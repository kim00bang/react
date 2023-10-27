import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Row, Col, Button, Container, Spinner, InputGroup, Form } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Pagination.css';

const BookList = () => {
    const size = 10;
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const navi = useNavigate();
    const path = location.pathname;
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    //console.log(path, query, page, size);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const getBooks = async () => {
        const url = `/books/list.json?query=${query}&page=${page}&size=10`;
        setLoading(true);
        const res = await axios(url);
        //console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    }

    const onDelete = async (bid) => {
        if(!window.confirm(`${bid}번 도서를 삭제하실래요?`));
        const res = await axios.post('/books/delete', { bid });
        if(res.data ===0){
            alert("삭제 실패");
        }else{
            alert("삭제 성공");
            getBooks();
        }
        
    }

    if (loading) return <div className='text-center'><Spinner variant='danger' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 목록</h1>
            <Container>
                <Row>
                    <Col>
                        <div>검색수 : {total}권</div>
                    </Col>
                    <Col>
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                                <Form.Control className='mb-3' value={query} onChange={(e) => setQuery(e.target.value)} />
                                <Button className='mb-3' variant='dark'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                </Row>
            </Container>
            <Table hover bordered striped variant='dark'>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>이미지</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>등록일</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.bid}>
                            <td>{book.bid}</td>
                            <td><img src={book.image || "http://via.placeholder.com/100x100"} width="30%" /></td>
                            <td><div className='ellipsis'>{book.title}</div></td>
                            <td>{book.fmtprice}원</td>
                            <td><div className='ellipsis'>{book.authors}</div></td>
                            <td>{book.publisher}</td>
                            <td>{book.fmtdate}</td>
                            <td><Button size="sm" onClick={() =>onDelete(book.bid)} variant='light'>삭제</Button></td>
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

export default BookList