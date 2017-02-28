import React, { Component } from 'react';
import './Home.scss';

var pokelist = JSON.parse(localStorage.getItem('PKMNList')).results;

console.log(pokelist);

for(var x=0;x < pokelist.length;x++){
	console.log(pokelist[x]);
}



class PokeList extends Component {
	

	render(){



		return (

			<div id=""className="">
				
			</div>
		)
	}


}



class Home extends Component {
	
	render(){
		return (
				<div id='Home'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'><PokeList /></div>
			)
	}
}


export default Home;