/**
 * while (!wfc.isGenerationComplete()) {
 * 
 * pause(100)
 * 
 * info.changeLifeBy(1)
 * 
 * }
 */
/**
 * const imgOut = wfc.graphicsComplete()
 */
/**
 * if(imgOut)
 */
/**
 * sprites.create(imgOut, SpriteKind.Player)
 */
/**
 * else
 */
/**
 * info.setLife(99)
 */

let ms=control.micros()
let wfc = new WFC.SimpleTiledModel(
    WFC.dataCircuit, 
    "Turnless",
    33, 33, false)
wfc.generate(()=>{return Math.random()})
ms=control.micros()-ms
info.setScore(ms/1000)
// let imgBg = image.create(wfc.FMX * wfc.tilesize, wfc.FMY * wfc.tilesize)
// scene.setBackgroundImage(imgBg)
// scene.setBackgroundColor(7)
// imgBg.fill(3)



// wfc.tiles.forEach((v,i)=>{
//     imgBg.drawImage(v, (i%11)*wfc.tilesize, Math.idiv(i,11) * wfc.tilesize)
// })


const imgOut = wfc.graphicsIncomplete(3)
let spriteOut = sprites.create(imgOut, SpriteKind.Player)
spriteOut.setScale(.5, ScaleAnchor.Middle)
controller.moveSprite(spriteOut)
controller.A.onEvent(ControllerButtonEvent.Pressed, ()=>{
    spriteOut.setScale(1, ScaleAnchor.Middle)
    // spriteOut.setFlag(SpriteFlag.Invisible, true)
})
controller.A.onEvent(ControllerButtonEvent.Released, () => {
    spriteOut.setScale(.5, ScaleAnchor.Middle)
    // spriteOut.setFlag(SpriteFlag.Invisible, false)
})
