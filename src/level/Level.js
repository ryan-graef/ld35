Level = function(){
	this._construct();
},

Level.prototype = {
	key: '',
	map: null,
	layers: [],

	_construct: function(){
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layers.push(this.map.createLayer('Tile Layer 1'));
		this.layers[0].resizeWorld();
		this.map.setCollisionBetween(0, 5000);

		game.physics.p2.convertTilemap(this.map, this.layers[0]);
	}
}