import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './Pokefact.scss';
import { Link, Router} from 'react-router';
import StatDisplay from '../StatDisplay/StatDisplay';
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
			pokemonStats: [],
			pokemonDex: [],
			pokemonTypes: ['loading','loading']

		}

		this.setPokeFacts = this.setPokeFacts.bind(this);
	}

	setPokeFacts(){
		var pokemonid = this.props.params.pkmnId;
		console.log(pokemonid);
		var self = this;
		getData(pokemonid,true).then(function(data){
			

			/*for(var i=0;i < data.length;i++){
				result.push(data);
			}

			self.setState({
				pokemonStats: result
			});*/



			console.log(data);

			self.setState({
				pokemonStats: data,
				
			});



		});

		getData(pokemonid,false).then(function(data){
			

			
			self.setState({
				pokemonDex: data
			});
		});


	}
	componentDidMount() {
		this.setPokeFacts();
	}

	render(){

		/*
			- Something is happening in the this.state.pokeTypes that is not letting me render it.

						  There's 2 explainations, first... I have no clue what is going on

						  Second - The data still hasn't arrived and been stored in this.state by the 

						  XMLHttpRequest. So what's happening is when this intially renders, it breaks because

						  this.state.pokemonType/Stats/Dex is empty hence the null value. 


						

		*/



		var pokeStats = this.state.pokemonStats;
		var pokeDex = this.state.pokemonDex;
		var pokeTypes = this.state.pokemonType; // This loads if its called normally, if I call it using pokeTypes[index] it crashes...

		var pokemonImage = {
			background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/'+this.props.params.pkmnId+'.png)no-repeat',
			backgroundSize:'68%',
		
		backgroundPosition:'center',
		}

	

		return (
				<div id='pokefact'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 poke-facts'>
					<div id='pokemon-display-left' className='pokemon-fact-display col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1'>
						<div id='pokemon-image-wrapper' className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
							<div id='pokemon-image' className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={pokemonImage}>
							

						</div>

						</div>
						<div id='pokemon-base-facts' className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
							<div id='pokemon-name' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									<span id='poke-name'className='col-xs-12 col-sm-12 col-md-6 col-lg-6 poke-top-stats'>{pokeStats.name} </span>
									<span id='poke-id'className='col-xs-12 col-sm-12 col-md-6 col-lg-6 poke-top-stats'>#{pokeStats.id} </span>
							</div>
							
							
								

						</div>

					</div>

			



				</div>

			)
	}


}


export default Pokefact;