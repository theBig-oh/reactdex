import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.scss';

import Home from './Home/Home.js';

function GridBlocks() {
	this.fps = 60;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minSpeed = this.fps/2;
	this.maxSpeed = this.fps - 2;
	this.blocks = 600;
	this.interId = 0;
}
function makeBlock(x,y,size,velocity,direction,angle){
	this.x = x;
	this.y = y;
	this.size = size;
	this.velocity = velocity;
	this.direction = direction;
	this.angle = angle;
};

GridBlocks.prototype = {
	initialize:function(div){
		var self = this;

		this.containerDiv = div;
		self.width = window.innerWidth;
		self.height = window.innerHeight;

		window.addEventListener('resize',function resize(event){
			self.width = window.innerWidth;
			self.height = window.innerHeight;
			self.canvas.width = self.width;
			self.canvas.height = self.height;
			self.draw();
		});

		var canvas = document.createElement('canvas');
		div.appendChild(canvas);
		this.canvas = canvas;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	},
	start:function(){
		var blocks = [];
		for(var i = 0;i < this.blocks;i++){
				if(i%2==0){
					blocks[i] = new makeBlock(this.width - (Math.random()*this.width/2),Math.random()*this.height,Math.random()*3+2,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,true);
		
				} 
				else {
					blocks[i] = new makeBlock(Math.random()*this.width/2,Math.random()*this.height,Math.random()*3+2,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,false);
		
				}

			}

		this.blocks = blocks;

		var self = this;

		this.interId = setInterval(function(){
			self.update();
			self.draw();
		},1000/this.fps);
	},
	update: function(){
		var deltaTime = 1/this.fps; // This makes the engine possible

		for(var i=0;i < this.blocks.length;i++){
			
			

		
			
			var block = this.blocks[i];
			if(block.direction == true){
					block.x += deltaTime * block.velocity;

					


				if(block.x > this.width+40){
					var deltaAngle = Math.sin(Math.PI / (Math.random() * (2 - 0) + 0 ));
					this.blocks[i] = new makeBlock(this.width/2,Math.random()*this.height,Math.random()*3+1,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,true,deltaAngle);
				}
			} else {
				block.x -= deltaTime * block.velocity;
				var deltaAngle = Math.sin(Math.PI / (Math.random() * (2 - 0) + 0 ));
				if(block.x < -40){
					this.blocks[i] = new makeBlock(this.width/2,Math.random()*this.height,Math.random()*3+1,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,false,deltaAngle);
				}
			}

		}
	},
	draw: function(){
		var ctx = this.canvas.getContext('2d');

		var blocks = this.blocks;
		ctx.clearRect(0,0,this.width,this.height);
		for(var i = 0; i < blocks.length; i++){
			var block = blocks[i];
			ctx.strokeStyle = 'rgba(24,64,35,0.8)';
			ctx.lineWidth = 5;
			ctx.fillStyle = 'rgba(2,225,35,0.6)';

			ctx.fillRect(block.x,block.y,block.size*10,block.size*10);
			/*ctx.strokeRect(block.x,block.y,block.size*10,block.size*10);*/
		

		}

	}
};




function getPKMN() {
 	return new Promise(function(resolve,reject){
 		var xhr = new XMLHttpRequest();
 		let list;
 		xhr.open('GET','http://pokeapi.co/api/v2/pokemon/?limit=861',true);

 		xhr.onload = function(){
 			if(xhr.status >= 200 && xhr.status < 400){
 				list = xhr.response;
 				localStorage.setItem('PKMNList',list);
 				console.log('yo');
 				
 				resolve(JSON.parse(list));



 			} else {
 				xhr.error();
 			}
 		}

 		xhr.error = function(){
 			console.log('failed');
 			reject(null);
 			
 		};

 		xhr.send();
 	})
 };


getPKMN();



class App extends Component {
constructor(){
	super();

	this.state = {
		data: []
	}

	this.setStatePKMN  = this.setStatePKMN.bind(this);
}

setStatePKMN() {
	var stuff = this.state.data;

	getPKMN().then(function(data){

		var parsed = data.results;

		for(var i = 0; i < parsed.length; i++){
			stuff.push(parsed[i]);

		}
		console.log(parsed);
	})
	
}


 componentDidMount() {
 	let canvas = ReactDOM.findDOMNode(this.refs.gridcanvas);

 	var gridfield = new GridBlocks();
 	gridfield.initialize(canvas);
 	gridfield.start();

 	this.setStatePKMN();
 }


  render() {
    return (
     <div id='app'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 pokemon-large'>
     	<div ref='gridcanvas'id='grid-background'className="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>

     	<div id="top-banner" className="col-xs-12 col-sm-12 col-md-12 col-lg-12" > <div id="blue-jewel" className=''> </ div></div>
     	

     	<div id='body'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
     	<Home pokemonList={this.state.data} />
     

     	</div>

     	<div id='bottom-banner'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
     		<div id='green-jewels-container'className='col-xs-12 col-sm-12 col-md-2 col-lg-2'>
				<div id='green-jewel-one'className='col-xs-12 col-sm-12 col-md-3 col-lg-3 green-jewel'> </div>     			
				<div id='green-jewel-two'className='col-xs-12 col-sm-12 col-md-3 col-lg-3 green-jewel'> </div>
				<div id='green-jewel-three'className='col-xs-12 col-sm-12 col-md-3 col-lg-3 green-jewel'> </div>
     		</div>


     	</div>


     </div>

    );
  }
}

export default App;
