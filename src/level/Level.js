Level = function(){
	this._construct();
},

Level.prototype = {
	key: '',
	map: null,
	layers: [],
	blocks: [],
	water: [],


	_construct: function(){
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layers.push(this.map.createLayer('Tile Layer 1'));
		game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.map.setCollisionBetween(0, 398);

		game.physics.p2.convertTilemap(this.map, this.layers[0]);

		var waterTiles = [];
		var waterStart = null;
		var tiles = this.layers[0].layer.data;
		for(var row = 0; row < tiles.length; row++){
			for(var col = 0; col < tiles[row].length; col++){
				var tile = tiles[row][col];

				if(tile.index == 400){
					tile.index = -1;

					if(!waterStart){
						waterStart = tile;
					}else if(tiles[row][col + 1] && tiles[row][col + 1].index != 400){
						waterTiles.push([waterStart, tile]);
						waterStart = null;
					}
				}
			}
		}
		console.log(waterTiles);
		waterTiles.forEach(function(waterTileSet){
			this.water.push(new Water(waterTileSet[0].worldX, waterTileSet[0].worldY, waterTileSet[1].worldX, waterTileSet[1].worldY));
		}, this);

		this.blocks.push(new Block(350, 250));

		var blobCircle = new Blob(750, 75, 'circle', this);
        this.hero = blobCircle;
        game.camera.follow(this.hero.centerPoint);
        game.camera.deadzone = new Phaser.Rectangle(200, 100, 460, 440);
	},

	update: function(){
		this.hero.update();

		this.water.forEach(function(waterTil){
			waterTil.update();
		}, this);
	},

	setBlockMass: function(mass){
		this.blocks.forEach(function(block){
			block.sprite.body.mass = mass;
		}, this);
	}
}