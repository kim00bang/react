import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { NavLink, useParams, useNavigate } from 'react-router-dom'

const BookUpdate = () => {
    const navi= useNavigate();
    const { bid } = useParams();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState({
        bid: '',
        title: '',
        price: '',
        fmtprice: '',
        authors: '',
        contents: '',
        publisher: '',
        image: '',
        isbn: '',
        regdate: '',
        fmtdate: ''
    });
    const { title, price, fmtprice, authors, contents, publisher, image, isbn, regdate, fmtdate } = book;

    const getBook = async () => {
        setLoading(true);
        const res = await axios.get('/books/read/' + bid);
        //console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    const onChange = (e) =>{
        setBook({
            ...book,
            [e.target.name]:e.target.value
        });
    }

    const onSubmit =async(e)=>{
        e.preventDefault();
        if(window.confirm("수정된 내용을 저장하시겠습니까?")){
            //수정하기
            const res=await axios.post('/books/update', book);
            if(res.data===0){
                alert("수정 실패.");
            } else {
                alert("수정 성공.");
                navi(`/books/read/${bid}`);
            }
        }   
    }
    useEffect(() => {
        getBook();
    }, []);

    if(loading) return <div className='text-center my-5'>로딩중 입니다...<Spinner variant='success'/></div>
    return (
        <div>
            <h1>도서 정보 수정</h1>
            <Row>
                <Col>
                    <Card>
                        <form onSubmit={onSubmit} className='p-2'>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>코드</InputGroup.Text>
                                <Form.Control  name='bid' value={bid} readOnly/>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>제목</InputGroup.Text>
                                <Form.Control onChange={onChange} name='title' value={title}/>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>저자</InputGroup.Text>
                                <Form.Control onChange={onChange} name='authors' value={authors}/>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>가격</InputGroup.Text>
                                <Form.Control onChange={onChange} name='price' value={price}/>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>출판사</InputGroup.Text>
                                <Form.Control onChange={onChange} name="publisher" value={publisher}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>내용</InputGroup.Text>
                                <Form.Control onChange={onChange} name='contents' as="textarea" rows={5}>{contents}</Form.Control>
                            </InputGroup>
                            <div className='text-center my-3'>
                                <Button type='submit' className='me-3' variant='dark'>수정</Button>
                                <Button onClick={()=>getBook()}variant='dark'>취소</Button>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BookUpdate