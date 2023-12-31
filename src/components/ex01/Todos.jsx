import React, { useState, useEffect } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const getTodos = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                const start=(page-1)*10 +1;
                const end=page*10;
                const newJson = json.filter(j => j.id >= start && j.id<=end);
                setTodos(newJson);
                console.log(newJson);
                setLoading(false);
            });
    }
    useEffect(() => {
        getTodos();
    }, [page]);

    if (loading) return (
        <div className='text-center my-5'>
            <Spinner animation='border' variant='primary' />
            <h5>로딩중 입니다...</h5>
        </div>
    );

    return (
        <div>
            <h1 className='text-center my-5'>Todos</h1>
            <Table striped hover bordered variant='primary'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div>
                <Button onClick={()=>setPage(page-1)} disabled={page===1} variant='success'>이전</Button>
                <span className='mx-3'>{page}/20</span>
                <Button onClick={()=>setPage(page+1)} disabled={page===20} variant='success'>다음</Button>
            </div>
        </div>
    )
}

export default Todos;