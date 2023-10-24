import React, { useState } from 'react'
import Insert from './Insert';

const Address = () => {
    const [array, setArray] = useState([
        { "id": 1, "name": "홍길동", "address": "주택" },
        { "id": 2, "name": "둘리", "address": "빙하" },
        { "id": 3, "name": "또치", "address": "닭장" },
        { "id": 4, "name": "마이콜", "address": "기타" },
    ]);

    const onInsert = (form) => {
        setArray(array.concat(form));
        alert("주소 추가");
    }

    return (
        <div>
            <Insert onInsert={onInsert} />
            <h1>주소 목록</h1>
            {array.map(person =>
                <h3 key={person.id}>{person.id} : {person.name} : {person.address}</h3>
            )}
        </div>
    )
}

export default Address;