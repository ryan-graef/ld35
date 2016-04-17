MenuState = function(){ }

MenuState.prototype = {
    preload: function(){
        
    },

    create: function(){
        bgm = game.add.audio('bgm');
        bgm.loop = true;
       //bgm.play();

        splashSfx = game.add.audio('splash');
        splashSfx.volume = 0.3;

        transformSfx = game.add.audio('transform');
        transformSfx.volume = 0.8;

        jumpSfx = game.add.audio('jump');

        landSfx = game.add.audio('land');
        landSfx.volume = 0.4;

        //bgm.play();

        this.backgroundSprite = game.add.sprite(-100, 0, 'background');
        this.backgroundSprite.scale.setTo(0.7);
        this.homeScreenSprite = game.add.sprite(0, 0, 'home-screen');
        // game.physics.startSystem(Phaser.Physics.P2JS);
        // game.physics.p2.gravity.y = 0;

        // this.map = game.add.tilemap('title');
        // this.map.addTilesetImage('tileset', 'tileset');
        // this.map.createLayer('foreground');

        // var bmd = game.add.bitmapData(8, 8);
        // bmd.context.fillStyle = '#FFFFFF';
        // bmd.context.fillRect(0, 0, 8, 8);
        // bmd.dirty = true;
        // game.cache.addBitmapData('dot', bmd);
        // var bmdWater = game.add.bitmapData(10000, game.height);
        // bmdWater.context.fillStyle = "rgba(50, 124, 173, 0.5)";
        // bmdWater.dirty = true;
        // game.cache.addBitmapData('water', bmdWater);
        // var waterSprite = game.add.sprite(0, 0, bmdWater);

        // this.water = new Water(12*32, 17*32, 17*32, 17*32, 4*32);

        this.gameTitleText = game.add.bitmapText(game.world.centerX, 100, 'font-75', Config.name, 75);
        this.gameTitleText.anchor.setTo(0.5);
        this.newButton = game.add.sprite(game.world.centerX - 100, 220, 'menu-button');
        this.newButton.anchor.setTo(0.5);
        this.newButtonText = game.add.bitmapText(game.world.centerX - 100, 220, 'font-45', 'Start', 50);
        this.newButtonText.anchor.setTo(0.5);
        this.newButtonText.inputEnabled = true;
        this.newButtonText.events.onInputDown.add(function(){
            game.state.start('MainState');
        })
        
        this.helpButton = game.add.sprite(game.world.centerX + 100, 220, 'menu-button');
        this.helpButton.anchor.setTo(0.5);
        this.helpButtonText = game.add.bitmapText(game.world.centerX + 100, 220, 'font-45', 'How To\n  Play', 40);
        this.helpButtonText.anchor.setTo(0.5);
        this.helpButtonText.inputEnabled = true;
        this.helpButtonText.events.onInputDown.add(function(){
            game.state.start('InstructionState');
        });

        // this.circle = new Blob(75, 400, 'circle');
        // this.square = new Blob(700, 500, 'square');
        // this.triangle = new Blob(500, 550, 'triangle');
    },

    update: function(){
        // this.water.update();
         this.backgroundSprite.x -= 0.1;
        // this.circle.update();
        // this.square.update();
        // this.triangle.update();
    },

    render: function(){

    }
}