import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './PokeSprites.css';
import { Link, Router} from 'react-router';

/*
	Getting the pictures

*/

/*
function getSpriteImages(id,shiny,female){
	var xhr = new XMLHttpRequest();

	var httpPrefix = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
	var shiny = 'shiny/';
	var female = 'female/';
	var idp = id+'.png';
	var title;
	var idTag;
	var classTag;


	
		I'm just getting a single file, so the headers makes it easier with the status codes

	

	if(!shiny && !female){
		xhr.open('GET',httpPrefix+idp,true);
		title = 'Regular';
		idTag = 'regular-sprite';
		
	} else if (female && shiny){
		xhr.open('GET',httpPrefix+shiny+female+idp,true);
		title = 'Shiny Female';
		idTag = 'shiny-female';
		
	} else if(female && !shiny){
		xhr.open('GET',httpPrefix+female+idp,true);
		title = 'Female';
		idTag = 'female';
		
	} else {
		xhr.open('GET',httpPrefix+shiny+idp,true);
		title = 'Shiny';
		idTag = 'shiny';
		
	};

	xhr.error = function(){
		var errorDiv = 	<div id='error-sprite'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
		
						{title} Sprite Image currently not available... 
		
			</div>;

			return errorDiv;
		
	};

	xhr.onload = function(){
		if(xhr.status >= 200 && xhr.status <= 400){
			var div = 	<div id={idTag} className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						
					{title}
			
				</div>

				return div;
			
		} else {
			xhr.error();
		}
	}

	xhr.send();

}
*/

function urlExist(url){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				return true
			} else {
				return false
			}
		}
	};

	xhr.open('HEAD',url);
	xhr.send();
}


/*

	I need to work on this later. Currently does not show some shiny female/regular female

	sprites due to API not containing them. 


	Tried to make a switch that checks if links are valid through http status...

	Still gotta work on it... 

	Current Female Sprite list - https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon/female

*/


function Sprites(id){
	var http = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
	var idEnd = id+'.png';
	var spriteTypes = [
		{'type':'Regular / Male Version','url':http+idEnd,'idTag':'regular'},
		{'type':'Female Version','url':http+'female/'+idEnd,'idTag':'female'},
		{'type':'Shiny Male','url':http+'shiny/'+idEnd,'idTag':'shiny-male'},
		{'type':'Shiny Female','url':http+'shiny/female/'+idEnd,'idTag':'shiny-female'}

	];
	var resultsDivs = [];
	





	
	for(var x=0; x < spriteTypes.length; x++){
		var sprite = spriteTypes[x];
		var promised = new Promise(function(resolve,reject){
			if(urlExist(sprite.url)){
				resolve(true)
			} else {
				reject(false)
			}
		});
		console.log(promised);
		if(!promised){
			var backgroundStuff = {
			background:'url('+sprite.url+')no-repeat',
			backgroundSize:'100% 100%',
			backgroundPosition:'center',
			height:'20vh'
		};
			if(!backgroundStuff.background){
				console.log('lost');
				
				backgroundStuff.background = 'green';		
			}
		
		var div = 		<div id=''className='col-xs-12 col-sm-12 col-md-6 col-lg-6 sprite-classes'>
							<div id=''className='col-xs-12 col-sm-12 col-md-6 col-lg-6 actual-sprites'style={backgroundStuff}>
		
								Failed
		
							</div>
				
		
						</div>;
		} else {
			var backgroundStuff = {
			background:'url('+sprite.url+')no-repeat',
			backgroundSize:'100% 100%',
			backgroundPosition:'center',
			height:'20vh'
			};
			console.log('found');
		
			var div = 		<div id=''className='col-xs-12 col-sm-12 col-md-6 col-lg-6 sprite-classes'>
								<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							
									{sprite.type}
							
								</div>
							

							<div id=''className='col-xs-12 col-sm-12 col-md-6 col-lg-6 actual-sprites'style={backgroundStuff}>
		
								
		
							</div>
				
		
						</div>;

		}


		
		
		
		resultsDivs.push(div);

	}


	return resultsDivs
	
	



}



class PokeSprites extends Component {
		constructor(){
			super();
			var self = this;
			this.state = {
				currentPKMN: null
			}
		}
		componentDidMount(){
			this.setState({
				currentPKMN: this.props.pokemonid
			});
			
		}
		render(){
			var id = this.state.currentPKMN;
			
			
			if(!id){
				return (
						<div id='pokesprites'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
								<div id='poke-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
										<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									
											Loading...
									
										</div>
									


									
							
								</div>
							
							
					
						</div>

					)
			} else {
				return(

						<div id='pokesprites'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
								<div id='poke-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
										<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									
											{Sprites(id)}
									
										</div>
									


									
							
								</div>
							
							
					
						</div>
					


				)
			}



			
		}
}

export default PokeSprites;