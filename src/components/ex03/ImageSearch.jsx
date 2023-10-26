import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import ImageModal from './ImageModal';

const ImageSearch = () => {
    const [box, setBox] = useState({
        show: false,
        url: ''
    });
    const [cnt, setCnt] = useState(0);
    const navigator = useNavigate();
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = parseInt(search.get("page") ? search.get("page") : 1);
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "춘식이");
    //console.log(page, query);


    const getImages = async () => {
        const url = `https://dapi.kakao.com/v2/search/image?page=${page}&query=${query}&size=12`;
        const config = {
            headers: {
                "Authorization": "KakaoAK 101f7a17f872e02b2ae8da8a87b16c1c"
            }
        }
        setLoading(true);
        const res = await axios.get(url, config);
        let data = res.data.documents;
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        data=data.map(img=>img && {...img, checked:false});
        setImages(data);
        setLoading(false);
    }

    useEffect(() => {
        getImages();
    }, [location]);

    useEffect(()=>{
        let cnt=0;
        images.forEach(img=>img.checked && cnt++);
        setCnt(cnt);
    },[images])

    const onChangeAll = (e) =>{
        const data=images.map(img=>img && {...img, checked:e.target.checked})
        setImages(data);
    }
    
    const onChangeSingle = (e,url) =>{
        const data=images.map(img=>img.thumbnail_url ===url ? {...img, checked:e.target.checked} : img);
        setImages(data);
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        if(query==""){
            alert("검색어를 입력하세요!");
        } else {
            navigator(`/image?query=${query}&page=1`);
        }
    }
    return (
        <>
            <div className='my-5'>
                <h1 className='text-center'>이미지 검색</h1>
                {loading ?
                    <div>로딩중....</div>
                    :
                    <>
                        <Row>
                            <Col><input checked={images.length===cnt} type='checkbox' onChange={onChangeAll} /></Col>
                            <Col className='mb-3'>검색수 : {total}건</Col>
                            <Col>
                                <form onSubmit={onSubmit}>
                                    <InputGroup>
                                        <Form.Control onChange={(e)=>setQuery(e.target.value)} value={query} />
                                        <Button  type='submit' variant='success'>검색</Button>
                                    </InputGroup>
                                </form>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            {images.map(img =>
                                <Col lg={2} md={3} sm={4} key={img.thumbnail_url} className='mb-3'>
                                    <Card className='p-1'>
                                        <input type='checkbox' checked={img.checked} onChange={(e)=>onChangeSingle(e, img.thumbnail_url)}/>
                                        <img onClick={() => setBox({ url: img.image_url, show: true })}
                                            style={{ cursor: 'pointer' }} src={img.thumbnail_url} width="100%" />
                                    </Card>
                                </Col>
                            )}
                        </Row>
                        <div>
                            <Button onClick={() => navigator(`/image?query=${query}&page=${page - 1}`)} disabled={page === 1} variant='success'>이전</Button>
                            <span className='mx-3'>{page}/{Math.ceil(total / 12)}</span>
                            <Button onClick={() => navigator(`/image?query=${query}&page=${page + 1}`)} disabled={end} variant='success'>다음</Button>
                        </div>
                        <ImageModal box={box} setBox={setBox} />
                    </>
                }
            </div>
        </>
    );
}
export default ImageSearch