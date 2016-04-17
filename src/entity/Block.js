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
		this.sprite.body.setCollisionGroup(this.level.blockCollisionGroup);
		this.sprite.body.collides([this.level.hero.blobCollisionGroup, this.level.mapCollisionGroup, this.level.blockCollisionGroup, this.level.leverCollisionGroup]);
	},

	pointContactListener: function(bodyA, bodyB){
		if(bodyA && bodyA.sprite && bodyA.sprite.key && bodyA.sprite.key == 'orange-plate'){
			this.level.levers.forEach(function(lever){
				if(lever.sprite == bodyA.sprite){
					lever.activate();
				}
			}, this);
		}
	},
}