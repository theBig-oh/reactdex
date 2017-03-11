function yoMama(name){
	this.name = name;

	return this.name
}

yoMama.prototype = {
	fat: function(weight){
		return weight > 100
	},
	old: function(age){
		return age > 100
	}
	ugly: function(mirror){
		var ugly = false
		if(!mirror){
			ugly = true;
			return ugly
		}
		return ugly
	}


}