Lever = function(x, y, context, type,activatesArray, triggerType){
	this.x = x;
	this.y = y;
	this.context = context;
	this.type = type;
	this.triggerType = triggerType;
	this.activatesArray = activatesArray;
	this._construct();
}

Lever.prototype = {
	sprite: null,
	active: false,
	listener: null,
	context: null,
	type: null,

	_construct: function(){
		this.key= this.type;

		this.sprite = game.add.sprite(this.x-24, this.y+36, 'plates');
		this.sprite.animations.add('inactive-orange', [0]);
		this.sprite.animations.add('active-orange', [1]);
		this.sprite.animations.add('inactive-aqua', [2]);
		this.sprite.animations.add('active-aqua', [3]);
		this.sprite.animations.add('inactive-rose', [4]);
		this.sprite.animations.add('active-rose', [5]);
		this.sprite.play('inactive-'+this.type);
		game.physics.p2.enable(this.sprite, true);
		this.sprite.body.setRectangle(this.sprite.width, this.sprite.height - 6, 0, 6);
		this.sprite.body.setCollisionGroup(this.context.leverCollisionGroup);
		this.sprite.body.collides([this.context.blockCollisionGroup, this.context.hero.blobCollisionGroup]);
		this.sprite.body.dynamic = false;
		this.sprite.anchor.setTo(0.5);
		
		if(this.type == "plate"){
			this.sprite.y += 32;
		}
	},

	activate: function(box){
		if(!this.active){
			if((this.type == "orange" && box=='box') || (this.type == "aqua" && box=='circle') || (this.type == "rose" && box=='triangle')){
				this.sprite.animations.play('active-'+this.type);
				this.active = true;
				this.sprite.y += 8;
				this.handleActivate();
			}
	    }
	},

	update: function(){

	},

	destroy: function(){
		this.sprite.destroy();
	},

	handleActivate: function(){
		this.activatesArray.forEach(function(activates){
			if(this.triggerType == 'block'){
				this.context.blocks.push(new Block(activates[0]*32, activates[1]*32, this.context));
			}else{
				var tempSprite = game.add.sprite(activates[0]*32, activates[1]*32, game.cache.getBitmapData('platformTest'));
				game.physics.p2.enable(tempSprite);
				tempSprite.body.dynamic = false;
				tempSprite.body.setCollisionGroup(this.context.blockCollisionGroup);
				tempSprite.body.collides([this.context.hero.blobCollisionGroup]);
				this.context.platforms.push(tempSprite);
			}
		}, this);
	}
}