Blob = function(x, y, type, level){
	this.x = x;
	this.y = y;
	this.type = type;
	this.level = level;
	this._construct();
}

Blob.prototype = {
	pointCount: 12,
	surfaceArea: 600,
	elacticity: 15,
	dampening: 3,
	outerPoints: null,
	centerPoint: null,
	springs: null,

	textureBmd: null,
	textureSprite: null,

	chakraFullSprite: null,
	chakraEmptySprite: null,
	chakraCount: 0,
	maxChakraCount: 1000,
	chakraCropRect: null,

	canJump: true,
	jumpSpeed: 200,

	eyeLeft: null,
	eyeRight: null,

	canPlaySplash: true,
	canPlayLand: false,

	dustPoofs: null,

	blobCollisionGroup: null,

	alive: true,

	_construct: function(){
		this.textureBmd = game.add.bitmapData(this.surfaceArea, this.surfaceArea);
		this.textureBmd.context.strokeStyle = "#FFFFFF";
		this.textureBmd.context.fillStyle = "#FFFFFF";
		this.textureSprite = game.add.sprite(0, 0, this.textureBmd);
		this.textureSprite.anchor.setTo(0.5);
		this.textureSprite.x = this.x;

		this.dustPoofs = game.add.physicsGroup(Phaser.Physics.P2JS);

		if(this.level){
			this.chakraEmptySprite = game.add.sprite(25, game.height - 50, 'chakra-empty');
			this.chakraEmptySprite.fixedToCamera = true;
			this.chakraEmptySprite.alpha = 1;
		}

		if(this.level){
			this.blobCollisionGroup = game.physics.p2.createCollisionGroup();
		}

		this._createBlob();

		this.chakraCount = this.maxChakraCount;

		this.chakraCropBmd = game.add.bitmapData(game.width, game.height);
		this.chakraCropSprite = game.add.sprite(0, 0, this.chakraCropBmd);
		this.chakraCropSprite.fixedToCamera = true;
		this.chakraCropSprite.bringToTop();
	},

	die: function(){
		this.alive = false;
		this.removeSprings();
	},

	removeSprings: function(){
		this.springs.forEach(function(spring){
			game.physics.p2.removeSpring(spring);
		}, this);
		this.springs = [];
	},

	_createBlob: function(){
		this.springs = [];
		this.outerPoints = [];
		var spacing = 2*Math.PI/this.pointCount;

		

        
        game.physics.p2.updateBoundsCollisionGroup();

		//arrange points into a circle
		for(var i = 0; i < this.pointCount; i++){
            var pointX = this.x + Math.sqrt(this.surfaceArea*Math.PI)*Math.cos(spacing*i); //x component of vector: v*cos(angle)
            var pointY = this.y + Math.sqrt(this.surfaceArea*Math.PI)*Math.sin(spacing*i); //y component of vector: v*sin(angle)

            var point = game.add.sprite(pointX, pointY, game.cache.getBitmapData('dot'));
            game.physics.p2.enable(point);
            point.alpha = 0;
            point.anchor.setTo(0.5);
            point.body.onBeginContact.add(this.pointContactListener, this);
            if(this.level){
	            if(this.type == 'mama'){
	            	point.body.setCollisionGroup(this.level.mamaCollisionGroup);
	            }else{
	            	point.body.setCollisionGroup(this.blobCollisionGroup);
	            	point.body.collides([this.level.mapCollisionGroup, this.level.blockCollisionGroup, this.level.waterCollisionGroup, this.level.spikeCollisionGroup]);
	            }
	        }

            point.body.fixedRotation = true;
            point.alpha = 0;

            this.outerPoints.push(point);
        }

        var centerX = this.x;
        var centerY = this.y;
        this.centerPoint = game.add.sprite(centerX, centerY, game.cache.getBitmapData('dot'));
        this.centerPoint.anchor.setTo(0.5);
        game.physics.p2.enable(this.centerPoint);
        this.centerPoint.alpha = 0;
        if(this.level){
        	this.centerPoint.body.setCollisionGroup(this.blobCollisionGroup);
       		this.centerPoint.body.collides([this.level.mapCollisionGroup, this.level.blockCollisionGroup]);
        }
        this.centerPoint.body.fixedRotation = true;
        if(this.type == 'mama' && this.level){
        	this.centerPoint.body.setCollisionGroup(this.level.mamaCollisionGroup);
        }
        //this.centerPoint.body.setCollisionGroup(this.blobCollisionGroup);
        if(this.type != 'mama'){
        	game.camera.follow(this.centerPoint);
        }

        this._createSprings();

        if(this.type != 'mama'){
	        this.eyeLeft = game.add.sprite(this.x, this.y, 'blob-eyes');
	        this.eyeLeft.anchor.setTo(0.5);
	        this.eyeLeft.animations.add('circle-eye', [0]);
	        this.eyeLeft.animations.add('square-eye', [2]);
	        this.eyeLeft.animations.add('triangle-eye', [1]);
	       	this.eyeLeft.animations.play(this.type+'-eye');
	        this.eyeRight = game.add.sprite(this.x, this.y, 'blob-eyes');
	        this.eyeRight.anchor.setTo(0.5);
	        this.eyeRight.animations.add('circle-eye', [0]);
	        this.eyeRight.animations.add('square-eye', [2]);
	        this.eyeRight.animations.add('triangle-eye', [1]);
	        this.eyeRight.animations.play(this.type+'-eye');
	    }else{
	    	this.eyeLeft = game.add.sprite(this.x, this.y, 'big-eye');
	        this.eyeLeft.anchor.setTo(0.5);
	        this.eyeRight = game.add.sprite(this.x, this.y, 'big-eye');
	        this.eyeRight.anchor.setTo(0.5);
	    }
    },

	pointContactListener: function(bodyA, bodyB){
		if(bodyA && bodyA.sprite && bodyA.sprite.key == 'spike' && this.type != "square"){
			this.die();
		}
	},

	_createSprings: function(){

		this.removeSprings();

		if(this.type == 'square'){
        	var idealPositions = this._idealSquare();
        }else if(this.type == 'triangle'){
        	var idealPositions = this._idealTriangle();
        }else if(this.type == 'mama'){
        	var idealPositions = this._idealBigCircle();
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

			//if(this.type == 'triangle'){
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
			//}
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

	reset: function(){
		this.chakraCount = this.maxChakraCount;
		if(this.level){
			this.x = this.level.lastCheckpoint.x;
			this.y = this.level.lastCheckpoint.y;
		}
		this.destroy();
		this._createBlob();
		this.alive = true;
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

	_idealBigCircle: function(){
		var idealPositions = [];
		var spacing = 2*Math.PI/this.pointCount;
		for(var i = 0; i < this.pointCount; i++){
            var pointX = this.x + Math.sqrt((this.surfaceArea*16)*Math.PI)*Math.cos(spacing*i); //x component of vector: v*cos(angle)
            var pointY = this.y + Math.sqrt((this.surfaceArea*16)*Math.PI)*Math.sin(spacing*i); //y component of vector: v*sin(angle)

            var point = [pointX, pointY];
            //point.alpha = 0;

            idealPositions.push(point);
        }

		return idealPositions;
	},

	destroy: function(){
		this.springs.forEach(function(spring){
			game.physics.p2.removeSpring(spring);
		}, this);
		this.springs = [];
		this.outerPoints.forEach(function(point){
			point.destroy();
		}, this);
		this.centerPoint.destroy();
		this.eyeLeft.destroy();
		this.eyeRight.destroy();
		this.type = "circle";
		this.canPlaySplash = true;
		this.canPlayLand = false;

	},

	moveRight: function(){
		if(this.x <= this.level.lastCheckpoint.x + game.width){
			this.centerPoint.body.velocity.x = 80;
		}else{
			this.centerPoint.body.velocity.x = 0;
		}
	},

	drawStuff: function(){
		//center blob
		this.x = this.centerPoint.x;
		this.y = this.centerPoint.y;
		this.textureSprite.x = this.centerPoint.x;
		this.textureSprite.y = this.centerPoint.y;

		var dX = (this.type == 'triangle' ? 15 : 25);
		var dy = (this.type == 'triangle' ? 10 : 15);
		if(this.type == 'mama'){
			dX = 50;
			dy = 50;
		}
		this.eyeLeft.x = this.centerPoint.x - dX;
		this.eyeLeft.y = this.centerPoint.y - dy;
		this.eyeRight.x = this.centerPoint.x + dX;
		this.eyeRight.y = this.centerPoint.y - dy;

		//draw some stuff
		this.textureBmd.context.clearRect(0, 0, this.textureBmd.width, this.textureBmd.height);
		var myImage = null;
		if(this.type == 'circle'){
			myImage = game.cache.getImage('circle-texture');
		}else if(this.type == 'square'){
			myImage = game.cache.getImage('square-texture');
		}else if(this.type == 'triangle'){
			myImage = game.cache.getImage('triangle-texture');
		}else{
			myImage = game.cache.getImage('mamma-texture');
		}
		var myBorderColor = null;
		if(this.type == 'circle'){
			myBorderColor = "#457a31";
		}else if(this.type == 'square'){
			myBorderColor = "#bfa800";
		}else if(this.type == 'triangle'){
			myBorderColor = "#a60d00";
		}else{
			myBorderColor = '#00827f';
		}
		var myShadingColor = null;
		if(this.type == 'circle'){
			myShadingColor = 'rgba(91, 188, 46, 0.7)';
		}else if(this.type == 'square'){
			myShadingColor = 'rgba(229, 204, 27, 0.7)';
		}else if(this.type == 'triangle'){
			myShadingColor = 'rgba(252, 103, 72, 0.7)';
		}else{
			myShadingColor = 'rgba(0, 130, 127, 0.7)';
		}
		var pattern = this.textureBmd.context.createPattern(myImage, 'repeat');
		this.textureBmd.context.fillStyle = pattern;
		this.textureBmd.context.beginPath();
		this.textureBmd.context.moveTo(this.outerPoints[0].x - this.x + this.textureSprite.width/2, this.outerPoints[0].y  - this.y + this.textureSprite.height/2);
		for(var i = 1; i <= this.outerPoints.length; i++){
			var me = this.outerPoints[(i)%this.outerPoints.length];
			this.textureBmd.context.lineTo(me.x - this.x + this.textureSprite.width/2, me.y - this.y + this.textureSprite.height/2);
		}
		this.textureBmd.context.beginPath();
		this.textureBmd.context.moveTo(this.outerPoints[0].x - this.x + this.textureSprite.width/2, this.outerPoints[0].y  - this.y + this.textureSprite.height/2);
		for(var i = 1; i <= this.outerPoints.length; i++){
			var me = this.outerPoints[(i)%this.outerPoints.length];
			this.textureBmd.context.lineTo(me.x - this.x + this.textureSprite.width/2, me.y - this.y + this.textureSprite.height/2);
		}
		this.textureBmd.context.closePath();
		this.textureBmd.context.fillStyle = myShadingColor;
		this.textureBmd.context.fill();
		this.textureBmd.context.strokeStyle = myBorderColor;
		this.textureBmd.context.lineWidth = 3;
		this.textureBmd.context.stroke();
		this.textureBmd.context.beginPath();
		this.textureBmd.context.fillStyle = pattern;
		
		for(var i = 0; i <= this.outerPoints.length; i++){
			var me = this.outerPoints[(i)%this.outerPoints.length];
			var dXCenter = me.x - this.centerPoint.x;
			var dYCenter = me.y - this.centerPoint.y;
			if(i == 0){
				this.textureBmd.context.moveTo(this.outerPoints[0].x - this.x + this.textureSprite.width/2 - dXCenter/4, this.outerPoints[0].y  - this.y + this.textureSprite.height/2 - dYCenter/4);
			}else{
				this.textureBmd.context.lineTo(me.x - this.x + this.textureSprite.width/2 - dXCenter/4, me.y - this.y + this.textureSprite.height/2 - dYCenter/4);
			}
		}
		this.textureBmd.context.closePath();
		this.textureBmd.context.fill();
		this.textureBmd.dirty = true;
	},

	update: function(){
		this.drawStuff();

		if(this.level){
			var chakraImage = game.cache.getImage('chakra-full');
			this.chakraCropBmd.context.clearRect(0, 0, this.chakraCropBmd.width, this.chakraCropBmd.height);
			this.chakraCropBmd.context.drawImage(chakraImage, 0, 0, chakraImage.width*(this.chakraCount/this.maxChakraCount), chakraImage.height, 25, game.height - 50, chakraImage.width*(this.chakraCount/this.maxChakraCount), chakraImage.height);
			this.chakraCropBmd.dirty = true;
			this.chakraCropSprite.bringToTop();
		}

		//reset
		if(game.input.keyboard.downDuration(Phaser.Keyboard.R, 10)){
			this.reset();
		}

		if(this.alive && this.level){
				this.level.checkpoints.forEach(function(checkpoint){
				if(this.centerPoint.x >= checkpoint.left && this.centerPoint.x <= checkpoint.right && this.centerPoint.y >= checkpoint.top && this.centerPoint.y <= checkpoint.bottom){
					if(this.level.lastCheckpoint != checkpoint){
						this.chakraCount = this.maxChakraCount;
						this.level.lastCheckpoint = checkpoint;
					}
				}
			}, this);

			this.level.levers.forEach(function(lever){
				if(this.centerPoint.x >= lever.sprite.left && this.centerPoint.x <= lever.sprite.right && this.centerPoint.y >= lever.sprite.top && this.centerPoint.y <= lever.sprite.bottom){
					if(lever.key == 'leverTest'){
						lever.activate();
					}
				}
			}, this);

			//input
			if(this.chakraCount > 0){
				if(game.input.keyboard.downDuration(Phaser.Keyboard.A, 10)){
					this.type = "circle";
					this._createSprings();
					this.level.setBlockMass(500);
					this.chakraCount--;
					this.eyeRight.animations.play('circle-eye');
					this.eyeLeft.animations.play('circle-eye');
					transformSfx.play();
				}else if(game.input.keyboard.downDuration(Phaser.Keyboard.S, 10)){
					this.type = "square";
					this.level.setBlockMass(5);
					this._createSprings();
					this.chakraCount--;
					this.eyeRight.animations.play('square-eye');
					this.eyeLeft.animations.play('square-eye');
					transformSfx.play();
				}else if(game.input.keyboard.downDuration(Phaser.Keyboard.D, 10)){
					this.type = "triangle";
					this.level.setBlockMass(500);
					this._createSprings();
					this.chakraCount--;
					this.eyeRight.animations.play('triangle-eye');
					this.eyeLeft.animations.play('triangle-eye');
					transformSfx.play();
				}
			}

	        //if in water
	        if(this.isInWater()){
	        	waterFloatSpeed = 0;
	        	//if circle, float up
	        	if(this.type == 'circle'){
	        		waterFloatSpeed = -15;
	        	}else{
	        		waterFloatSpeed = -3;
	        	}

		        	this.centerPoint.body.velocity.y += waterFloatSpeed;
		       		this.outerPoints.forEach(function(point, index){
		       			if(point.body.velocity.y > -150){ //max speed to make dive jumping non-redundant
		        			point.body.velocity.y += waterFloatSpeed;
		       			}

		        		//water sluggishnesss
		        		point.body.velocity.x -= point.body.velocity.x/60;

		        		var diffX = point.x - this.centerPoint.x;
						var diffY = point.y - this.centerPoint.y;
		        		if(this.type == 'triangle' && (index >= Math.floor(this.outerPoints.length/3) || index <= Math.floor(this.outerPoints.length/3)*2)){
				    		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
				    			point.body.velocity.y += -diffY*2;
				    			point.body.velocity.x += -diffX*2;
				    		}else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
				    			point.body.velocity.y += diffY*2;
				    			point.body.velocity.x += diffX*2;
				    		}
			    		}
		        	}, this);


	        }

	    	if(this.type != 'triangle' || !this.isInWater()){	
	    		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.checkCanJump()){
			        this.centerPoint.body.velocity.y = (this.type === 'triangle' ? -this.jumpSpeed/2 : -this.jumpSpeed);
			        this.outerPoints.forEach(function(point){
			        	point.body.velocity.y = (this.type === 'triangle' ? -this.jumpSpeed/2 : -this.jumpSpeed);
			        }, this);

			        jumpSfx.play();
			        this.canPlayLand = true;

			        if(this.isInWater()){
			        	this.noMoreJumpsInWater = true;
			        }
	    		}
		    }

		    if(this.canPlayLand && this.checkCanJump() && this.centerPoint.body.velocity.y > 0){
		    	landSfx.play();
		    	this.canPlayLand = false;
		    	var x = this.x;
				var y = this.y + 40;

				for(var i = 0; i < 5; i++){
					var drop = this.dustPoofs.create(x, y, 'dust-poof');
					drop.body.setCollisionGroup(this.level.waterCollisionGroup);
					drop.body.collides([this.level.mapCollisionGroup]);
					drop.body.velocity.y = game.rnd.integerInRange(-100, -50);
					drop.body.velocity.x = 5*game.rnd.integerInRange(-50, 50)
				}
		    }else if(!this.checkCanJump() && this.centerPoint.body.velocity.y > 0){
		    	this.canPlayLand = true;
		    }

		    if(this.noMoreJumpsInWater && !this.isInWater()){
		    	this.noMoreJumpsInWater = false;
		    }

		    if(this.isInWater() && this.canPlaySplash){
		    	this.canPlaySplash = false;
		    	splashSfx.play();
		    }else if(!this.isInWater() && !this.canPlaySplash){
		    	this.canPlaySplash = true;
		    	splashSfx.play();
		    }

	        if(this.type == 'triangle'){
				this.outerPoints.forEach(function(point, index){
	    			var diffX = point.x - this.centerPoint.x;
					var diffY = point.y - this.centerPoint.y;

					if(index != 0 && index % Math.floor(this.outerPoints.length/3) == 0){
						if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			    			point.body.velocity.y += diffX/4;
			    			point.body.velocity.x += -diffY/4;
			    		}else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			    			point.body.velocity.y += -diffX/4;
			    			point.body.velocity.x += diffY/4;
			    		}
			    	}
	    		}, this);
	    	}else{
	    		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		            this.centerPoint.body.velocity.x += 20;
						this.eyeLeft.scale.x = 1;
						this.eyeRight.scale.x = 1;
		        }else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		            this.centerPoint.body.velocity.x -= 20;
		            	this.eyeLeft.scale.x = -1;
						this.eyeRight.scale.x = -1;
		        }
	    	}
	    }
	},

	isInWater: function(){
		var onTile = this.level.map.getTile(Math.floor(this.x/32), Math.floor(this.y/32), this.level.layers[0]);
		return (onTile && onTile.index == 431);
	},

	checkCanJump: function(){
		var trueCount = 0;

		if(this.type == 'circle' && this.isInWater() && !this.noMoreJumpsInWater){
			return true;
		}

		if(this.type !== 'square'){
			this.outerPoints.forEach(function(point){
				//not going to pretend I know how this works.  From http://phaser.io/examples/v2/p2-physics/tilemap-gravity
				//just run over every point of the soft-physics object body to determine if enough are touching to warrant
				//an "on the ground" state and the ability to jump
				var yAxis = p2.vec2.fromValues(0, 1);
				var result = false;

				for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++){
	       	 		var c = game.physics.p2.world.narrowphase.contactEquations[i];
					if (c.bodyA === point.body.data || c.bodyB === point.body.data){
			            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
			            if (c.bodyA === point.body.data) d *= -1;
			            if (d > 0.5) result = true;
			        }
			    }

			    if(result){
			    	trueCount++;
			    }
			}, this);
		}

		return trueCount > 0;
	}

	
}