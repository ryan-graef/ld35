Blob = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type;
	this._construct();
}

Blob.prototype = {
	pointCount: 12,
	surfaceArea: 600,
	elacticity: 25,
	dampening: 1.5,
	outerPoints: null,
	centerPoint: null,
	springs: null,

	textureBmd: null,
	textureSprite: null,

	_construct: function(){
		this.springs = [];
		this.outerPoints = [];
		var spacing = 2*Math.PI/this.pointCount;

		this.textureBmd = game.add.bitmapData(this.surfaceArea/4, this.surfaceArea/4);
		this.textureBmd.context.strokeStyle = "#FFFFFF";
		this.textureBmd.context.fillStyle = "#FFFFFF";
		this.textureSprite = game.add.sprite(0, 0, this.textureBmd);
		this.textureSprite.anchor.setTo(0.5);
		this.textureSprite.x = this.x;
		this.textureSprite.y = this.y;

		//arrange points into a circle
		for(var i = 0; i < this.pointCount; i++){
            var pointX = this.x + Math.sqrt(this.surfaceArea*Math.PI)*Math.cos(spacing*i); //x component of vector: v*cos(angle)
            var pointY = this.y + Math.sqrt(this.surfaceArea*Math.PI)*Math.sin(spacing*i); //y component of vector: v*sin(angle)

            var point = game.add.sprite(pointX, pointY, game.cache.getBitmapData('dot'));
            game.physics.p2.enable(point);
            point.body.fixedRotation = true;
            //point.alpha = 0;

            this.outerPoints.push(point);
        }

        var centerX = this.x;
        var centerY = this.y;
        this.centerPoint = game.add.sprite(centerX, centerY, game.cache.getBitmapData('dot'));
        game.physics.p2.enable(this.centerPoint);
        this.centerPoint.body.fixedRotation = true;

        this._createSprings();
	},

	_createSprings: function(){

		this.springs.forEach(function(spring){
			game.physics.p2.removeSpring(spring);
		}, this);
		this.springs = [];

		if(this.type == 'square'){
        	var idealPositions = this._idealSquare();
        }else if(this.type == 'triangle'){
        	var idealPositions = this._idealTriangle();
        }else{ //circle
        	var idealPositions = this._idealCircle();
        }

		for(var i = 0; i < this.outerPoints.length; i++){
       		var me = this.outerPoints[i];
        	var them = this.outerPoints[(i+1)%this.outerPoints.length];
        	var themThem = this.outerPoints[(i+2)%this.outerPoints.length];
        	var meMe = this.outerPoints[(i-1) < 0 ? this.outerPoints.length - 1 : i];
        	var idealPositionMe = idealPositions[i];
        	var idealPositionMeMe = idealPositions[(i-1) < 0 ? this.outerPoints.length - 1 : i];
        	var idealPositionThem = idealPositions[(i+1)%this.outerPoints.length]
        	var idealPositionThemThem = idealPositions[(i+2)%this.outerPoints.length]

        	var d = Math.sqrt(Math.pow(idealPositionMe[0] - idealPositionThem[0], 2) + Math.pow(idealPositionMe[1] - idealPositionThem[1], 2), 2);
        	var dCenter = Math.sqrt(Math.pow(idealPositionMe[0] - this.centerPoint.x, 2) + Math.pow(idealPositionMe[1] - this.centerPoint.y, 2), 2);
        	var dThem = Math.sqrt(Math.pow(idealPositionMe[0] - idealPositionThemThem[0], 2) + Math.pow(idealPositionMe[1] - idealPositionThemThem[1], 2), 2);
        	var dMe = Math.sqrt(Math.pow(idealPositionMe[0] - idealPositionMeMe[0], 2) + Math.pow(idealPositionMe[1] - idealPositionMeMe[1], 2), 2);

        	this.springs.push(game.physics.p2.createSpring(me, them, d, this.elacticity, this.dampening));
        	this.springs.push(game.physics.p2.createSpring(me, this.centerPoint, dCenter, this.elacticity, this.dampening));
        	this.springs.push(game.physics.p2.createSpring(me, themThem, dThem, this.elacticity, this.dampening));
			this.springs.push(game.physics.p2.createSpring(me, meMe, dMe, this.elacticity, this.dampening));

			if(this.type == 'triangle'){
				for(var q = 0; q < this.outerPoints.length; q++){
					if(i != q){
						var me = this.outerPoints[i];
						var them = this.outerPoints[q];
						var idealPositionMe = idealPositions[i];
						var idealPositionThem = idealPositions[q];

						var d = Math.sqrt(Math.pow(idealPositionMe[0] - idealPositionThem[0], 2) + Math.pow(idealPositionMe[1] - idealPositionThem[1], 2), 2);

						this.springs.push(game.physics.p2.createSpring(me, them, d, this.elacticity, this.dampening));
					}
				}
			}
        }
	},

	_idealSquare: function(){
		var idealPositions = [];
		var sideLength = this.surfaceArea/6; //cheating to make the square look about the same width as the circle

		for(var i = 0; i < this.pointCount; i++){
			var pointX = 0;
			var pointY = 0;

            if(i < this.pointCount/4 * 1){ //top side
            	pointX = this.x - sideLength/2 + (sideLength/(this.pointCount/4) * (i));
            	pointY = this.y - sideLength/2;
            }else if(i < this.pointCount/4 * 2){ // right side
            	pointX = this.x + sideLength/2;
            	pointY = this.y - sideLength/2 + (sideLength/(this.pointCount/4) * (i - this.pointCount/4 * 1));
            }else if(i < this.pointCount/4 * 3){ // bottom side
            	pointX = this.x + sideLength/2 - (sideLength/(this.pointCount/4) * (i - this.pointCount/4 * 2));
            	pointY = this.y + sideLength/2;
            }else{ // left side
            	pointX = this.x - sideLength/2;
            	pointY = this.y + sideLength/2 - (sideLength/(this.pointCount/4) * (i - this.pointCount/4 * 3));
            }

            var point = [pointX, pointY];
            //point.alpha = 0;

            idealPositions.push(point);
        }

		return idealPositions;
	},

	_idealTriangle: function(){
		var idealPositions = [];
		var sideLength = this.surfaceArea/8; //cheating to make the triangle's points fall on the circle

		for(var i = 0; i < this.pointCount; i++){
			var pointX = 0;
			var pointY = 0;

			if(i < this.pointCount/3 * 1){ //right side
            	pointX = this.x + ((sideLength/2)/(this.pointCount/3) * (i));
            	pointY = this.y - sideLength/2 + (sideLength/(this.pointCount/3) * (i));
            }else if(i < this.pointCount/3 * 2){ //bottom side
            	pointX = this.x + sideLength/2 - (sideLength/(this.pointCount/3) * (i - this.pointCount/3 * 1));
            	pointY = this.y + sideLength/2;
            }else{ //left side
            	pointX = this.x - sideLength/2 + ((sideLength/2)/(this.pointCount/3) * (i - this.pointCount/3 * 2));
            	pointY = this.y + sideLength/2 - (sideLength/(this.pointCount/3) * (i - this.pointCount/3 * 2));
            }

            var point = [pointX, pointY];
            //point.alpha = 0;

            idealPositions.push(point);
        }

		return idealPositions;
	},

	_idealCircle: function(){
		var idealPositions = [];
		var spacing = 2*Math.PI/this.pointCount;
		for(var i = 0; i < this.pointCount; i++){
            var pointX = this.x + Math.sqrt(this.surfaceArea*Math.PI)*Math.cos(spacing*i); //x component of vector: v*cos(angle)
            var pointY = this.y + Math.sqrt(this.surfaceArea*Math.PI)*Math.sin(spacing*i); //y component of vector: v*sin(angle)

            var point = [pointX, pointY];
            //point.alpha = 0;

            idealPositions.push(point);
        }

		return idealPositions;
	},

	update: function(){
		this.x = this.centerPoint.x;
		this.y = this.centerPoint.y;
		this.textureSprite.x = this.centerPoint.x;
		this.textureSprite.y = this.centerPoint.y;

		this.textureBmd.context.clearRect(0, 0, this.textureBmd.width, this.textureBmd.height);
		this.springs.forEach(function(spring){
			this.textureBmd.context.beginPath();
			this.textureBmd.context.moveTo(spring.data.bodyA.position[0]*-20 - this.x + this.textureBmd.width/2, spring.data.bodyA.position[1]*-20 - this.y + this.textureBmd.height/2);
            this.textureBmd.context.lineTo(spring.data.bodyB.position[0]*-20 - this.x + this.textureBmd.width/2, spring.data.bodyB.position[1]*-20 - this.y + this.textureBmd.height/2);
            this.textureBmd.context.stroke();
		}, this);
		//this.textureBmd.rect(0, 0, this.textureBmd.width, this.textureBmd.height);
		this.textureBmd.dirty = true;

		if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
			this.type = "circle";
			this._createSprings();
			console.log('a');
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
			this.type = "square";
			this._createSprings();
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
			this.type = "triangle";
			this._createSprings();
		}
	}

	
}