import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './Home.scss';

function Pokemon(props){
	return (
			<div id='' className='pokemon-selection col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<div id='' className='poke-name col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						{props.pokemon.name}
					</div>


			</div>


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
			currentPage: 1,
			pkmnPerPage: 12,
			currentShownPKMN: [],
			currentBase: 0
			
		} 
		console.log(this.state);

		this.pokeCollect = this.pokeCollect.bind(this);
		this.setBasePKMN = this.setBasePKMN.bind(this);
		this.handleClick = this.handleClick.bind(this);
		
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

			

			


			for(var i = startPKMN; i < startPKMN + this.state.pkmnPerPage; i++){
				if(stuff[i] == null){
					console.log('Intial Value was Null, retrying...');
				} else {
					collectDiv.push(this.state.pkmnlist[i]);
				}
			}
			var base = this.state.currentBase;

			base = startPKMN;


			console.log('fired pokecollection from pagniation buttons');
			


	}
	handleClick(event){
		var self = this;
		this.setState({
			currentPage: event,
			currentBase: (event - 1)  * this.state.pkmnPerPage
		});


		console.log('firing off pagniation for page ' + event);
		
	}
	setBasePKMN(startNum){
		var self = this;
		if(startNum > this.state.totalPKMN){
			var num = startNum%this.state.totalPKMN;

			self.setState({
			currentBase: num
			})
		} else {
			self.setState({
				currentBase: startNum
			})

		}
	}
	
	render(){
		var stuff = this.state.pkmnlist;
		var self = this;
		var currentPKMN = this.state.currentBase%this.state.totalPKMN;		



		this.pokeCollect(this.state.currentBase);

		
	
		
		
		
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
					<div id='selection-buttons' className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>

					<Pagination 
						activePage={this.state.currentPage}
						onSelect={this.handleClick}
						items={Math.floor(self.state.totalPKMN / self.state.pkmnPerPage)}
						maxButtons={5}
						next={true}
						prev={true}

					/>

					</div>



				</div>
			)
	}
}


export default Home;