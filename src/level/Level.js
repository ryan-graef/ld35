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
	spikes: [],
	lastCheckpoint: null,

	mapCollisionGroup: null,

	blockCollisionGroup: null,

	leverCollisionGroup: null,

	waterCollisionGroup: null,

	mamaCollisionGroup: null,
	spikeCollisionGroup: null,
	mamaBlob: null,

	isWaterTile: function(tile){
		return tile.index == 431;
	},

	_construct: function(){
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('tileset', 'tileset');
		this.layers.push(this.map.createLayer('collision'));
		this.layers.push(this.map.createLayer('triggers'));
		this.layers.push(this.map.createLayer('main'));
		game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.map.setCollisionBetween(432, 432);
		game.physics.p2.setBoundsToWorld();
		this.mamaCollisionGroup = game.physics.p2.createCollisionGroup();
		this.mapCollisionGroup = game.physics.p2.createCollisionGroup();
		this.blockCollisionGroup = game.physics.p2.createCollisionGroup();
		this.waterCollisionGroup = game.physics.p2.createCollisionGroup();
		this.leverCollisionGroup = game.physics.p2.createCollisionGroup();
		this.spikeCollisionGroup = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();

		var blobCircle = new Blob(750, 75, 'circle', this);
        this.hero = blobCircle;
        game.camera.follow(this.hero.centerPoint);
        game.camera.deadzone = new Phaser.Rectangle(200, 100, 460, 440);


		var waterTiles = [];
		var waterStart = null;
		var tiles = this.layers[0].layer.data;
		for(var row = 0; row < tiles.length; row++){
			for(var col = 0; col < tiles[row].length; col++){
				var tile = tiles[row][col];

				//surface of water
				if(this.isWaterTile(tile) && tiles[row -1] && !this.isWaterTile(tiles[row -1][col])){
					if(!waterStart){
						waterStart = tile;
					}else if(tiles[row][col + 1] && !this.isWaterTile(tiles[row][col + 1])){
						var findEndRow = row;
						do{
							findEndRow++;
						}while(tiles[findEndRow] && this.isWaterTile(tiles[findEndRow][col]));

						

						waterTiles.push([waterStart, tile, (findEndRow-1)*32]);
						waterStart = null;
					}
				}

				//generic "water here" tile
				if(tile.index == 431){
					tile.alpha = 1;
				}

				//spike
				if(tile.index == 407){
					tile.alpha = 0;

					var tempSprite = game.add.sprite(tile.worldX, tile.worldY+20, 'spike');
					game.physics.p2.enable(tempSprite);
					tempSprite.body.dynamic = false;
					tempSprite.body.setCollisionGroup(this.spikeCollisionGroup);
					tempSprite.body.collides([this.hero.blobCollisionGroup]);
				}

				//collision
				if(tile.index == 432){
					tile.alpha = 0;
				}
			}
		}

		var tiles = this.layers[1].layer.data;
		for(var row = 0; row < tiles.length; row++){
			for(var col = 0; col < tiles[row].length; col++){
				var tile = tiles[row][col];

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
								tempSprite.body.setCollisionGroup(this.blockCollisionGroup);
								tempSprite.body.collides([this.hero.blobCollisionGroup]);
								this.platforms.push(tempSprite);
							}
						}, this);
					}, this, tile.properties.switchType));
				}

				//checkpoint tile
				if(tile.properties.checkpoint){
					tile.alpha = 0;
					var meTile = tile;
					var tempSprite = game.add.sprite(tile.worldX+16, tile.worldY, game.cache.getBitmapData('checkpointTest'));
					tempSprite.anchor.set(0.5);
					this.checkpoints.push(tempSprite);
				}
			}
		}

        waterTiles.forEach(function(waterTileSet){
			this.water.push(new Water(waterTileSet[0].worldX, waterTileSet[0].worldY, waterTileSet[1].worldX, waterTileSet[1].worldY, waterTileSet[2], this));
		}, this);

        this.mamaBlob = new Blob(game.width - 200, game.height -200, 'mama', this);
        this.blocks.push(new Block(350, 250, this));

        var furthestLeft = this.checkpoints[0];
        this.checkpoints.forEach(function(checkpoint){
        	if(checkpoint.x < furthestLeft.x){
        		furthestLeft = checkpoint;
        	}
        });
        this.lastCheckpoint = furthestLeft;

        var bodies = game.physics.p2.convertTilemap(this.map, this.layers[0]);
		for(var i = 0; i < bodies.length; i++){
			var tileBody = bodies[i];
			tileBody.setCollisionGroup(this.mapCollisionGroup);
			tileBody.collides([this.hero.blobCollisionGroup, this.blockCollisionGroup, this.waterCollisionGroup]);
		}
	},

	update: function(){
		this.hero.update();
		this.mamaBlob.drawStuff();
		this.mamaBlob.moveRight();

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