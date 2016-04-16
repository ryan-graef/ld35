Block = function(x, y, level){
	this.x = x;
	this.y = y;
	this.level = level;
	this._construct();
}

Block.prototype = {
	sprite: null,

	_construct: function(){
		this.sprite = game.add.sprite(this.x, this.y, game.cache.getBitmapData('blockTest'));
		game.physics.p2.enable(this.sprite);
		this.sprite.body.onBeginContact.add(this.pointContactListener, this);
		this.sprite.body.mass = 150;
	},

	pointContactListener: function(bodyA, bodyB){
		if(bodyA && bodyA.sprite && bodyA.sprite.key && bodyA.sprite.key.key == 'plateTest'){
			this.level.levers.forEach(function(lever){
				if(lever.sprite == bodyA.sprite){
					lever.activate();
				}
			}, this);
		}
	},
}