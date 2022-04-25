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
let wfc = new WFC.SimpleTiledModel(WFC.dataCircuit, "Test", 11, 8, false)
// wfc.initialize()
let imgBg = image.create(160, 120)
scene.setBackgroundImage(imgBg)
imgBg.print(Math.random().toString(),0,0)
wfc.generate(()=>{
    return Math.random()}
    )
imgBg.fill(3)
wfc.tiles.forEach((v,i)=>{
    imgBg.drawImage(v, (i%11)*wfc.tilesize, Math.idiv(i,11) * wfc.tilesize)
})
pause(100)
const imgOut = wfc.graphicsIncomplete(3)
sprites.create(imgOut, SpriteKind.Player)
