import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './Home.css';
import { Link, Router} from 'react-router';

/*var imagehttp = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pkid+'.png';
*/

/*

	Base desktop layout completed, still have to do mobile version along with resizing fixes.

*/





function Pokemon(props){
	console.log(props.pokemon);
	console.log(props.pokemon[1]);
	const pkid = props.pokemon[1]+1;
	const pokem = 'pkmn/'+(props.pokemon[1] + 1);

	/*
		The style below retrieves the sprites from the pokeAPI github, thankfully they're all under 1kb.

	*/


	var style = {
		background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pkid+'.png)no-repeat',
		backgroundSize:'110%,160%',
		height:'15vh',
		backgroundPosition:'center',
		
	}
	

	return (
			<div id='' className='pokemon-selection col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Link   to={pokem}  id='' className='poke-name col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						<p className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>{props.pokemon[0].name}</p>

						<div id=''className='col-xs-12 col-sm-12 col-md-3 col-lg-3'style={style}></div>
					</Link>


			</div>


		)
}



class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			pkmnlist: [],
			totalPKMN: [],
			currentPage: 1,
			pkmnPerPage: 12,
			currentShownPKMN: [],
			currentBase: 0,
			pkmnImages: []

			
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

	

		
	}
	pokeCollect(startPKMN){
			
			var allpkmn = this.state.pkmnlist;
			
			var collect = this.state.currentShownPKMN;
			
			var self = this;
			
			/*
				The initial pkmnlist comes up null when it loads up the first time.

				This loops makes sure that the objects coming in aren't null,

				then pushes it in the collect var.
			*/


			for(var i = startPKMN; i < startPKMN + this.state.pkmnPerPage; i++){
				if(allpkmn[i] == null){
					console.log('Intial Value was Null, retrying...');
				} else {
					collect.push([allpkmn[i], i]);
					

				}
			}
			

			/*
				Notes for myself later:

				Kehv said to try this out 

				 var end = startPKMN + this.state.pkmnPerPage;
            collect.push(this.state.pkmnlist.slice(startPKMN, end));(edited)

				Replace the for loop with that.

			*/


			console.log('fired pokecollection from pagniation buttons');
			


	}
	
	handleClick(event){
		var self = this;
		this.setState({
			currentPage: event,
			currentBase: (event - 1)  * this.state.pkmnPerPage,
			currentShownPKMN: []
		});


		console.log('firing off pagniation for page ' + event);
		
	}
	setBasePKMN(startNum){
		
		/*
			Not being used. Will take out later.
			
		*/


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
	
		var self = this;
		var currentPKMN = this.state.currentBase%this.state.totalPKMN;		

	

		this.pokeCollect(this.state.currentBase);
		console.log(this.props);
		
		console.log(this.props.children);
		
		var currentPKMN = this.state.currentShownPKMN;
		
		console.log(currentPKMN);
		
		return (
				<div id='Home'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<div id='selection-window' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						{
							/*
								When trying to show multiple components with different values.

								Use array.prototype.map() function. First arguement takes the object,

								the second takes the index value.
							*/


							currentPKMN.map(function(pkmn, id){
								return <Pokemon key={id} pokemon={pkmn} />

							})

						}

					</div>
					<div id='selection-buttons' className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>

					<Pagination bsClass='poke-select col-xs-12 col-sm-12 col-md-12 col-lg-12'
						activePage={this.state.currentPage}
						onSelect={this.handleClick}
						items={Math.floor(self.state.totalPKMN / self.state.pkmnPerPage)}
						maxButtons={1}
						next={true}
						prev={true}
						ellipsis={false}

					/>

					</div>



				</div>
			)
	}
}


export default Home;