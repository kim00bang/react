import React from 'react'
import { InputGroup, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { useEffect,useState } from 'react';
import axios from 'axios';
import ModalPostCode from './ModalPostCode';
import { useNavigate } from 'react-router-dom';


const UpdatePage = () => {
    const navi=useNavigate();    
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid: '',
        upass: '',
        uname: '',
        photo: '',
        phone: '',
        address1: '',
        address2: '',
        fmtdate: ''
    })
    const {uid,upass,uname,photo,phone,address1,address2,fmtdate} = user;

    const getUser = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    const onChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onUpdate=async(e)=>{
        e.preventDefault();
        if(window.confirm("정보를 수정 하시겠습니까?")){
            const res=await axios.post('/users/update', user);
            if(res.data==1){
                alert("정보가 수정되었습니다")
                navi("/users/mypage");
            } else{
                alert("정보 수정이 실패 했습니다");
            }
        }
    }
    if(loading) return <div className='my-5 text-center'><Spinner variant='dark'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center'>정보 수정</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <form onSubmit={onUpdate}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>이름</InputGroup.Text>
                            <Form.Control name="uname" value={uname} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>전화</InputGroup.Text>
                            <Form.Control name="phone" value={phone} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'> 
                            <InputGroup.Text>주소</InputGroup.Text>
                            <Form.Control name="address1" value={address1}/>
                            <ModalPostCode user={user} setUser={setUser}/>
                        </InputGroup>
                        <Form.Control name="address2" value={address2} placeholder='상세주소' onChange={onChange}/>
                        <div className='text-center mt-3'>
                            <Button type='submit' variant='dark' className='mx-3'>저장</Button>
                            <Button variant='dark' onClick={()=>getUser()}>취소</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default UpdatePage