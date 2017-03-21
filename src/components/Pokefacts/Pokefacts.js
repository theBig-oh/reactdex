import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './Pokefact.scss';
import { Link, Router} from 'react-router';

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
				result = xhr.response;
				resolve(JSON.parse(result));

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



class Pokefact extends Component {
	constructor(){
		super()

		this.state = {
			pokemonStats: [],
			pokemonDex: [],
			pokemonTypes: []

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
				pokemonType: [data.types[0].type.name,data.types[1].type.name]
			});



		});

		getData(pokemonid,false).then(function(data){
			

			
			self.setState({
				pokemonDex: data
			});
		});


	}
	componentWillMount() {
		this.setPokeFacts();
	}

	render(){

		var pokeStats = this.state.pokemonStats;
		var pokeDex = this.state.pokemonDex;
		var pokeTypes = this.state.pokemonType;

		var pokemonImage = {
			background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/'+this.props.params.pkmnId+'.png)no-repeat',
			backgroundSize:'100%,100%',
		
		backgroundPosition:'center',
		}

	

		return (
				<div id='pokefact'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 poke-facts'>
					<div id='pokemon-display-left' className='pokemon-fact-display col-xs-12 col-sm-12 col-md-5 col-lg-5'>
						<div id='pokemon-image' className='col-xs-12 col-sm-12 col-md-5 col-lg-5' style={pokemonImage}>
						

						</div>
						<div id='pokemon-base-facts' className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
							<div id='pokemon-name' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									<span id='poke-name'className='col-xs-12 col-sm-12 col-md-6 col-lg-6 poke-top-stats'>{pokeStats.name} </span>
									<span id='poke-id'className='col-xs-12 col-sm-12 col-md-6 col-lg-6 poke-top-stats'>#{pokeStats.id} </span>
							</div>
							<div id='pokemon-type' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									

							</div>

						</div>

					</div>

					<div id='pokemon-display-right' className='pokemon-fact-display col-xs-12 col-sm-12 col-md-5 col-lg-5'>


					</div>



				</div>

			)
	}


}


export default Pokefact;