

'use strict'

import React from 'react';
import ReactDom from 'react-dom';
import logo from '../../assets/interview.png';
import './index.less';
class Search extends React.Component{
    render() {
        return <div>
            <image src={logo} className='image-style'/>
            <span className='font-style'> Search Text</span>
            <span>Test</span>
        </div>
    }
}
ReactDom.render(
    <Search />,
    document.getElementById('root')
)