import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const MyPage = () => {
    const navi = useNavigate();
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid: '',
        upass: '',
        uname: '',
        phone: '',
        address1: '',
        address2: '',
        fmtdate: '',
        fmtmodi: '',
        photo: '',
        file: null
    })
    const { uid, upass, uname, phone, address1, address2, fmtdate, fmtmodi, photo, file } = user;

    const getUser = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }
    const onChangeFile = (e) => {
        setUser({
            ...user,
            photo: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    const onUpdatePhoto = async () => {
        if (!file) {
            alert("수정할 사진을 선택하세요.");
        } else {
            if (window.confirm("사진을 수정하시겠습니까?")) {
                //사진 저장
                const formData = new FormData();
                formData.append("file", file);
                formData.append("uid", uid);
                await axios.post('/users/update/photo', formData);
                alert("사진이 변경 되었습니다.");
            }
        }
    }
    useEffect(() => {
        getUser();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='dark' /></div>
    return (
        <div>
            <h1>마이페이지</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-5'>
                        <div>
                            <img src={photo || "http://via.placeholder.com/200x200"} onClick={() => ref_file.current.click()} width="200" className='photo mb-3' style={{ cursor: "pointer" }} />
                            <input type='file' ref={ref_file} onChange={onChangeFile} style={{display:"none"}}/>
                            <br />
                            <Button onClick={onUpdatePhoto} size='sm' variant='dark'>이미지 수정</Button>
                            <hr />
                        </div>
                        <div>
                            <div>아이디 : {uid}</div>
                            <div>이름 : {uname}</div>
                            <div>전화번호 : {phone}</div>
                            <div>주소 : {address1}{address2}</div>
                            <div>가입일 : {fmtdate}</div>
                            <div>수정일 : {fmtmodi}</div>
                            <hr />
                            <Button onClick={() => navi("/users/update")} variant='dark' size='sm'>정보 수정</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage