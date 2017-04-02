import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './DexEntry.css';
import { Link, Router} from 'react-router';

/*
	Dex entries over here...

*/

function DexEntries(lang,gen,dex){
	var language = lang;
	var generation = gen;
	var collected = [];
	var collectedDex = [];

	var gamegens = [
			{'gen':'generation-i',
			  'games':[
			  		'red',
			  		'blue',
			  		'yellow'
			  	]
			  },
			{'gen':'generation-ii',
			  'games':[
			  		'gold',
			  		'silver',
			  		'crystal'
			  	]
			  },
			{'gen':'generation-iii',
			  'games':[
			  		'ruby',
			  		'sapphire',
			  		'emerald',
			  		'firered',
			  		'leafgreen'
			  	]
			  },
			{'gen':'generation-iv',
			  'games':[
			  		'diamond',
			  		'pearl',
			  		'platinum',
			  		'heartgold',
			  		'soulsilver'

			  	]
			  },
			{'gen':'generation-v',
			  'games':[
			  		'black',
			  		'white',
			  		'black-2',
			  		'white-2'
			  	]
			  },
			{'gen':'generation-vi',
			  'games':[
			  		'x',
			  		'y',
			  		'alpha-sapphire',
			  		'omega-ruby'
			  	]
			  },
			



	];

	/*
		Filters by dex entries by generation

	*/
	
	for(var x=0; x < gamegens.length; x++){
		if(generation == gamegens[x].gen){
			for(var y=0;y < gamegens[x].games.length; y++){
				collected.push(gamegens[x].games[y]);
			}
		}
	}


	/*
		Filters by language
	
	*/
	for(var z=0; z < dex.length; z++){
		if(dex[z].language.name == language){
			console.log('found lang');
			

			for(var q=0; q < collected.length; q++){
				
				if(dex[z].version.name == collected[q]){
					console.log('found game');
					console.log(dex[z]);
					collectedDex.push({'text':dex[z].flavor_text,'version':collected[q]});
					console.log(collectedDex);
						
				}

			}
		}
	}
	
	var readyDex = collectedDex.reverse();
	console.log(collectedDex);
	console.log(readyDex);
	console.log(language);

	
	
	
}



/*
	Shown component
	
*/
class DexEntry extends Component {
	constructor(){
		super();
		this.state = {
			currentLang: 'en',
			currentColor:'#BF221E',

		};
		this.handleClick = this.handleLangClick.bind(this);
		this.handleGenClick = this.handleGenClick.bind(this);
	}
	handleLangClick(event){

		this.setState({
			currentLang: event.code,
			currentColor: event.color
		})

		

	}
	handleGenClick(event){
		this.setState({
			currentGen: event
		})
	}
	componentDidMount() {
		this.setState({
			currentGen: this.props.pokemondex.generation.name
		})
	}
	render(){

		/*
			Language keycodes and colors
		*/

		var langs = [
			{'code':'en','lang':'English','color':'#BF221E'},
			{'code':'ja','lang':'Japanese','color':'#717372'},
			{'code':'roomaji','lang':'Romaji','color':'#636B73'},
			{'code':'ko','lang':'Korean','color':'#455173'},
			{'code':'zh','lang':'Chinese','color':'#F26A35'},
			{'code':'fr','lang':'French','color':'#27A1B2'},
			{'code':'de','lang':'German','color':'#3D5E66'},
			{'code':'es','lang':'Spanish','color':'#B25B51'},
			{'code':'it','lang':'Italian','color':'#07663E'},
			{'code':'cs','lang':'Czech','color':'#B2A480'},
			{'code':'ja-kanji','lang':'Kanji','color':'#B2A0A4'}

		];

		/*
			Which generations the pokemon contain and origin generation

			***ONLY SHOWS UP TO 6TH GENERATION DUE TO API***
		*/

		var gens = [
			{'gen':'generation-i','name':'I'},
			{'gen':'generation-ii','name':'II'},
			{'gen':'generation-iii','name':'III'},
			{'gen':'generation-iv','name':'IV'},
			{'gen':'generation-v','name':'V'},
			{'gen':'generation-vi','name':'VI'},
			
		];

		var generation = this.props.pokemondex.generation.name;

		var collectedGen = [];

		console.log(generation);
		var dexstuff = this.props.pokemondex.flavor_text_entries;

		
		var pokemonlanguages = this.props.pokemondex.names;
		var currentlangselection = [];
		var self = this;


		/*
			Sets filter parameters by language.

			Some pokemon may not have the language available. This filters it in selection first.
			
		*/
		for(var x = 0; x < pokemonlanguages.length; x++){
			for(var y=0;y < langs.length; y++){
				if(pokemonlanguages[x].language.name == langs[y].code){
					currentlangselection.push([langs[y].lang,langs[y].code,langs[y].color]);
				}
			}
		}
		/*
			Sets filter parameters by the generation the pokemon first appeared and adds the ones it has shown in. 
		
		*/
		for(var x=0; x< gens.length;x++){
			if(gens[x].gen == generation){
				collectedGen.push(gens[x]);
				for(var y=x+1;y < gens.length; y++){
					collectedGen.push(gens[y]);
				}
			}
		}

		
		/*
			Changes the color based on language selected.

			Default is English/Red (Colors will changed for better a e s t h e t i c )
		*/
		var dexStyle = {
			background: this.state.currentColor
		}

		


		return(
					<div id='dex-entry'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							<div id='language-selection-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									{
										currentlangselection.map(function(key,id){
											let langObject = {'code':key[1],'color':key[2]}
											let styleObject = {
												background:langObject.color
											}

											return (

														<div key={key}id={'lang-selection-'+id} className='col-xs-12 col-sm-12 col-md-1 col-lg-1' onClick={(event)=>self.handleLangClick(langObject,event)} style={styleObject}>
													
															{key[0]}
													
														</div>
													




												)



										})

									}
								
						
							</div>
								<div id='dex-info-entry-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={dexStyle}>
							
									  	<div id='generation-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									  
									  		 	<div id=''className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
									  		 
									  		 		Generation:
									  		 
									  		 	</div>
									  		 	{
									  		 		collectedGen.map(function(key,id){
									  		 			

									  		 			return (
									  		 						<div key={id}id=''className='col-xs-12 col-sm-12 col-md-1 col-lg-1' onClick={(event)=>self.handleGenClick(key.gen,event)} >
									  		 					
									  		 							{key.name}
									  		 					
									  		 						</div>
									  		 					

									  		 				)


									  		 		})


									  		 	}


									  		 
									  
									  	</div>
									  	<div id='generation-content-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									  	
									  			{DexEntries(this.state.currentLang,this.state.currentGen,dexstuff)}
									  	
									  	</div>
									  	
									  
							
								</div>
							
						
				
					</div>
				

			)


	}

}

export default DexEntry;