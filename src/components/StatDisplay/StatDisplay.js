import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './StatDisplay.scss';
import { Link, Router} from 'react-router';
function TypeDisplay(typed){
	var typeed = typed;

	console.log(typeed);

	var types;
	var resultTypes = [];
	var colorTypes = [
		['bug','#2ABF48'],
		['dragon','#9C13E5'],
		['ice','#40E6FF'],
		['fighting','#BF6032'],
		['fire','#FF5C18'],
		['flying','#30ACBF'],
		['grass','#1C7F30'],
		['ghost','#7C517F'],
		['ground','#7f690c'],
		['electric','#FFFF16'],
		['normal','#B1BBBF'],
		['poison','#DFB3E5'],
		['psychic','#BF0587'],
		['rock','#403406'],
		['water','#206ABF'],
		['dark','#3B3E40'],
		['steel','#767C7F'],
		['fairy','#FF9DC4']

	];



	if(typed.length > 1){
		types = [typed[0].type.name,typed[1].type.name];
	} else {
		types = [typed[0].type.name];
	}

	for(var i=0; i < types.length; i++){
		for(var x=0;x < colorTypes.length;x++){
			if(types[i] == colorTypes[x][0]){
				var colorBack = {
					background: colorTypes[x][1],
					textAlign: 'right'
				};
				console.log('its all goooood');
				var div = <div id={'type'+i}className='col-xs-12 col-sm-12 col-md-6 col-lg-6 types' style={colorBack}>
								{colorTypes[x][0]}

							</div>;
				resultTypes.push(div);
			}
		}
	}

	return resultTypes

}

class StatDisplay extends Component {
	

	render(){
		var pokestat = this.props.pokemonstat;

		if(!pokestat){
			return (
					<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						Loading...
					</div>
				)
		} else {
			return (

					<div id='stat-display' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'> 

						<div id='stat-title' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'> 
							Basic Stats --

					 	</div>
					 	<div id='type-wrapper' className='col-xs-12 col-sm-12 col-md-6 col-lg-6'> 
							<div id='type-header' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'> 
								Types

					 		</div>
					 		{TypeDisplay(pokestat.types)}

					 	</div>

					 </div>
	

				)

		}
		}
}

export default StatDisplay;