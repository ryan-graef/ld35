Water = function(startX, startY, endX, endY){
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;

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
		for(var i = 0; i < this.segmentCount; i++){
			var point = game.add.sprite(this.startX + (diffX/this.segmentCount)*i, this.startY, game.cache.getBitmapData('dot'));
			point.scale.setTo(0.25);
			game.physics.p2.enable(point);
			
			if(i%2 == 0){
				point.body.data.gravityScale = 0;
			}

			if(i == 0 || i == this.segmentCount -1){
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

	}
}