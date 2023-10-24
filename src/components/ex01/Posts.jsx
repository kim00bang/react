import React, { useEffect, useState } from 'react'
import { Spinner, Table, Button } from 'react-bootstrap';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const getPosts = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                const start = (page - 1) * 10 + 1;
                const end = page * 10;
                let newJson = json.filter(j => j.id >= start && j.id <= end);
                newJson = newJson.map(j => j && { ...j, show: false });
                setPosts(newJson);
                setLoading(false);
            });
    }

    const onClickTitle = (id) => {
        const newPosts = posts.map(p=>p.id ===id ? {...p,show:!p.show} : p);
        setPosts(newPosts);
    }

    useEffect(() => {
        getPosts();
    }, [page]);

    if (loading) return (
        <div className='text-center my-5'>
            <Spinner animation='border' variant='primary' />
            <h1>로딩중입니다.....</h1>
        </div>
    )

    return (
        <div>
            <h1>Post</h1>
            <Table striped hover bordered variant='primary' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>title</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post =>
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>
                                <div onClick={()=>onClickTitle(post.id)}
                                style={{ color: "red", cursor: "pointer" }}>{post.title}</div>
                                {post.show && <div>{post.body}</div>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant='success'>이전</Button>
                <span className='mx-3'>{page}/10</span>
                <Button onClick={() => setPage(page + 1)} disabled={page === 10} variant='success'>다음</Button>
            </div>
        </div>
    )
}

export default Posts;