Config = {
    name: "ReplaceWithGameName",
    version: "0.0.0",
    sprites: [
        //{key: "SpriteKey", imagePath: "path/to/image"}
        {key: 'tileset', imagePath: 'res/img/tileset.png'},
        {key: 'circle-texture', imagePath: 'res/img/circle-texture.png'},
        {key: 'square-texture', imagePath: 'res/img/square-texture.png'},
        {key: 'triangle-texture', imagePath: 'res/img/triangle-texture.png'},
    ],
    animSprites: [
        //{key: "SpriteKey", imagePath: "path/to/image", jsonPath: "path/to/json"}
        {key: 'blob-eyes', imagePath: "res/img/blob-eyes.png", jsonPath: "res/img/blob-eyes.json"}
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
    ],
    //music loops by default
    music: [
        //{key: "MusicKey", filePath: "path/to/audiofile"}
    ]
}