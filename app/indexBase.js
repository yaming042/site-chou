import React, { Component } from 'react';

import Header from './components/header';
import Footer from './components/footer';

export default class Base extends Component{

	render(){

		return (
			<div className='main-root'>
				<Header />

				{ this.props.children }

				<Footer />
			</div>
		);
	}
}