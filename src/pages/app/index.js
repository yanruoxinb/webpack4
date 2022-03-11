


import React from 'react';
import ReactDom from 'react-dom';
import logo from '../../assets/interview.png';
import test from '../../utils/common';

class App extends React.Component{
    render() {
        let a = test();
        return <div>
            <img src={logo} className='image-style'/>
            <span className='font-style'> app Text</span>
            <span>App</span>
        </div>
    }
}
ReactDom.render(
    <App />,
    document.getElementById('root')
)