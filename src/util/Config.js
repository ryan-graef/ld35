Config = {
    name: "ReplaceWithGameName",
    version: "0.0.0",
    sprites: [
        //{key: "SpriteKey", imagePath: "path/to/image"}
        {key: 'tileset', imagePath: 'res/img/tileset.png'},
        {key: 'crate', imagePath: 'res/img/crate.png'},
        {key: 'volume-on', imagePath: 'res/img/volume-on.png'},
        {key: 'volume-off', imagePath: 'res/img/volume-off.png'},
        {key: 'home-screen', imagePath: 'res/img/home-screen.png'},
        {key: 'menu-button', imagePath: 'res/img/menu-button.png'},
        {key: 'background', imagePath: 'res/img/background.png'},
        {key: 'spike', imagePath: 'res/img/large-spike.png'},
        {key: 'water-drop', imagePath: 'res/img/water-drop.png'},
        {key: 'dust-poof', imagePath: 'res/img/dust.png'},
        {key: 'big-eye', imagePath: 'res/img/big-blob-eye.png'},
        {key: 'chakra-empty', imagePath: 'res/img/chakra-empty.png'},
        {key: 'chakra-full', imagePath: 'res/img/chakra-full.png'},
        {key: 'chakra-empty', imagePath: 'res/img/chakra-empty.png'},
        {key: 'circle-texture', imagePath: 'res/img/circle-texture.png'},
        {key: 'square-texture', imagePath: 'res/img/square-texture.png'},
        {key: 'triangle-texture', imagePath: 'res/img/triangle-texture.png'},
        {key: 'mamma-texture', imagePath: 'res/img/mamma-texture.png'}
    ],
    animSprites: [
        //{key: "SpriteKey", imagePath: "path/to/image", jsonPath: "path/to/json"}
        {key: 'blob-eyes', imagePath: "res/img/blob-eyes.png", jsonPath: "res/img/blob-eyes.json"},
        {key: 'plates', imagePath: "res/img/plates.png", jsonPath: "res/img/plates.json"}

    ],
    //tilemaps are assumed to be Tiled JSON.
    tileMaps: [
        //{key: "MapKey", jsonPath: "path/to/json"}
        {key: "test", jsonPath: "res/lvl/world.json"},
        {key: "title", jsonPath: "res/lvl/title.json"}
    ],
    fonts: [
        //{key: "FontKey", imagePath: "path/to/image", xmlPath: "path/to/XML"}
        {key: "font-75", imagePath: "res/fnt/font-75.png", xmlPath: "res/fnt/font-75.xml"},
        {key: "font-45", imagePath: "res/fnt/font-45.png", xmlPath: "res/fnt/font-45.xml"},
        {key: "font-26", imagePath: "res/fnt/font-26.png", xmlPath: "res/fnt/font-26.xml"}
    ],
    sfx: [
        //{key: "SfxKey", filePath: "path/to/audiofile"}
        {key: 'splash', filePath: 'res/sfx/splash.wav'},
        {key: 'transform', filePath: 'res/sfx/transform.wav'},
        {key: 'jump', filePath: 'res/sfx/jump.wav'},
        {key: 'land', filePath: 'res/sfx/land.wav'},
        {key: 'bmg-muffled', filePath: "res/sfx/bgm-muffled.ogg"}
    ],
    //music loops by default
    music: [
        //{key: "MusicKey", filePath: "path/to/audiofile"}
        {key: 'bgm', filePath: "res/sfx/bgm.ogg"},

    ]
}