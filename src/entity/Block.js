Block = function(x, y){
	this.x = x;
	this.y = y;
	this._construct();
}

Block.prototype = {
	sprite: null,

	_construct: function(){
		this.sprite = game.add.sprite(this.x, this.y, game.cache.getBitmapData('blockTest'));
		game.physics.p2.enable(this.sprite);
		this.sprite.body.mass = 15;
	}
}