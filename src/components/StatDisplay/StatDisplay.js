import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './StatDisplay.css';
import { Link, Router} from 'react-router';


/*
	This gives a color coding to the pokemon types.


	***Might make colorTypes into a global variable for later reasons



*/

function TypeDisplay(typed){
	

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
				
				var div = <div id={'type'+i}className='col-xs-12 col-sm-12 col-md-12 col-lg-12 types' style={colorBack}>
								{colorTypes[x][0]}

							</div>;
				resultTypes.push(div);
			}
		}
	}

	return resultTypes

}

/*
	Color codes the abilities and sorts them out by Slot. 

	May change colors in scss file later.

*/

function AbilitiesDisplay(abl){
	var resultdiv = [];
	var able = abl;

	/*
		Debugging purposes...

	*/
	console.log(able);

	for(var x=0;x< able.length;x++){
		if(able[x].is_hidden == true){
			console.log(able[x]);

			var div = 	<div id='hidden-ability'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 ability'>
						
							<div id='hidden-title'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 slot-titles'>
						
								Hidden
						
							</div>
								<div id='hidden-name'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 slot-names'>
							
									{able[x].ability.name}
							
								</div>
							
						
			
				</div>

			resultdiv[able[x].slot-1] = div;
			
		} else {
			var div = 	<div id={'slot'+able[x].slot}className='col-xs-12 col-sm-12 col-md-12 col-lg-12 ability'>
			
						<div id='slot-title'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 slot-titles'>
						
								Slot{able[x].slot}:
						
							</div>
								<div id='slot-name'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 slot-names'>
							
									{able[x].ability.name}
							
								</div>
							
			
				</div>
			resultdiv[able[x].slot-1] = div;
		}
	}

	 
	return resultdiv;
}

/*
	Weight conversion
	
*/

function Weight(weight){
	var rawWeight = weight / 10;

	var usWeight = (weight * 2.2) / 10; 

	var convertedWeight = usWeight.toFixed(2);


	console.log(rawWeight,convertedWeight);

	var div = 	<div id='weight'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<div id='metric'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 weights'>
							<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 weight-title'>
						
								Metric :
						
							</div>
						
						 		<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 weight-value'>
						 	
						 			{rawWeight} Kg
						 	
						 		</div>
						 	
				
					</div>
					<div id='imperial'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 weights'>
							<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 weight-title'>
						
								Imperial :
						
							</div>
						
						 		<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 weight-value'>
						 	
						 			{convertedWeight + ' Lbs'} 
						 	
						 		</div>
						 
					
					</div>
					
				
				
	
		</div>;
	
	

		return div;

};

/*
	Height Conversion
*/
function Height(height){
	var metricHeight = height / 10;

	

	var imperialHeight = metricHeight * 39.37;
	var feet = 0;
	var	inches = imperialHeight;
	var convert = [];

	if(inches > 12){

		/*
			Math.floor rounds it down when its a decimal
		*/

		feet = Math.floor(inches / 12);

		/*
			Math.ceil rounds up when its a decimal.
		*/

		inches = Math.ceil(inches - (feet*12)).toFixed(1);

		console.log(inches);


		
		
	} else {
		inches = inches.toFixed(1);
	}

	console.log(feet,inches);


	console.log('Metric: '+metricHeight+'  Imperial: '+imperialHeight);


	var div = 	<div id='height'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<div id='metric'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 heights'>
							<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 height-title'>
						
								Metric :
						
							</div>
						
						 		<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 height-value'>
						 	
						 			{metricHeight} m.
						 	
						 		</div>
						 	
				
					</div>
					<div id='imperial'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 heights'>
							<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 height-title'>
						
								Imperial :
						
							</div>
						
						 		<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 height-value'>
						 	
						 			{feet + ' ft'} {inches + ' in.'} 
						 	
						 		</div>
						 
					
					</div>
					
				
				
	
		</div>;
	

	return div;



}



/*
	Graphical view of base stats 


*/

function VisualStats(stats){
	var resultDiv = [];
	var colorStat = [
		['speed','#38E829'],['special-defense','#C329FF'],['special-attack','#2DD1FF'],['defense','#FF1E48'],['attack','#E8991F'],['hp','#E85529']
	]

	for(var i=0;i< stats.length;i++){
		var stat = stats[i];


		/*
			This is temporary until I find out the actual upper limit of a pokemon stat.
		*/

		var parsedWidth = (stat.base_stat/255)*100;
		var barStyle = {
			width: parsedWidth +'%',
			
			background:colorStat[i][1]

		}

		console.log('ayy');

		var div = 	<div id=''className='col-xs-12 col-sm-12 col-md-12 col-lg-12 stats'>
							<div id='stat-name'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 stat-names'>
						
								{stat.stat.name} : {stat.base_stat}
						
							</div>

								<div id='stat-value'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 stat-values'>
										<div id='actual-value'className=''style={barStyle}>
									
											
									
										</div>
									
									
							
								</div>
							
				
		
			</div>;

			resultDiv.push(div);
		
	}

	return resultDiv;

}





/*
	Where everything gets rendered

*/

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
					 	<div id='left-side'className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
					 			
					 		<div id='type-wrapper' className='col-xs-12 col-sm-12 col-md-4 col-lg-4'> 
								<div id='type-header' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'> 
									Types

					 			</div>
					 			{TypeDisplay(pokestat.types)}

					 		</div>
					 		<div id='ability-wrapper' className='col-xs-12 col-sm-12 col-md-6 col-lg-6'> 
								<div id='ability-header' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'> 
									Abilities 

					 			</div>
					 			{AbilitiesDisplay(pokestat.abilities)}

					 		</div>
					 	
					 		<div id='weight-wrapper'className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
					 			<div id='weight-title'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					 		
					 				Weight:
					 		
					 			</div>
					 		
					 			{Weight(pokestat.weight)}
					 	
					 		</div>
					 		<div id='height-wrapper'className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
					 			<div id='height-title'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					 		
					 				Height:
					 		
					 			</div>
					 			{Height(pokestat.height)}
					 		
					 	
					 		</div>
					 	



					 	
					 	</div>
					 		<div id='right-side'className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
					 				<div id='base-stats-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					 						<div id='base-stat-title'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					 					
					 							Base Stats
					 					
					 						</div>


					 						{VisualStats(pokestat.stats)}
					 					
					 			
					 				</div>
					 			
					 			
					 		</div>
					 	
					 				 	
					 	
					 </div>
	

				)

		}
		}
}

export default StatDisplay;