import React, { Component } from 'react';
import './Home.scss';

function Pokemon(props){
	

	return (
			<div id='' className='pokemon-selection col-xs-12 col-sm-12 col-md-3 col-lg-3'>{props.pokemonList}</div>


		)
}

/*class SelectionWindow extends Component {
	getDefaultProps(props){
		this.props = {

		}
	}


}
*/
class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			pkmnlist: this.props.pokemonList,
			totalPKMN: this.props.maxPKMN,
			currentPage: 0,
			pkmnPerPage: 9,
			
		} 
		console.log(this.state);
		
	}
	
	
	render(){
		var stuff = this.props.pokemonList;
		console.log('yo from home.js');
		console.log(this.props);

		return (
				<div id='Home'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					
						



				</div>
			)
	}
}


export default Home;