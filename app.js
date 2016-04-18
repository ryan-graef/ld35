var WIDTH = 960;
var HEIGHT = 640;
var game;

document.addEventListener("DOMContentLoaded", function(event){
	//create a new game and run it
	game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'game');

	//add the game states
	game.state.add('StartupState', new StartupState());
	game.state.add('MenuState', new MenuState());
	game.state.add('LoadState', new LoadState());
	game.state.add('InstructionState', new InstructionState());
	game.state.add('MainState', new MainState());

	//kickoff the starting state, logo if not on localhost, mainstate otherwise
    if(isDev()){
        game.state.start('LoadState');
    }else{
        game.state.start('StartupState');
    }
});

window.isDev = function(){
    return (window.location.href.indexOf('localhost') > -1);
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

