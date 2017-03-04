import React, { Component } from 'react';
import './Home.scss';

function Pokemon(props){
	return (
			<div id='' className='pokemon-selection col-xs-12 col-sm-12 col-md-3 col-lg-3'>{props.pokemon.name}</div>


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
			currentShownPKMN: [],
			currentBase: 0
			
		} 
		console.log(this.state);
		
	}
	componentWillReceiveProps(nextProps) {
		/*
			This is really weird. 

			The docs say I should use this.setState() also refered to self.setState() in there.

			But it won't retrieve the pokemon list from the props. 

			Right now, this is the "i'll patch it later" fix.

			This also goes for app.js getPKMN function

		*/



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
			var base = this.state.currentBase;

			base = startPKMN;


			


	}
	render(){
		var stuff = this.state.pkmnlist;
		var self = this;
		var currentPKMN = 9;		

		
		if(stuff){
			this.pokeCollect(currentPKMN);
		}
		




		return (
				<div id='Home'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<div id='selection-window' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						{
							/*
								When trying to show multiple components with different values.

								Use array.prototype.map() function. First arguement takes the object,

								the second takes the index value.
							*/

							this.state.currentShownPKMN.map(function(pkmn, id){
								return <Pokemon key={id} pokemon={pkmn} />

							})

						}

					</div>
					<div id='' className=''>
						Prev | Next

					</div>



				</div>
			)
	}
}


export default Home;