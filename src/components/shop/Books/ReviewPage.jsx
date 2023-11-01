import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import '../Pagination.css';
const ReviewPage = ({ location, setBook, book }) => {
    const [contents, setContents] = useState("");
    const [reviews, setReviews] = useState([]);
    const { bid } = useParams();
    const [page, setPage] = useState(1);
    const size = 5;
    const [total, setTotal] = useState(0);

    const getReviews = async () => {
        const url = `/review/list.json?page=${page}&size=${size}&bid=${bid}`;
        const res = await axios(url);
        let list = res.data.list
        list = list.map(r => r && { ...r, ellipsis: true, edit: false, text: r.contents });
        setReviews(list);
        setTotal(res.data.total);
        setBook({ ...book, rcnt: res.data.total })
    }
    const onClickWrite = () => {
        sessionStorage.setItem("target", location.pathname);
        window.location.href = "/users/login";
    }

    useEffect(() => {
        getReviews();
    }, [page])

    const onChangePage = (page) => {
        setPage(page);
    }

    const onChangeEllipsis = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, ellipsis: !r.ellipsis } : r);
        setReviews(list);
    }

    const onClickRegister = async () => {
        if (contents === "") {
            alert("리뷰 내용을 입력하세요");
        } else {
            const res = await axios.post('/review/insert', {
                uid: sessionStorage.getItem("uid"),
                bid,
                contents
            });
            if (res.data === 1) {
                getReviews();
                setContents('');
            }
        }
    }

    const onClickDelete = async (rid) => {
        if (window.confirm(`${rid}번 리뷰를 삭제하시겠습니까?`)) {
            const res = await axios.post('/review/delete', { rid })
            if (res.data === 1) {
                getReviews();
            }
        }
    }

    const onClickUpdate = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, edit: true } : r);
        setReviews(list);
    }

    const onClickCancel = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, edit: false, text: r.contents } : r);
        setReviews(list);
    }

    const onChangeContents = (rid, e) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, text: e.target.value } : r);
        setReviews(list);
    }

    const onClickSave = async(rid, text, contents) =>{
        if(text === contents) return;
        if(window.confirm("수정 하시겠습니까?")){
            const res=await axios.post('/review/update',{rid, contents:text});
            if(res.data===1){
                getReviews();
            }
        }

    }
    return (
        <div>
            {!sessionStorage.getItem("uid") ?
                <div><Button variant='success' onClick={onClickWrite} className='w-100'>리뷰작성</Button></div>
                :
                <div>
                    <Form.Control value={contents} onChange={(e) => setContents(e.target.value)} as="textarea" rows={5} placeholder='내용을 입력하세요.' />
                    <div className='text-end mt-2'><Button className='px-5' onClick={onClickRegister} variant='success'>등록</Button></div>
                </div>
            }
            {reviews.map(review =>
                <div>
                    <Card className=' mt-2'>
                        <Row key={review.rid}>
                            <Col xs={2} lg={1}>
                                <img src={review.photo || "http://via.placeholder.com/170x250"} className='photo mt-2 ms-2' width="90%" />
                                <div className='small text-center'>{review.uname}</div>
                            </Col>
                            <Col>
                                <div className='small mt-2'>{review.fmtdate}</div>
                                <hr />
                                {!review.edit ?
                                    <>
                                        <div onClick={() => onChangeEllipsis(review.rid)} style={{ cursor: "pointer" }}
                                            className={review.ellipsis && 'ellipsis2'}>{review.rid}{review.contents}</div>
                                        {sessionStorage.getItem("uid") === review.uid &&
                                            <div className='text-end mt-2'>
                                                <Button onClick={() => onClickDelete(review.rid)} variant='success' size='sm me-2 mb-2'>삭제</Button>
                                                <Button onClick={() => onClickUpdate(review.rid)} variant='success' size='sm mb-2 mx-2'>수정</Button>
                                            </div>
                                        }
                                    </>
                                    :
                                    <>
                                        <Form.Control onChange={(e) => onChangeContents(review.rid, e)} 
                                        value={review.text} rows={5} as="textarea" />
                                        <div className='text-end mt-2 mb-2'>
                                            <Button onClick={()=>onClickSave(review.rid, review.text, review.contents)} size='sm mx-2' variant='success'>저장</Button>
                                            <Button onClick={() => onClickCancel(review.rid)} size='sm me-2' variant='success'>취소</Button>
                                        </div>
                                    </>
                                }
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}
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

export default ReviewPage