


let wfc = new WFC.SimpleTiledModel(WFC.dataCircuit, "Turnless", 20, 20, false)
// wfc.initialize()
wfc.generate(()=>{return Math.random()})
// while (!wfc.isGenerationComplete()) {
//     pause(100)
//     info.changeLifeBy(1)
// }

let mySprite = sprites.create(wfc.graphicsComplete(), SpriteKind.Player)