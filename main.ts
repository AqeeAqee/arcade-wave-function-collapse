
const tmTileSize = 1 << TileScale.Sixteen
const tilesCol = 11
const tilesRow = 11
let ms=control.micros()
const wfc = new WFC.SimpleTiledModel(
    WFC.dataCircuit,        // only 1 kind data defined, by now
    WFC.Subsets.Chip2Side,   // !!change this to try diffrent subset
    tilesCol, tilesRow,     // try diffrent size
    false                   // false only, by now
    )
const tmBuf = control.createBuffer(4 + tilesCol * tilesRow)
tmBuf.setNumber(NumberFormat.UInt16LE, 0, tilesCol)
tmBuf.setNumber(NumberFormat.UInt16LE, 2, tilesRow)
let defTile = image.create(tmTileSize, tmTileSize)
defTile.fill(1)
const tmData=tiles.createTilemap(tmBuf, image.create(tilesCol*wfc.tilesize, tilesRow*wfc.tilesize), [defTile], TileScale.Sixteen)
tiles.setTilemap(tmData)
const cursorSpr = sprites.create(image.create(tmTileSize, tmTileSize), 0)
cursorSpr.image.drawRect(0, 0, tmTileSize, tmTileSize, 5)
let newLoc = cursorSpr.tilemapLocation()
cursorSpr.setPosition(newLoc.x, newLoc.y)
scene.cameraFollowSprite(cursorSpr)

controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (choosingIndex!=null) {
        return
    }
})

let choosingIndex:number
wfc.choosePositionHandler=()=>{
    for(let x=0;x<wfc.FMX;x++)
    for(let y=0;y<wfc.FMY;y++){
        const tempTile=image.create(16,16)
        wfc.drawIncompleteTile(x, y, tempTile, 1, 1, 3)
        const scene = game.currentScene();
        const index = scene.tileMap.getImageType(tempTile);
        scene.tileMap.setTileAt(x,y, index);
    }
    choosingIndex=null
    while (choosingIndex==null){
        let newLoc2 = cursorSpr.tilemapLocation()
        if (controller.A.isPressed()) {
            choosingIndex = newLoc2.col + wfc.FMX * newLoc2.row
        } else if (controller.B.isPressed()) {
            choosingIndex = -1
        } else if (controller.left.isPressed()) {
            newLoc2 = newLoc2.getNeighboringLocation(CollisionDirection.Left)
        } else if (controller.right.isPressed()) {
            newLoc2 = newLoc2.getNeighboringLocation(CollisionDirection.Right)
        } else if (controller.up.isPressed()) {
            newLoc2 = newLoc2.getNeighboringLocation(CollisionDirection.Top)
        } else if (controller.down.isPressed()) {
            newLoc2 = newLoc2.getNeighboringLocation(CollisionDirection.Bottom)
        }
        if (!(tmData.isOutsideMap(newLoc2.col, newLoc2.row))) {
            cursorSpr.setPosition(newLoc2.x, newLoc2.y)
        }
        pause(100)
    }
    return choosingIndex
}
let choosingTile:number
wfc.chooseTileHandler=(x,y)=>{
    cursorSpr.left=x * tmTileSize
    cursorSpr.top= y * tmTileSize

    const options:string[]=[]
    const tiles:Image[]=[]
    const w = wfc.wave[x+y*wfc.FMX]
    for (let i = 0; i < w.length;i++){
        if(w[i]){
            options.push(i.toString())
            tiles.push(wfc.tiles[i])
        }
    }

    blockMenu.showMenu(options, 10, MenuLocation.BottomHalf)
    blockMenu.setIcons(tiles)

    choosingTile=null
    while (choosingTile==null) {
        pause(1)
        if (controller.B.isPressed()) {
            blockMenu.closeMenu()
            pause(150)
            choosingTile = -1
        }
    }
    return choosingTile
}
blockMenu.onMenuOptionSelected(function (option, index) {
    blockMenu.closeMenu()
    pause(150)
    choosingTile = parseInt(option)
})

while (1) {
    const result = wfc.generate()
    game.splash(result?"WFC generate successfully!":"Failed")
}



// //for complete result display
// let spriteOut = sprites.create(wfc.graphicsIncomplete(3), SpriteKind.Player)
// controller.moveSprite(spriteOut)

// controller.A.onEvent(ControllerButtonEvent.Released, () => {
//     spriteOut.setScale(1, ScaleAnchor.Middle)
// })
// controller.A.onEvent(ControllerButtonEvent.Pressed, ()=>{
// spriteOut.setScale(.5, ScaleAnchor.Middle)
// })

// wfc.generate()
// ms = control.micros() - ms
// info.setScore(ms / 1000)

// //printed on backgound, move output image away with arrow keys to see
// //Tile patterns(at all possible angle)
// let imgBg = image.create(wfc.FMX * wfc.tilesize, wfc.FMY * wfc.tilesize)
// wfc.tiles.forEach((v,i)=>{
//     imgBg.drawImage(v, (i%9)*(wfc.tilesize+1), Math.idiv(i,9) * (wfc.tilesize+1))
// })
// scene.setBackgroundImage(imgBg)
