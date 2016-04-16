Water = function(startX, startY, endX, endY, height, level){
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.level = level;
	this.height = height;

	this._construct();
}

Water.prototype = {
	points: [],
	springs: [],
	length: null,
	segmentLength: 32,
	segmentCount: null,

	_construct: function(){
		var diffX = Math.abs(this.startX - this.endX);
		this.length = diffX
		this.segmentCount = Math.ceil(this.length/this.segmentLength);

		
		var lastPoint = null;
		for(var i = 0; i <= this.segmentCount + 1; i++){
			var point = game.add.sprite(this.startX + (diffX/this.segmentCount)*i, this.startY, game.cache.getBitmapData('dot'));
			point.scale.setTo(0.25);
			game.physics.p2.enable(point);
			point.body.setCollisionGroup(this.level.waterCollisionGroup);
			point.body.collides([this.level.hero.blobCollisionGroup, this.level.blockCollisionGroup]);
			point.alpha = 0;
			
			
			if(i%2 == 0){
				point.body.data.gravityScale = 0;
			}

			if(i == 0 || i == this.segmentCount + 1){
				point.body.dynamic = false;
			}

			if(lastPoint){
				this.springs.push(game.physics.p2.createSpring(point, lastPoint, 24, 500, 2));
			}

			this.points.push(point);
			lastPoint = point;
		}


		for(var i = 0; i < this.segmentCount - 1; i++){
			//this.springs.push(game.physics.p2.addSpring(this.points[i], this.points[i+1], this.segmentLength, 50, 2));
		}
	},

	update: function(){
		var bmd = game.cache.getBitmapData('water');
		bmd.context.clearRect(0, 0, bmd.width, bmd.height);
		bmd.context.beginPath();
		bmd.context.moveTo(this.points[0].x, this.points[1].y);
		for(var i = 1; i < this.points.length; i++){
			bmd.context.lineTo(this.points[i].x, this.points[i].y);
		}
		bmd.context.lineTo(this.points[this.points.length -1].x, this.points[this.points.length -1].y + this.height);
		bmd.context.lineTo(this.points[0].x, this.points[0].y + this.height);
		bmd.context.closePath();
		bmd.context.fill();
		bmd.dirty = true;

	}
}