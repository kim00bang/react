import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Spinner, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';
import LocalModal from '../ex03/LocalModal';

const LocalSearch = () => {
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const navigator = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    let page = parseInt(search.get("page"));
    //let query = search.get("query");
    const [query, setQuery] = useState(search.get("query"))
    const getLocal = async () => {
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=5&page=${page}`;
        const config = {
            headers: {
                "Authorization": "KakaoAK 101f7a17f872e02b2ae8da8a87b16c1c"
            }
        }
        setLoading(true);
        const res = await axios.get(url, config);
        setLocals(res.data.documents);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigator(`/local?page=1&query=${query}`);
    }
    useEffect(() => {
        getLocal();
    }, [location]);

    return (
        <div className='my-5'>
            <h1 className='text-center my-5'>지역검색</h1>
            {loading ?
                <div>
                    <h1>로딩중 입니다...</h1>
                    <Spinner variant='success' />
                </div>
                :
                <>
                    <div>
                        <Row>
                            <Col>
                                <form onSubmit={onSubmit}>
                                    <InputGroup>
                                        <Form.Control onChange={(e) => setQuery(e.target.value)} value={query} />
                                        <Button variant="success" type='submit'>검색</Button>
                                    </InputGroup>
                                </form>
                            </Col>
                            <Col>
                                검색수:{total}
                            </Col>
                        </Row>
                    </div>
                    <Table>
                        <thead>
                            <td>지역명</td>
                            <td>주소</td>
                            <td>전화번호</td>
                            <td>지역정보</td>
                        </thead>
                        <tbody>
                            {locals.map(local =>
                                <tr key={local.id}>
                                    <td>{local.place_name}</td>
                                    <td>{local.address_name}</td>
                                    <td>{local.phone}</td>
                                    <td><LocalModal local={local} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div>
                        <Button onClick={() => navigator(`/local?page=${page - 1}&query=${query}`)}
                            variant="success" disabled={page === 1}>이전</Button>
                        <span className='mx-3'>{page}/{Math.ceil(total / 5)}</span>
                        <Button onClick={() => navigator(`/local?page=${page + 1}&query=${query}`)}
                            variant="success" disabled={end}>다음</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default LocalSearch;