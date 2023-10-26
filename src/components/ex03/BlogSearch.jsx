import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner, Table, Button, InputGroup, Row, Col, Form } from 'react-bootstrap';

const BlogSearch = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [cnt, setCnt] = useState(0);
    const ref_query = useRef(null);

    const navigator = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = parseInt(search.get("page"));
    const [query, setQuery] = useState(search.get("query"));
    //console.log([page,query]);

    const getBlogs = async () => {
        const url = `https://dapi.kakao.com/v2/search/blog?page=${page}&query=${query}&size=5`;
        const config = {
            headers: {
                "Authorization": "KakaoAK 101f7a17f872e02b2ae8da8a87b16c1c"
            }
        }
        setLoading(true);
        const res = await axios(url, config);
        let data = res.data.documents;
        data = data.map(blog => blog && { ...blog, show: false, checked: false });
        setBlogs(data);
        setEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigator(`/blog?page=1&query=${query}`);
        ref_query.current.focus();
    }

    const onClick = (idx) => {
        let data = blogs.map((blog, index) => index === idx ? { ...blog, show: !blog.show } : blog);
        setBlogs(data);
    }

    useEffect(() => {
        getBlogs();
    }, [location]);

    useEffect(()=>{
        let cnt =0;
        blogs.forEach(blog=>blog.checked && cnt++);
        setCnt(cnt)
    },[blogs])

    const onChangeAll = (e) => {
        let data = blogs.map(blog => blog && { ...blog, checked: e.target.checked });
        setBlogs(data);
    }

    const onChangeSingle = (e, url) => {
        let data = blogs.map(blog => blog.url === url ? { ...blog, checked: e.target.checked } : blog);
        setBlogs(data);
    }

    return (
        <div className='my-5'>
            <h1 className='text-center'>블로그 검색</h1>
            {loading ?
                <div>
                    <h1>로딩중...</h1>
                    <Spinner variant='success' />
                </div>
                :
                <>
                    <Row>
                        <Col>
                            <form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control ref={ref_query} className='mb-3' value={query} onChange={(e) => setQuery(e.target.value)} />
                                    <Button className='mb-3' type='submit' variant='success'>검색</Button>
                                </InputGroup>
                            </form>
                        </Col>
                        <Col>
                            검색수 : {total}
                        </Col>
                    </Row>
                    <Table hover striped bordered variant='success'>
                        <thead>
                            <tr>
                                <th><input checked={cnt==blogs.length} type='checkbox' onChange={onChangeAll} /></th>
                                <th>블로그 이름</th>
                                <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, index) =>
                                <tr key={blog.url}>
                                    <td><input onChange={(e)=>onChangeSingle(e,blog.url)} type='checkbox' checked={blog.checked} /></td>
                                    <td><a href={blog.url}>{blog.blogname}</a></td>
                                    <td>
                                        <div onClick={() => onClick(index)} dangerouslySetInnerHTML={{ __html: blog.title }} style={{ cursor: 'pointer', color: 'blue' }}></div>
                                        {blog.show &&
                                            <div dangerouslySetInnerHTML={{ __html: blog.contents }}></div>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div>
                        <Button onClick={() => navigator(`/blog?page=${page - 1}&query=${query}`)} variant='success' disabled={page === 1}>이전</Button>
                        <span className='mx-3'>{page}/{Math.ceil(total / 5)}</span>
                        <Button onClick={() => navigator(`/blog?page=${page + 1}&query=${query}`)} variant='success' disabled={end}>다음</Button>
                    </div>
                </>
            }
        </div>
    );
}

export default BlogSearch;