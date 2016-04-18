InstructionState = function(){

}

InstructionState.prototype = {
	preload: function(){
        
    },

    create: function(){
        this.backgroundSprite = game.add.sprite(-100, 0, 'background');
        this.backgroundSprite.scale.setTo(0.7);
        this.helpSprite = game.add.sprite(0, 0, 'help-screen');

        this.backButton = game.add.sprite(game.width - 150, game.height - 75, 'menu-button');
        this.backButton.anchor.setTo(0.5);
        this.backButtonText = game.add.bitmapText(game.width - 150, game.height - 75, 'font-45', 'Back', 40);
        this.backButtonText.anchor.setTo(0.5);
        this.backButton.inputEnabled = true;
        this.backButton.events.onInputDown.add(function(){
            game.state.start('MenuState');
        });
    },

    update: function(){
    	this.backgroundSprite.x += 0.1;
    },

    render: function(){

    }
}