Lever = function(x, y, listener, context, type, level){
	this.x = x;
	this.y = y;
	this.listener = listener;
	this.context = context;
	this.type = type;
	this._construct();
}

Lever.prototype = {
	sprite: null,
	active: false,
	listener: null,
	context: null,
	type: null,

	_construct: function(){
		this.key= "";
		if(this.type == "lever"){
			this.key = "leverTest";
		}else{
			this.key = "orange-plate";
		}
		
		if(this.key == "orange-plate"){
			this.sprite = game.add.sprite(this.x-24, this.y+36, this.key);
			this.sprite.animations.add('inactive', [0]);
			this.sprite.animations.add('active', [1]);
			this.sprite.play('inactive');
			game.physics.p2.enable(this.sprite);
			this.sprite.body.setCollisionGroup(this.context.leverCollisionGroup);
			this.sprite.body.collides([this.context.blockCollisionGroup]);
			this.sprite.body.dynamic = false;
		}else{
			this.sprite = game.add.sprite(this.x-24, this.y, game.cache.getBitmapData(this.key));
		}
		this.sprite.anchor.setTo(0.5);
		
		if(this.type == "plate"){
			this.sprite.y += 32;
		}
	},

	activate: function(){
		if(!this.active){
			if(this.key == "orange-plate"){
				this.sprite.animations.play('active');
				this.active = true;
				this.sprite.y += 8;
				this.listener.call(this.context);
			}else{
				this.active = true;

				var bmd = game.cache.getBitmapData(this.key);
				bmd.context.fillStyle = '#00FFFF';
				bmd.context.fillRect(0, 0, 48, 64);
		        bmd.dirty = true;

		        this.listener.call(this.context);
		    }
	    }
	},

	update: function(){

	}
}