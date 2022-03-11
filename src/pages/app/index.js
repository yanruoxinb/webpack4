


import React from 'react';
import ReactDom from 'react-dom';
import logo from '../../assets/interview.png';
class App extends React.Component{
    render() {
        return <div>
            <image src={logo} className='image-style'/>
            <span className='font-style'> app Text</span>
            <span>App</span>
        </div>
    }
}
ReactDom.render(
    <App />,
    document.getElementById('root')
)