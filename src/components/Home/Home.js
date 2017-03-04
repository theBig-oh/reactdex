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
			pkmnlist: [],
			totalPKMN: [],
			currentPage: 0,
			pkmnPerPage: 9,
			currentShownPKMN: []
			
		} 
		console.log(this.state);
		
	}
	componentWillReceiveProps(nextProps) {




			var self = this;

			self.state.pkmnlist = self.props.pokemonList;
			self.state.totalPKMN = self.props.pokemonList.length;			

	/*		var pokeCollection = function(startPKMN){
			var collect = [];
			
			for(var i = startPKMN;i< startPKMN + 9; i++){
				collect.push(self.props.pokemonList[i]);
			}
			console.log(collect);
			
			self.state.currentShownPKMN = collect;


			return collect;



		};

		pokeCollection(20);*/

		
	}
	pokeCollect(startPKMN){
			var self = this;
			var stuff = this.state.pkmnlist;

			var collect = self.state.currentShownPKMN;
			var collectDiv = [];
			for(var i = startPKMN; i < startPKMN + 9; i++){
				if(stuff[i] == null){
					console.log('Intial Value was Null, retrying...');
				} else {
					collect.push(stuff[i]);
				}
			}


			


	}
	render(){
		var stuff = this.state.pkmnlist;
		var self = this;
		

		
		if(stuff){
			this.pokeCollect(20);
		}
		




		return (
				<div id='Home'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					
						<Pokemon />



				</div>
			)
	}
}


export default Home;