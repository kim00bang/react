import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const MyPage = () => {
    const navi=useNavigate();
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] =useState("http://via.placeholder.com/200x200");
    const [user, setUser] = useState({
        uid: '',
        upass: '',
        uname: '',
        phone: '',
        address1: '',
        address2: '',
        fmtdate: '',
        fmtmodi:''
    })
    const {uid,upass,uname,phone,address1,address2,fmtdate,fmtmodi} = user;

    const getUser = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }
    const onChangeFile=(e)=>{
        setPhoto(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        getUser();
    }, []);

    if(loading) return <div className='my-5 text-center'><Spinner variant='dark'/></div>
    return (
        <div>
            <h1>마이페이지</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-5'>
                        <div>
                            <img src={photo} onClick={()=>ref_file.current.click()} width="200" className='photo mb-3' style={{cursor:"pointer"}}/>
                            <input type='file' ref={ref_file} onChange={onChangeFile} style={{display:"none"}}/>
                            <br/>
                            <Button size='sm' variant='dark'>이미지 수정</Button>
                            <hr/>
                        </div>
                        <div>
                            <div>아이디 : {uid}</div>
                            <div>이름 : {uname}</div>
                            <div>전화번호 : {phone}</div>
                            <div>주소 : {address1}{address2}</div>
                            <div>가입일 : {fmtdate}</div>
                            <div>수정일 : {fmtmodi}</div>
                            <hr/>
                            <Button onClick={()=>navi("/users/update")} variant='dark' size='sm'>정보 수정</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage