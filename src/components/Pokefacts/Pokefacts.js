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
			pokemonStats: null,
			pokemonDex: null,

		}

		this.setPokeFacts = this.setPokeFacts.bind(this);
	}

	setPokeFacts(){
		var pokemonid = this.props.params.pkmnId;
		var self = this;
		getData(pokemonid,true).success(function(data){
			var result = self.state.pokemonStats;

			for(var i=0;i < data.length;i++){
				result.push(data);
			}

			self.setState({
				pokemonStats: result
			});
		});

		getData(pokemonid,false).success(function(data){
			var result = self.state.pokemonStats;

			for(var i=0;i < data.length;i++){
				result.push(data);
			}

			self.setState({
				pokemonStats: result
			});
		});


	}

	render(){

		console.log(this.props.params);
		console.log('this is being called from pokefacts component');

		return (
				<div id='pokefact'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 poke-facts'>
					Stuff

				</div>

			)
	}


}


export default Pokefact;