import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BoxContext } from './BoxContext';


const HeaderPage = () => {
    const { box, setBox } = useContext(BoxContext);
    const navi = useNavigate();
    const onLogout = (e) => {
        e.preventDefault();/*
        if(window.confirm("로그아웃 하실래요?")){
            sessionStorage.clear();
            navi('/');
        }*/
        setBox({
            show: true,
            message: "로그아웃 하시겠습니까?",
            action: () => {
                sessionStorage.clear();
                navi('/');
            }
        });
    }
    return (
        <Navbar expand="lg" bg='dark' data-bs-theme="dark">
            <Container fluid>
                <NavLink className="mx-5 text" to="/">홈</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <NavLink className="text" to="/books/search">도서 검색</NavLink>
                        <NavLink className="text" to="/books/list">도서 목록</NavLink>
                        {sessionStorage.getItem("uid") &&
                            <NavLink className="text" to="/orders/cart">장바구니</NavLink>
                        }
                    </Nav>
                    <Nav>
                        {!sessionStorage.getItem("uid") ?
                            <NavLink className="text" to="/users/login">로그인</NavLink>
                            :
                            <>
                                <NavLink className="text" to="/users/mypage">{sessionStorage.getItem("uid")}</NavLink>
                                <NavLink onClick={onLogout} className="text" to="/users/login">로그아웃</NavLink>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderPage