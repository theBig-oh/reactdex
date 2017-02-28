import React, { Component } from 'react';
import './Home.scss';

function Pokemon(props){
	return (
			<div id='' className='pokemon-selection col-xs-12 col-sm-12 col-md-3 col-lg-3'>{props.pokemonList}</div>


		)
}




class Home extends Component {
	constructor(){
		super();
		this.state = {
			
			currentPage: 1,
			pkmnPerPage: 9
		};

		console.log(this.props);
	}
	
	render(){
		return (
				<div id='Home'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
				

				</div>
			)
	}
}


export default Home;