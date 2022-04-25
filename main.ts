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

//["bridge", "component", "connection", "corner", "substrate", "t", "track", "transition", "viad", "vias", "wire", "skew", "dskew", "turn"]
// ["t", "track", "turn", "viad", "vias", "dskew", "bridge"]
let wfc = new WFC.SimpleTiledModel(
    WFC.dataCircuit, 
    // ["t", "track", "turn", "viad", "vias", "dskew", "bridge"],
    ["turn", "viad"],
    11, 8, false)//"Test2"

let imgBg = image.create(wfc.FMX * wfc.tilesize, wfc.FMY * wfc.tilesize)
scene.setBackgroundImage(imgBg)
scene.setBackgroundColor(7)
imgBg.fill(3)

wfc.generate(()=>{return Math.random()})
wfc.tiles.forEach((v,i)=>{
    imgBg.drawImage(v, (i%11)*wfc.tilesize, Math.idiv(i,11) * wfc.tilesize)
})
pause(100)
const imgOut = wfc.graphicsIncomplete(3)
let spriteOut = sprites.create(imgOut, SpriteKind.Player)

controller.A.onEvent(ControllerButtonEvent.Pressed, ()=>{
    spriteOut.setFlag(SpriteFlag.Invisible, true)
})
controller.A.onEvent(ControllerButtonEvent.Released, () => {
    spriteOut.setFlag(SpriteFlag.Invisible, false)
})
