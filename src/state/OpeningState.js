OpeningState = function(){

}

OpeningState.prototype = {
    layers: [],
    textLines: [{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Heya! Wake up, sleepy face. (Space to continue)'
            }, {
                subject: 'circle',
                emotion: 'annoyed',
                text: 'Ugghh what time is it?'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'It doesn\'t matter, you\'re late. We were supposed to\nmeet up at the training course for transformation training\ntoday, remember?',
            },{
                subject: 'circle',
                emotion: 'normal',
                text: 'Oh ya! Let\'s go!'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Hold on! Today I\'ve set up a series of obstacles for you to\nlearn how to do transform between our three basic natures.\nThis world is a dangerous place, so pay close attention.'
            },{
                subject: 'circle',
                emotion: 'normal',
                text: 'Ya senpai!'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Before we begin, remember your basic training:\nleft and right to move, up to jump.'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'In your current state, you float on water but are\npunctured by spikes easily.  You can also push blue-colored switches.\nPress A or 1 to take on this form.'
            },{
                subject: 'circle',
                emotion: 'normal',
                text: 'But senpai, I don\'t want to get punctured!'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Don\'t fret!  In your square shape, you are immune to spikes but\nsink in water.  Press S or 2 to use this form.'
            },{
                subject: 'square',
                emotion: 'shocked',
                text: 'Senpai, I\'m so heavy!'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Yes, in this form, you\'ll be heavy but strong. You can even push\nblocks around!  The blocks can activate orange switches.'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Your final form is taken by pressing D or 3.  You\ncan glide quickly through water with this form.'
            },{
                subject: 'triangle',
                emotion: 'annoyed',
                text: 'Ughhhh I feel terrible in this form!'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Heya, it\'s because you\'re still on land! In this\nform, the speciality is diving in water.  You can also press rose switches\nand use your momentum to reach high areas.'
            },{
                subject: 'senpai',
                emotion: 'annoyed',
                text: 'To be able to swap between these natures,\nyou need to learn about transformation energy.'
            },{
                subject: 'circle',
                emotion: 'normal',
                text: 'Transformation energy?'
            },{
                subject: 'senpai',
                emotion: 'annoyed',
                text: 'Yes, transformation energy. Every change\nyou make requires transformation energy, of which you have a limited amount.'
            },{
                subject: 'circle',
                emotion: 'normal',
                text: 'But how do I get more energy?'
            },{
                subject: 'senpai',
                emotion: 'normal',
                text: 'Normally, once you\'ve used all your energy\nyou would have to wait until it was fully charged again, but for today\'s training\nI\'ve setup special spots for you to recharge so we can train\nwithout stopping.'
            },{
                subject: 'senpai',
                emotion: 'annoyed',
                text: 'If you change too much, you won\'t be able to get\nthrough the obstacles without restarting. You will need to use R to restart\nif you\'ve used up all of your transformation energy between\ncheckpoints.'
            },{
                subject: 'senpai',
                emotion: 'annoyed',
                text: 'Now, go through the obstacles\nI\'ve set up, and we\'ll meet at the end.'
            },{
                subject: 'circle',
                emotion: 'shocked',
                text: 'I will do my best!'
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
                game.state.start('MainState');
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