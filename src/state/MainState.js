MainState = function(){ }

var bgm;
var bmgMuffled;
var splashSfx;
var transformSfx;
var jumpSfx;
var landSfx;

MainState.prototype = {
    level: null,
    cursorKeys: null,

    preload: function(){
        console.log('preload main state');
    },

    create: function(){
        //bgm = game.add.audio('bgm');
        //bgmMuffled = game.add.audio('bmg-muffled');
        bgm.loop = true;
        bgmMuffled.loop = true;
        bgm.play();
        bgmMuffled.volume = 0;
        bgmMuffled.play();
  
        //splashSfx = game.add.audio('splash');
        splashSfx.volume = 0.3;

        //transformSfx = game.add.audio('transform');
        transformSfx.volume = 0.8;

        //jumpSfx = game.add.audio('jump');

        //landSfx = game.add.audio('land');
        landSfx.volume = 0.4;

        //remove this line if not using lighting effects
        //game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        this.backgroundSprite = game.add.sprite(0, 0, 'background');

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 300;
        game.physics.p2.setImpactEvents(true);
        game.time.advancedTiming = true;
        
        var bmd = game.add.bitmapData(8, 8);
        bmd.context.fillStyle = '#FFFFFF';
        bmd.context.fillRect(0, 0, 8, 8);
        bmd.dirty = true;
        game.cache.addBitmapData('dot', bmd);

        // var bmdTextBoxTest = game.add.bitmapData(400, 100);
        // bmdTextBoxTest.context.fillStyle = "#FaaaaF";
        // bmdTextBoxTest.context.fillRect(0, 0, bmdTextBoxTest.width, bmdTextBoxTest.height);
        // bmdTextBoxTest.dirty = true;
        // game.cache.addBitmapData('textBoxTest', bmdTextBoxTest);

        //just draw all the water on one bmd across the whole world
        var bmdWater = game.add.bitmapData(game.width, game.height);
        bmdWater.context.fillStyle = "rgba(50, 124, 173, 0.5)";
        bmdWater.dirty = true;
        game.cache.addBitmapData('water', bmdWater);
        this.waterSprite = game.add.sprite(0, 0, bmdWater);

        var bmdPlatformTest = game.add.bitmapData(32, 32);
        bmdPlatformTest.context.fillStyle = "#FFFFFF";
        bmdPlatformTest.context.fillRect(0, 0, 32, 32);
        bmdPlatformTest.dirty = true;
        game.cache.addBitmapData('platformTest', bmdPlatformTest);

        var bmdCheckpointTest = game.add.bitmapData(32, 64);
        bmdCheckpointTest.context.fillStyle = "#FFFFFF";
        bmdCheckpointTest.context.fillRect(0, 0, 32, 64);
        bmdCheckpointTest.dirty = true;
        game.cache.addBitmapData('checkpointTest', bmdCheckpointTest);

        this.level = new Level();

        this.waterSprite.bringToTop();
        //this.level.mamaBlob.textureSprite.bringToTop();
        //this.level.mamaBlob.eyeLeft.bringToTop();
        //this.level.mamaBlob.eyeRight.bringToTop();

        this.cursorKeys = game.input.keyboard.createCursorKeys();


        
    },

    update: function(){
        this.level.update();

        this.backgroundSprite.x = game.camera.x/2;
        this.backgroundSprite.y = game.camera.y/1.5;
        this.waterSprite.x = game.camera.x;
        this.waterSprite.y = game.camera.y;
    },

    render: function(){
        game.debug.text(game.time.fps || '--', 2, 14, '#00ff00');
    }
}