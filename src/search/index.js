

'use strict'

import React from 'react';
import ReactDom from 'react-dom';
import logo from '../assets/interview.png';
import  './search.css';
class Search extends React.Component{
    render() {
        return <div>
            <image src={logo} className='image-style'/>
            <span className='font-style'> hahhhhhh Text</span>
        </div>
    }
}
ReactDom.render(
    <Search />,
    document.getElementById('root')
)