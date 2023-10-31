import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Form, Col, Row, Spinner, InputGroup } from 'react-bootstrap'

const BookSearch = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const path = location.pathname;
    const navi = useNavigate();
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "리액트");
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [chcnt, setChcnt] = useState(0);

    const getBooks = async() => {
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=5&page=${page}`;
        const config = {
            headers: {
                "Authorization": "KakaoAK 101f7a17f872e02b2ae8da8a87b16c1c"
            }
        }
        setLoading(true);
        const res = await axios(url, config);
        //console.log(res.data);
        let docs=res.data.documents;
        docs= docs.map(doc=>doc && {...doc, checked:false});
        setBooks(docs);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    useEffect(()=> {   
        let cnt =0;
        books.forEach(book=>book.checked && cnt++);
        setChcnt(cnt);
    }, [books]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (query == "") {
            alert("검색어를 입력하세요.")
        } else {
            navi(`${path}?query=${query}&page=1`)
        }
    }

    const onInsert = async (book) => {
        if (window.confirm("새로운 도서를 등록하실래요?")) {
            //console.log(book);
            const url = "/books/insert";
            const res = await axios.post(url, {...book, authors:book.authors.join()});
            //console.log(res.data);
            if(res.data==0){
                alert("도서가 등록 되었습니다");
            } else{
                alert("이미 등록된 도서입니다");
            }
        }
    }

    const onChangeAll =(e) =>{
        const docs=books.map(book=>book && {...book, checked:e.target.checked});
        setBooks(docs);
    }

    const onChangeSingle =(e, isbn)=>{
        const docs=books.map(book=>book.isbn===isbn ? {...book, checked:e.target.checked} : book);
        setBooks(docs);
    }

    const onClickSave = async() =>{
        if(chcnt===0){
            alert("저장할 도서를 선택하세요");
        }else{
            if(window.confirm(`${chcnt}권 도서를 저장하실래요?`)){
                let count=0;
                for(const book of books){
                    if(book.checked){
                        const url='books/insert'
                        const res= await axios.post(url,{...book, authors:book.authors.join()});
                        if(res.data===0) count++;
                    }
                };
                alert(`${count}권 저장되었습니다.`);
                setBooks(books.map(book=>book && {...book, checked:false}));
            }
        }
    }
    if (loading) return <div className='text-center'><h1>로딩중 입니다..</h1><Spinner variant='dark' /></div>
    return (
        <div>
            <h1>도서 검색</h1>
            <Row>
                <Col>
                    <Col className='mt-3 mb-3'>검색수 : {total}권</Col>
                    <Col className='text-end'><Button size='sm' onClick={onClickSave}>선택저장</Button></Col>
                </Col>
                <Col md={6}>
                    <form onSubmit={onSubmit} >
                        <InputGroup>
                            <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button type='submit' variant='dark'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table hover striped bordered variant='dark'>
                <thead>
                    <tr className='text-center'>
                        <th>이미지</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>저장</th>
                        <th><input type='checkbox' checked={books.length === chcnt} onChange={onChangeAll} /></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {books.map(book =>
                        <tr key={book.isbn}>
                            <img src={book.thumbnail || "http://via.placeholder.com/100x100"} width="100%" />
                            <td>{book.title}</td>
                            <td>{book.price}</td>
                            <td>{book.authors}</td>
                            <td>{book.publisher}</td>
                            <td><Button onClick={() => onInsert(book)} variant='light'>저장</Button></td>
                            <td><input type='checkbox' checked={book.checked} onChange={(e)=>onChangeSingle(e, book.isbn)}/></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > 5 &&
                <div className='text-center'>
                    <Button onClick={() => navi(`${path}?query=${query}&page=${page - 1}`)} disabled={page === 1} variant='dark'>이전</Button>
                    <span className='mx-4'>{page}/{Math.ceil(total / 5)}</span>
                    <Button onClick={() => navi(`${path}?query=${query}&page=${page + 1}`)} disabled={end} variant='dark'>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch