import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './Home.css';
import { Link, Router} from 'react-router';

/*var imagehttp = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pkid+'.png';
*/

/*

	Base desktop layout completed, still have to do mobile version along with resizing fixes.

*/

/*

	Gets the pokemon data

*/

function getPKMN() {
 	return new Promise(function(resolve,reject){
 		if(localStorage){
 			if(localStorage.getItem('PKMNList')){
 				resolve(JSON.parse(localStorage.getItem('PKMNList')));

 				console.log('Pokemon Data Loaded from localStorage');
 			}
 			else {
 				var xhr = new XMLHttpRequest();
 				let list;
 				xhr.open('GET','http://pokeapi.co/api/v2/pokemon/?limit=861',true);

 				xhr.onload = function(){
 					if(xhr.status >= 200 && xhr.status < 400){
 						list = xhr.response;
 						localStorage.setItem('PKMNList',list);
 						console.log('localStorage is active, and PKMN List is saved');
 				
 						resolve(JSON.parse(list));



 						} else {
 							xhr.error();
 						}
 					}

 				xhr.error = function(){
 					console.log('failed at getting pokemon list');
 					reject(xhr.responseText);
 			
 				};

 				xhr.send();
 			}
 		} else {
 			var xhr = new XMLHttpRequest();
 		let list;
 		xhr.open('GET','http://pokeapi.co/api/v2/pokemon/?limit=861',true);

 		xhr.onload = function(){
 			if(xhr.status >= 200 && xhr.status < 400){
 				list = xhr.response;
 				
 				console.log('No localStorage, got PKMN List');
 				
 				resolve(JSON.parse(list));



 			} else {
 				xhr.error();
 			}
 		}

 		xhr.error = function(){
 			console.log('failed getting pokemon data');
 			reject(null);
 			
 		};

 		xhr.send();
 		}
 	})
 };







/*

	Shows the pokemon Selection

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
		backgroundSize:'100%',
		height:'10vh',
		
		backgroundPosition:'center',
		
	}
	var mobileStyle = {
		background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pkid+'.png)no-repeat 10px/100%',
		
		height:'6vh',
		
		backgroundPosition:'center',
		
	}
	

	return (
			<div id='' className='pokemon-selection col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<Link   to={pokem}  id='' className='poke-name col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						<p className='col-xs-9 col-sm-9 col-md-9 col-lg-9 pokemon-selection-name'>{props.pokemon[0].name}</p>

						<div id=''className='hidden-xs hidden-sm col-md-3 col-lg-3 'style={style}></div>
						<div id=''className='col-xs-3 col-sm-3 hidden-md hidden-lg 'style={mobileStyle}></div>
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
			mobilePage: 1,
			pkmnPerPage: 12,
			mobilePKMNPerPage: 6,
			currentShownPKMN: [],
			mobileShownPKMN: [],
			currentBase: 0,
			mobileBase: 0,
			pkmnImages: []

			
		} 
		console.log(this.state);

		this.pokeCollect = this.pokeCollect.bind(this);
		this.setStatePKMN = this.setStatePKMN.bind(this);
		this.handleClick = this.handleClick.bind(this);
		
	}
	setStatePKMN() {
/*	this.setState({
		data: getPKMN().then(function(data){
			var stuff = [];

			for(var i=0;i < data.results.length;i++){
				stuff.push(data.results[i]);
			}

			return stuff
		}),
		maxPKMN: this.state.data.length
	})
*/
	
	var self = this;

	getPKMN().then(function(data){
		var stuff = self.state.pkmnlist;

		for(var i=0; i < data.results.length; i++){
			stuff.push(data.results[i]);
		}

		self.setState({
			pkmnlist: stuff,
			totalPKMN: stuff.length
		})

	})

}
	
	pokeCollect(deskStartPKMN,mobileStartPKMN){
			
			var allpkmn = this.state.pkmnlist;
			
			var collect = this.state.currentShownPKMN;
			var mobileCollect = this.state.mobileShownPKMN;
			var self = this;
			
			/*
				The initial pkmnlist comes up null when it loads up the first time.

				This loops makes sure that the objects coming in aren't null,

				then pushes it in the collect var.
			*/


			for(var i = deskStartPKMN; i < deskStartPKMN + this.state.pkmnPerPage; i++){
				if(allpkmn[i] == null){
					console.log('Intial Value was Null, retrying...');
				} else {
					collect.push([allpkmn[i], i]);
					

				}
			}
			for(var x=mobileStartPKMN; x < mobileStartPKMN + this.state.mobilePKMNPerPage; x++){
				if(allpkmn[x] == null){
					console.log('Mobile Initial Value was null, retrying...');
				} else {
					mobileCollect.push([allpkmn[x],x]);
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
			mobilePage: event,
			currentBase: (event - 1)  * this.state.pkmnPerPage,
			mobileBase: (event -1) * this.state.mobilePKMNPerPage,
			currentShownPKMN: [],
			mobileShownPKMN: [],
		});


		console.log('firing off pagniation for page ' + event);
		
	}
	componentWillMount() {
		this.setStatePKMN();
		this.pokeCollect(this.state.currentBase,this.state.mobileBase);
	}
	
	render(){
	
		var self = this;

	

		this.pokeCollect(this.state.currentBase,this.state.mobileBase);
		
		console.log(this.props);
		
		console.log(this.props.children);
		var mobilePKMN = this.state.mobileShownPKMN;
		var currentPKMN = this.state.currentShownPKMN;
		
		console.log(mobilePKMN);
		
		return (
				<div id='Home'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						<div id='desktop'className='hidden-sm hidden-xs col-md-12 col-lg-12'>
					
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
					<div id='mobile'className='col-xs-12 col-sm-12 hidden-md hidden-lg'>
					
								<div id='selection-window' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						{
							/*
								When trying to show multiple components with different values.

								Use array.prototype.map() function. First arguement takes the object,

								the second takes the index value.
							*/


							mobilePKMN.map(function(pkmn, id){
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


				</div>
			)
	}
}


export default Home;