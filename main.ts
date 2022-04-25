//Aqee, 2022-4-25
//WFC(wave function collapse), ref: https://github.com/mxgmn/WaveFunctionCollapse

let ms=control.micros()
const wfc = new WFC.SimpleTiledModel(
    WFC.dataCircuit,        // only 1 kind data defined, by now
    WFC.Subsets.Turnless,   // !!change this to try diffrent subset
    22, 22,                 // try diffrent size
    false                   // false only, by now
    ) 

wfc.generate()
ms=control.micros()-ms
info.setScore(ms/1000)

let spriteOut = sprites.create(wfc.graphicsIncomplete(3), SpriteKind.Player)
controller.moveSprite(spriteOut)

controller.A.onEvent(ControllerButtonEvent.Pressed, ()=>{
    spriteOut.setScale(.5, ScaleAnchor.Middle)
})
controller.A.onEvent(ControllerButtonEvent.Released, () => {
    spriteOut.setScale(1, ScaleAnchor.Middle)
})

//Tile patterns(at all possible angle)
//printed on backgound, move output image away with arrow keys to see 
let imgBg = image.create(wfc.FMX * wfc.tilesize, wfc.FMY * wfc.tilesize)
scene.setBackgroundImage(imgBg)
wfc.tiles.forEach((v,i)=>{
    imgBg.drawImage(v, (i%9)*(wfc.tilesize+1), Math.idiv(i,9) * (wfc.tilesize+1))
})
