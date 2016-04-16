MainState = function(){ }

MainState.prototype = {
    level: null,
    cursorKeys: null,

    preload: function(){
        console.log('preload main state');
    },

    create: function(){
        //remove this line if not using lighting effects
        //game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 100;
        game.physics.p2.setImpactEvents(true);
        
        var bmd = game.add.bitmapData(8, 8);
        bmd.context.fillStyle = '#FFFFFF';
        bmd.context.fillRect(0, 0, 8, 8);
        bmd.dirty = true;
        game.cache.addBitmapData('dot', bmd);

        var bmdCrateTest = game.add.bitmapData(64, 64);
        bmdCrateTest.context.fillStyle = "#FFFFFF";
        bmdCrateTest.context.fillRect(0, 0, 64, 64);
        bmdCrateTest.dirty = true;
        game.cache.addBitmapData('blockTest', bmdCrateTest);

        this.level = new Level();
        this.cursorKeys = game.input.keyboard.createCursorKeys();


        
    },

    update: function(){
        this.level.update();
    },

    render: function(){

    }
}