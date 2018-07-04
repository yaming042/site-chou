import React from 'react';
import ReactDom from 'react-dom';

import Header from './components/header';
import SubIndex from './components/index/subIndex';
import Footer from './components/footer';

ReactDom.render(
    <div>
        <Header/>

        <SubIndex/>

        <Footer/>
    </div>,
    document.getElementById('root')
);