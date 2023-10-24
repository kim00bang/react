import React, { useState } from 'react'
import "../../App.css"

const Count = () => {
    const [count,setCount] = useState(1);

    return (
    <div className='count'>
        <button style={{marginLeft:'5px', marginRight:'5px'}}className='button' onClick={()=>setCount(count-10)}>-10</button>
        <button style={{marginLeft:'5px', marginRight:'5px'}}className='button' onClick={()=>setCount(count-5)}>-5</button>
        <button className='button' onClick={()=>setCount(count-1)}>감소</button>
        <span className='text'>{count}</span>
        <button className='button' onClick={()=>setCount(count+1)}>증가</button>
        <button style={{marginLeft:'5px', marginRight:'5px'}} className='button' onClick={()=>setCount(count+5)}>+5</button>
        <button style={{marginLeft:'5px', marginRight:'5px'}}className='button' onClick={()=>setCount(count+10)}>+10</button>
    </div>
    )
}

export default Count;