import React, { useState } from 'react'
import { Button, Table, Form, InputGroup } from 'react-bootstrap';

const Product = () => {
    const [products, setProducts] = useState([
        { "id": 1, "name": "냉장고", "price": 100 },
        { "id": 2, "name": "세탁기", "price": 80 },
        { "id": 3, "name": "건조기", "price": 80 },
    ]);

    const [form, setForm] = useState({
        id: 4,
        name: '',
        price: 0
    });

    const { id, name, price } = form;

    const onInsert = (e) => {
        e.preventDefault();
        setProducts(products.concat(form));
        alert("저장");
        setForm({
            id: id + 1,
            name: '',
            price: 0
        })
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div>
            <h1>상품관리</h1>
            <div>
                <form onSubmit={onInsert}>
                    <h3>ID : {id}</h3>
                    <InputGroup>
                    <InputGroup.Text>상품명</InputGroup.Text>
                    <Form.Control name='name' value={name} onChange={onChange} />
                    </InputGroup>
                    <InputGroup>
                    <InputGroup.Text>가격</InputGroup.Text>
                    <Form.Control name='price' value={price} onChange={onChange} />
                    </InputGroup>
                    <Button variant='success'>등록</Button>
                    
                </form>
            </div>
            <hr />
            <Table striped bordered hover variant='success'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p =>
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price} 만원</td>
                        </tr>
                    )}
                </tbody>
                <tfoot/>
            </Table>
        </div>
    )
}

export default Product;