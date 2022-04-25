
let ms=control.micros()
const wfc = new WFC.SimpleTiledModel(
    WFC.dataCircuit, 
    "Turnless",
    22, 22, false)

wfc.generate(()=>{return Math.random()})
ms=control.micros()-ms
info.setScore(ms/1000)

let spriteOut = sprites.create(wfc.graphicsIncomplete(3), SpriteKind.Player)
controller.moveSprite(spriteOut)

controller.A.onEvent(ControllerButtonEvent.Pressed, ()=>{
    spriteOut.setScale(.5, ScaleAnchor.Middle)
    // spriteOut.setFlag(SpriteFlag.Invisible, true)
})
controller.A.onEvent(ControllerButtonEvent.Released, () => {
    spriteOut.setScale(1, ScaleAnchor.Middle)
    // spriteOut.setFlag(SpriteFlag.Invisible, false)
})

// Show Tiles
// let imgBg = image.create(wfc.FMX * wfc.tilesize, wfc.FMY * wfc.tilesize)
// scene.setBackgroundImage(imgBg)
// wfc.tiles.forEach((v,i)=>{
//     imgBg.drawImage(v, (i%11)*wfc.tilesize, Math.idiv(i,11) * wfc.tilesize)
// })
