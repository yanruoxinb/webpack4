

'use strict'

import React, { useState } from 'react';
import ReactDom from 'react-dom';
import logo from '../../assets/interview.png';
import './index.less';
const Search = () => {
    const [data,setData] = useState(null)

    const onHandleClick = () => {
        import('./test').then((text) => {
            setData(text.default);
       })
    }
    console.log('--------data-------------',data)
    return <div>
        <img src={logo} className='image-style' />
        <span className='font-style'> Search Text</span>
        <span onClick={onHandleClick}>Test</span>
        {data}
    </div>

}
ReactDom.render(
    <Search />,
    document.getElementById('root')
)