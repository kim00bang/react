import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Col, Row, Form, InputGroup, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const navi=useNavigate();
    const ref_uid = useRef();
    const [form, setForm] = useState({
        uid: "blue",
        upass: "pass"
    })
    const { uid, upass } = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (uid === "") {
            alert("아이디를 입력하세요");
            ref_uid.current.focus();
        } else if (upass === "") {
            alert("비밀번호를 입력하세요");
        } else {
            const res = await axios.post("/users/login", form);
            if(res.data==0){
                alert("아이디가 존재하지 않습니다");
                ref_uid.current.focus();
            }else if(res.data==2){
                alert("비밀번호가 일치하지 않습니다");
            }else{
                sessionStorage.setItem("uid", uid);
                if(sessionStorage.getItem("target")){
                    navi(sessionStorage.getItem("target"))
                }else{
                    navi('/');
                }
            }
        }
    }
    return (
        <div className='my-5'>
            <h1 className='text-center'>로그인</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-3'>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text >아이디</InputGroup.Text>
                                <Form.Control ref={ref_uid} onChange={onChange} name="uid" value={uid} />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>비밀번호</InputGroup.Text>
                                <Form.Control onChange={onChange} name="upass" value={upass} type='password' />
                            </InputGroup>
                            <Button type='submit' className='w-100 mt-2' variant='dark'>로그인</Button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage