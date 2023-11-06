import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table, Row, Col, Alert, InputGroup, Card, Form, Button, Spinner } from 'react-bootstrap'
import ModalPostCode from '../users/ModalPostCode';
import { BoxContext } from '../BoxContext';
const OrderPage = ({ books }) => {
    const [loading, setLoading] = useState(false);
    const { setBox } = useContext(BoxContext);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);//주문할 전체 상품 갯수
    const [sum, setSum] = useState(0); //주문할 상품 합계
    const [user, setUser] = useState({
        uid: '',
        uname: "",
        phone: "",
        address1: "",
        address2: ""
    });
    const { uid, uname, phone, address1, address2 } = user;
    const getUser = async () => {
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        //console.log(res.data);
        setUser(res.data);
    }
    useEffect(() => {
        const list = books.filter(book => book.checked);
        setOrders(list);
        //console.log(list);
        let sum = 0;
        let total = 0;
        list.forEach(book => {
            sum += book.sum;
            total += book.qnt;
        });
        setSum(sum);
        setTotal(total);
        getUser();
    }, []);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onOrder = () => {
        setBox({
            show: true,
            message: "주문하시겠습니까?",
            action: async () => {
                setLoading(true);
                const data = { ...user, sum, uid };
                //console.log(data);
                const res = await axios.post('/orders/insert/purchase', data);
                const pid = res.data;
                //console.log(pid);
                //주문 상품 저장
                for (const order of orders) {
                    const data = { ...order, pid };
                    //console.log(data);
                    await axios.post('/orders/insert', data);
                }
                setLoading(false);
                window.location.href="/";
            }
        })
    }
    if(loading) return <div className='my-5 text-center'><Spinner variant='dark'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center'>주문하기</h1>
            <Table hover bordered striped variant='dark'>
                <thead>
                    <tr className='text-center'>
                        <th>제목</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(book =>
                        <tr key={book.cid}>
                            <td className='text-center ellipsis'>[{book.bid}] {book.title}</td>
                            <td className='text-end'>{book.fmtprice}원</td>
                            <td className='text-end'>{book.qnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개</td>
                            <td className='text-end'>{book.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert>
                <Row>
                    <Col>총 주문수량 : {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}권</Col>
                    <Col className='text-end'>총 주문가격 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                </Row>
            </Alert>
            <div>
                <h1 className='text-center'>주문자정보</h1>
                <Card className='p-3'>
                    <form>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>받는 사람</InputGroup.Text>
                            <Form.Control onChange={onChange} value={uname} name='uname' />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>전화번호</InputGroup.Text>
                            <Form.Control onChange={onChange} value={phone} name='phone' />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>주소</InputGroup.Text>
                            <Form.Control onChange={onChange} value={address1} name='address1' />
                            <ModalPostCode user={user} setUser={setUser} />
                        </InputGroup>
                        <Form.Control onChange={onChange} name='address2' value={address2} placeholder='상세주소' />
                    </form>
                </Card>
                <div className='text-center my-3'>
                    <Button onClick={onOrder} className='px-3' variant='dark'>주문하기</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderPage