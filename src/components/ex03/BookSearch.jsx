import React, { useRef } from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import Book from './Book';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);
    const [end, setEnd] = useState(false);
    const [query, setQuery] = useState("노드");
    const ref_txt =useRef(null);

    const getBooks = async() => {
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=5&page=${page}`;
        const config = {
            headers: {
                "Authorization": "KakaoAK 101f7a17f872e02b2ae8da8a87b16c1c"
            }
        }
        setLoading(true);
        const res = await axios.get(url, config);
        //console.log(res);
        setLast(Math.ceil(res.data.meta.pageable_count/5)); //마지막페이지
        setBooks(res.data.documents);
        setEnd(res.data.meta.is_end); //마지막페이지이면 True
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [page]);

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getBooks();
        ref_txt.current.focus();
    }

    return (
        <div>
            <h1 className='text-center mb-5'>도서검색</h1>
            <Row>
                <Col>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control ref={ref_txt} value={query} onChange={onChange}/>
                            <Button type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <td>이미지</td>
                        <td>제목</td>
                        <td>가격</td>
                        <td>저자</td>
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        <div>로딩중 입니다...</div>
                        :
                        books.map(book => <Book key={book.isbn} book={book} />)
                    }
                </tbody>
            </Table>
            {(last > 1 && !loading) &&
                <div className='text-center'>
                    <Button onClick={()=>setPage(page-1)} disabled={page===1} variant='success'>이전</Button>
                    <span className='mx-3'>{page}/{last}</span>
                    <Button onClick={()=>setPage(page+1)} disabled={end} variant='success'>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch;