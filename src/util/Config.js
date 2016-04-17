Config = {
    name: "ReplaceWithGameName",
    version: "0.0.0",
    sprites: [
        //{key: "SpriteKey", imagePath: "path/to/image"}
        {key: 'tileset', imagePath: 'res/img/tileset.png'},
        {key: 'spike', imagePath: 'res/img/large-spike.png'},
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
        {key: 'orange-plate', imagePath: "res/img/orange-plate.png", jsonPath: "res/img/orange-plate.json"}

    ],
    //tilemaps are assumed to be Tiled JSON.
    tileMaps: [
        //{key: "MapKey", jsonPath: "path/to/json"}
        {key: "test", jsonPath: "res/lvl/test.json"}
    ],
    fonts: [
        //{key: "FontKey", imagePath: "path/to/image", xmlPath: "path/to/XML"}
    ],
    sfx: [
        //{key: "SfxKey", filePath: "path/to/audiofile"}
        {key: 'splash', filePath: 'res/sfx/splash.wav'},
        {key: 'transform', filePath: 'res/sfx/transform.wav'},
        {key: 'jump', filePath: 'res/sfx/jump.wav'},
        {key: 'land', filePath: 'res/sfx/land.wav'}
    ],
    //music loops by default
    music: [
        //{key: "MusicKey", filePath: "path/to/audiofile"}
        {key: 'bgm', filePath: "res/sfx/bgm.ogg"}
    ]
}