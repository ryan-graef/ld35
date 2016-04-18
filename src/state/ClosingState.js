ClosingState = function(){

}

ClosingState.prototype = {
    layers: [],
    textLines: [{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Excellent job today on your training. Tomorrow, we\'ll come back and do it again!'
            }, {
                subject: 'circle',
                emotion: 'annoyed',
                text: 'Ya senpai, but can we get something to eat first, I\'m staving!'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'ayyyyyyyy...',
            }],
    textLineIndex: 0,

    preload: function(){

    },

    create: function(){
        game.camera.x = 0;
        game.camera.y = 0;
        this.textLineIndex = 0;
        var bmd = game.add.bitmapData(8, 8);
        bmd.context.fillStyle = '#FFFFFF';
        bmd.context.fillRect(0, 0, 8, 8);
        bmd.dirty = true;
        game.cache.addBitmapData('dot', bmd);

        this.backgroundSprite = game.add.sprite(-100, 0, 'background');
        this.backgroundSprite.scale.setTo(0.7);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 300;
        this.map = game.add.tilemap('title');
        this.map.addTilesetImage('tileset', 'tileset');
        this.layers.push(this.map.createLayer('foreground'));
        //game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.map.setCollisionBetween(0, 100000);
        var bodies = game.physics.p2.convertTilemap(this.map, this.layers[0]);
        //game.physics.p2.setBoundsToWorld();
        // // this.mapCollisionGroup = game.physics.p2.createCollisionGroup();
        // // this.spikeCollisionGroup = game.physics.p2.createCollisionGroup();
        // game.physics.p2.updateBoundsCollisionGroup();

        this.hero = new Blob(150, 415, 'circle');
        this.mama = new Blob(700, 375, 'mama');

        this.textSprite = game.add.bitmapText(game.width - 325, game.height - 112, 'font-26', 'text@@', 22);
        this.incrementText();
    },

    update: function(){
        this.backgroundSprite.x -= 0.1;
        this.hero.drawStuff();
        this.mama.drawStuff();

        if(game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)){
            if(this.textLineIndex == this.textLines.length){ 
                game.state.start('MenuState');
            }else{
                this.incrementText();
            }
        }
    },

    incrementText: function(){
        var textObject = this.textLines[this.textLineIndex];
        if(textObject.subject == 'senpai'){
            this.textSprite.x = this.mama.x;
            this.textSprite.y = this.mama.y - 200;
            this.textSprite.anchor.setTo(0.75);
        }else{
            this.textSprite.x = this.hero.x;
            this.textSprite.y = this.hero.y - 100;
            this.textSprite.anchor.setTo(0.25);

            if(textObject.subject != this.hero.type){
                this.hero.type = textObject.subject;
                this.hero._createSprings();
                transformSfx.play();
            }
        }
        this.textSprite.setText(textObject.text);


        this.textLineIndex++;
    },

    render: function(){

    }
}