import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './Pokefact.css';
import { Link, Router} from 'react-router';
import StatDisplay from '../StatDisplay/StatDisplay';
import DexEntry from '../DexEntry/DexEntry';
import PokeSprites from '../PokeSprites/PokeSprites';
 
/*
	
	Data either gets the "Actual Pokemon" data if typed is true (Actual stats)

	or 

	"Pokemon Species" data if false (This one has all the pokedex entries)
	
*/
 

function getData(id, typed){
	return new Promise(function(resolve,reject){
		var pkmnid = id;

		if(typed){
			var http = 'http://pokeapi.co/api/v2/pokemon/'+id;
		} else {
			var http = 'http://pokeapi.co/api/v2/pokemon-species/'+id;
		}
		let result;

		var xhr = new XMLHttpRequest();

		xhr.open('GET',http,true);

		xhr.onload = function(){
			if(xhr.status == 200){
				result = JSON.parse(xhr.response);
				resolve(result);

			} else {
				xhr.error();
			}
		}

		xhr.error = function(){
			console.log('Something went bad at ' + http +' . Check API is down at pokeapi.co ');
			reject(xhr.responseText);

		};

		xhr.send();

		}

	)
}


/*
	Next, must do a component that will take the state data from Pokefact. 


	Left Side
	
	- Pokemon Image
	- Pokemon Name
	- Pokemon Dex Entry number
	- Pokemon Type




	Right Side

*/












class Pokefact extends Component {
	constructor(){
		super()
		
		this.state = {
			pokemonStats: null,
			pokemonDex: null,
			currentInfo: 0,

			

		}

		this.setPokeFacts = this.setPokeFacts.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	setPokeFacts(){
		var pokemonid = this.props.params.pkmnId;
		
		var self = this;
		getData(pokemonid,true).then(function(data){

			

			self.setState({
				pokemonStats: data,
				currentPKMN: pokemonid
			});



		});

		getData(pokemonid,false).then(function(data){
						
			self.setState({
				pokemonDex: data

			});
		});


	}
	handleClick(event){
		/*event.preventDefault();*/ //Shows up as not a function...

		this.setState({
			currentInfo: event
		})
	}	

	componentDidMount() {
		this.setPokeFacts();
	}

	render(){

		var pokemonid = this.state.currentPKMN;
		var pokeStats = this.state.pokemonStats;
		var pokeDex = this.state.pokemonDex;
		var poketype;
		var infoWindows = [

							{'name':'Basic Stats   and   Info',
							 'tag':<StatDisplay pokemonstat = {pokeStats}/>,
							 'activeColor':'rgba(191,187,65,0.8)',
							 'baseColor':'rgba(191,187,65,0.4)'

							},
		 					{'name':'PokeDex   Entries',
		 					 'tag':<DexEntry pokemondex = {pokeDex}/>,
		 					 'activeColor':'rgba(191,63,62,0.9)',
		 					 'baseColor':'rgba(191,63,62,0.4)'


		 					},
		 					{'name':'Sprites',
		 					 'tag':<PokeSprites pokemonid = {pokemonid} />,
		 					 'activeColor':'rgba(65,133,166,0.9)',
		 					 'baseColor':'rgba(65,133,166,0.4)'

		 					}

		 					];

		
		var self = this;

		
		var currentWindow = infoWindows[this.state.currentInfo];
		console.log(currentWindow);

		/*
			Working on loading screen later.
		*/

		if(!pokeStats || !pokeDex){
			/*
				Loading screen

				Gotta make this into its own component... 

			*/
			return (
					<div id='loading-screen'className='col-xs-12 col-sm-12 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6'> 
						
						<div id='loading-text'className='col-xs-12 col-sm-12 col-md-10 col-lg-10'>
							Loading...

						</div>

					</div>

				)

		} else {

		 	poketype = this.state.pokemonTypes;
		 	
			var pokemonImage = {
					background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/'+this.props.params.pkmnId+'.png)no-repeat',
					backgroundSize:'68%',
		
					backgroundPosition:'center',
				}

				console.log(pokeStats);

					/*
						To make my life easier, I'm going to have 2 options, a mobile display and a desktop display

						
						They're going to share the same classes but the only thing is I want to have the bootstrap classes 

						different than the desktop without messing up the desktop version too much. 

						...It's really for redundancy. 
					*/
				return (
				<div id='pokefact'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 poke-facts'>


					<div id='pokemon-display-left' className='pokemon-fact-display hidden-xs hidden-sm col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1'>
						<div id='pokemon-image-wrapper' className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
							<div id='pokemon-image' className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={pokemonImage}>
						

							</div>
							<div id='pokemon-info-selection-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									{

											infoWindows.map(function(id,num){
													var highLight = {
														background:id.baseColor,
													}

												console.log('this is div ' + num);
												if(num == self.state.currentInfo){
													 highLight.background = id.activeColor;
													
												} 
												

												return (
															<div key={num}id={'info-window'+num}  style={highLight}className='col-xs-12 col-sm-12 col-md-12 col-lg-12 info-selection' onClick={(event)=>self.handleClick(num,event)}>
														
																{id.name}
														
															</div>
														
														

													)
											})


									}
								 	
									
							
							</div>
							
						</div>
						<div id='pokemon-base-facts' className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
							<div id='pokemon-name' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									<span id='poke-name'className='col-xs-8 col-sm-8 col-md-6 col-lg-6 poke-top-stats'>{pokeStats.name} </span>
									<span id='poke-id'className='col-xs-4 col-sm-4 col-md-6 col-lg-6 poke-top-stats'>#{pokeStats.id} </span>
									

							</div>
							
							<div id='info-window-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
								<div id='info-window'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
										{currentWindow.tag}

								

								</div>


							</div>
							
							
								

						</div>

					</div>
					<div id='pokemon-display-left' className='pokemon-fact-display hidden-md hidden-lg col-xs-12 col-sm-12'>
						<div id='pokemon-image-wrapper' className='col-xs-12 col-sm-12'>
							<div id='pokemon-image' className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={pokemonImage}>
							

						</div>

						</div>
						<div id='pokemon-base-facts' className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
							<div id='pokemon-name' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									<span id='poke-name'className='col-xs-8 col-sm-8 col-md-6 col-lg-6 poke-top-stats'>{pokeStats.name} </span>
									<span id='poke-id'className='col-xs-4 col-sm-4 col-md-6 col-lg-6 poke-top-stats'>#{pokeStats.id} </span>
										<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									
											{

											infoWindows.map(function(id,num){
													var highLight = {
														background:id.baseColor,
													}

												console.log('this is div ' + num);
												if(num == self.state.currentInfo){
													 highLight.background = id.activeColor;
													
												} 
												

												return (
															<div key={num}id={'info-window'+num}  style={highLight}className='col-xs-12 col-sm-12 col-md-12 col-lg-12 info-selection' onClick={(event)=>self.handleClick(num,event)}>
														
																{id.name}
														
															</div>
														
														

													)
											})


									}
									
										</div>
									
							</div>
							
							<div id='info-window-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
								<div id='info-window'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									{currentWindow.tag}

								

								</div>


							</div>
							
							
								

						</div>

					</div>


			



				</div>

			)
		}





		

	

	
	}


}


export default Pokefact;
