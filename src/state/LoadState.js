LoadState = function(){ }

LoadState.prototype = {
    progressBar: null,

    preload: function(){
        this.progressBar = this.add.sprite(this.game.world.centerX - 250, this.game.world.centerY, 'loadBar');
        this.progressBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.progressBar);

        //IMPORTANT: Configure all necessary resources in Config.js
        Config.sprites.forEach(function(sprite){
            game.load.image(sprite.key, sprite.imagePath);
        }, this);

        Config.animSprites.forEach(function(animSprite){
            game.load.atlasJSONHash(animSprite.key, animSprite.imagePath, animSprite.jsonPath);
        }, this);

        Config.tileMaps.forEach(function(tileMap){
            game.load.tilemap(tileMap.key, tileMap.jsonPath, null, Phaser.Tilemap.TILED_JSON);
        }, this);

        Config.fonts.forEach(function(font){
            game.load.bitmapFont(font.key, font.imagePath, font.xmlPath);
        }, this);

        Config.sfx.forEach(function(sfx){
            game.load.audio(sfx.key, sfx.filePath);
        }, this);

        Config.music.forEach(function(music){
            game.load.audio(music.key, music.filePath);
        }, this);
        
    },

    create: function(){
        bgm = game.add.audio('bgm');
        bgmMuffled = game.add.audio('bgm-muffled');
        bgm.loop = true;
       //bgm.play();

        splashSfx = game.add.audio('splash');
        splashSfx.volume = 0.3;

        transformSfx = game.add.audio('transform');
        transformSfx.volume = 0.8;

        jumpSfx = game.add.audio('jump');

        landSfx = game.add.audio('land');
        landSfx.volume = 0.4;

        game.state.start('MenuState');
    },

    update: function(){
        
    },

    render: function(){

    }
}