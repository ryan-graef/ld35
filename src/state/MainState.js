MainState = function(){ }

MainState.prototype = {
    blobs: [],
    backgroundBmd: [],

    preload: function(){
        console.log('preload main state');
    },

    create: function(){
        //remove this line if not using lighting effects
        //game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        game.physics.startSystem(Phaser.Physics.P2JS);
        
        var bmd = game.add.bitmapData(8, 8);
        bmd.context.fillStyle = '#FFFFFF';
        bmd.context.fillRect(0, 0, 8, 8);
        bmd.dirty = true;
        game.cache.addBitmapData('dot', bmd);


        var blobCircle = new Blob(game.world.randomX, game.world.randomY, 'cicle');
        var blobSquare = new Blob(game.world.randomX, game.world.randomY, 'square');
        var blobTriangle = new Blob(game.world.randomY, game.world.randomY, 'triangle');

        this.blobs.push(blobCircle);
        this.blobs.push(blobSquare);
        this.blobs.push(blobTriangle);

    },

    update: function(){
        this.blobs.forEach(function(blob){
            blob.update();
        }, this);
    },

    render: function(){

    }
}