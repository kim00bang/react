import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const HeaderPage = () => {
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
                    </Nav>
                    <Nav>
                        <NavLink className="text" to="/users/login">로그인</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderPage