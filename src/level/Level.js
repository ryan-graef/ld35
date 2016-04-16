Level = function(){
	this._construct();
},

Level.prototype = {
	key: '',
	map: null,
	layers: [],
	blocks: [],
	water: [],
	levers: [],
	platforms: [],
	checkpoints: [],
	lastCheckpoint: null,


	_construct: function(){
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layers.push(this.map.createLayer('Tile Layer 1'));
		game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.map.setCollisionBetween(0, 394);

		game.physics.p2.convertTilemap(this.map, this.layers[0]);

		var waterTiles = [];
		var waterStart = null;
		var tiles = this.layers[0].layer.data;
		for(var row = 0; row < tiles.length; row++){
			for(var col = 0; col < tiles[row].length; col++){
				var tile = tiles[row][col];

				//surface of water
				if(tile.index == 400){
					tile.alpha = 0;

					if(!waterStart){
						waterStart = tile;
					}else if(tiles[row][col + 1] && tiles[row][col + 1].index != 400){
						var findEndRow = row;
						do{
							findEndRow++;
						}while(tiles[findEndRow] && tiles[findEndRow][col].index === 399);

						

						waterTiles.push([waterStart, tile, (findEndRow-1)*32]);
						waterStart = null;
					}
				}

				//generic "water here" tile
				if(tile.index == 399){
					tile.alpha = 4;
				}

				//one of many lever tiles
				if(tile.properties.triggerType){
					tile.alpha = 0;
					var meTile = tile;
					var activatesArray = JSON.parse(tile.properties.triggerActivates);
					this.levers.push(new Lever(tile.x*32, tile.y*32, function(){
						activatesArray.forEach(function(activates){
							var tile = tiles[activates[1]][activates[0]];
							if(meTile.properties.triggerType == 'block'){
								this.blocks.push(new Block(tile.worldX, tile.worldY, this));
							}else{
								var tempSprite = game.add.sprite(tile.worldX, tile.worldY, game.cache.getBitmapData('platformTest'));
								game.physics.p2.enable(tempSprite);
								tempSprite.body.dynamic = false;
								this.platforms.push(tempSprite);
							}
						}, this);
					}, this, tile.properties.switchType));
				}

				//checkpoint tile
				if(tile.properties.checkpoint){
					tile.alpha = 0;
					var meTile = tile;
					var tempSprite = game.add.sprite(tile.worldX, tile.worldY-32, game.cache.getBitmapData('checkpointTest'));
					this.checkpoints.push(tempSprite);
				}
			}
		}
		console.log(waterTiles);
		waterTiles.forEach(function(waterTileSet){
			this.water.push(new Water(waterTileSet[0].worldX, waterTileSet[0].worldY, waterTileSet[1].worldX, waterTileSet[1].worldY, waterTileSet[2]));
		}, this);

		this.blocks.push(new Block(350, 250, this));

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