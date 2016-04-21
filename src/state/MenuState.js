MenuState = function(){ }

MenuState.prototype = {
    preload: function(){
        
    },

    create: function(){
        if(!bgm.isPlaying){
            bgm.play();
            //bgmMuffled.play();
        }

        game.input.keyboard.onDownCallback = null;



        this.backgroundSprite = game.add.sprite(-100, 0, 'background');
        this.backgroundSprite.scale.setTo(0.7);
        this.homeScreenSprite = game.add.sprite(0, 0, 'home-screen');

        this.gameTitleText = game.add.bitmapText(game.width/2, 150, 'font-75', Config.name, 70);
        this.gameTitleText.anchor.setTo(0.5);
        this.newButton = game.add.sprite(game.width/2 - 100, 270, 'menu-button');
        this.newButton.anchor.setTo(0.5);
        this.newButtonText = game.add.bitmapText(game.width/2 - 100, 270, 'font-45', 'Start', 50);
        this.newButtonText.anchor.setTo(0.5);
        this.newButton.inputEnabled = true;
        this.newButton.events.onInputDown.add(function(){
            game.state.start('OpeningState');
            transformSfx.play();
        })

        this.soundOffSprite = game.add.sprite(game.world.width - 50, 50, 'volume-off');
        this.soundOffSprite.inputEnabled = true;
        this.soundOffSprite.events.onInputDown.add(function(){
                bgm.play();
                this.soundOnSprite.bringToTop();
                this.soundOffSprite.sendToBack();
        }, this);
        this.soundOffSprite.anchor.setTo(0.5);
        this.soundOnSprite = game.add.sprite(game.width - 50, 50, 'volume-on');
        this.soundOnSprite.anchor.setTo(0.5);
        this.soundOnSprite.inputEnabled = true;
        this.soundOnSprite.events.onInputDown.add(function(){
                bgm.pause();
                this.soundOffSprite.bringToTop();
                this.soundOnSprite.sendToBack();
        }, this);
        
        
        this.helpButton = game.add.sprite(game.width/2 + 100, 270, 'menu-button');
        this.helpButton.anchor.setTo(0.5);
        this.helpButtonText = game.add.bitmapText(game.width/2 + 100, 270, 'font-45', 'How To\n  Play', 40);
        this.helpButtonText.anchor.setTo(0.5);
        this.helpButton.inputEnabled = true;
        this.helpButton.events.onInputDown.add(function(){
            game.state.start('InstructionState');
            transformSfx.play();
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