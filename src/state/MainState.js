MainState = function(){ }

MainState.prototype = {
    level: null,
    cursorKeys: null,
    hero: null,

    preload: function(){
        console.log('preload main state');
    },

    create: function(){
        //remove this line if not using lighting effects
        //game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 100;
        
        var bmd = game.add.bitmapData(8, 8);
        bmd.context.fillStyle = '#FFFFFF';
        bmd.context.fillRect(0, 0, 8, 8);
        bmd.dirty = true;
        game.cache.addBitmapData('dot', bmd);

        var bmdTileTest = game.add.bitmapData(32, 32);
        bmdTileTest.context.fillStyle = "#FFFFFF";
        bmdTileTest.context.fillRect(0, 0, 32, 32);
        bmdTileTest.dirty = true;
        game.cache.addBitmapData('tileTest', bmdTileTest);

        this.level = new Level();
        this.cursorKeys = game.input.keyboard.createCursorKeys();


        var blobCircle = new Blob(75, 75, 'cicle');
        this.hero = blobCircle;
    },

    update: function(){
        this.hero.update();

        if(this.cursorKeys.up.isDown){
            this.hero.centerPoint.body.velocity.y = -200;
        }

        if(this.cursorKeys.right.isDown){
            this.hero.centerPoint.body.velocity.x += 20;
        }else if(this.cursorKeys.left.isDown){
            this.hero.centerPoint.body.velocity.x -= 20;
        }
    },

    render: function(){

    }
}