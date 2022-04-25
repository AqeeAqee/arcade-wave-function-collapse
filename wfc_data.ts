namespace WFC {
    export class tile {
        bitmap: Image
        constructor(
            public name: string,
            public symmetry: string,
            public weight: number
        ) {
            const test = getTileImage(this.name)
            this.bitmap = test
        }
    }

    export class neighbor {
        constructor(
            public left: string,
            public right: string
        ) { }
    }
    export class subset {
        constructor(
            public name: string,
            public tile: string[]
        ) { }
    }
    type Map<T> = { [index: string]: T }
    export class Data {
        public unique: boolean
        constructor(
            public tilesize: number = 14,
            public tiles: tile[],
            public neighbors: neighbor[],
            public subsets: Map<string[]>
        ) {
            this.unique == false
        }
    }

    export let dataCircuit = new Data(
        14,
        [
            new tile("bridge", "I", 1.0),
            new tile("component", "X", 30.0),
            new tile("connection", "T", 10.0),
            new tile("corner", "L", 10.0),
            new tile("substrate", "X", 2.0),
            new tile("t", "T", 0.1),
            new tile("track", "I", 2.0),
            new tile("transition", "T", 0.4),
            new tile("turn", "L", 1.0),
            new tile("viad", "I", 0.1),
            new tile("vias", "T", 0.3),
            new tile("wire", "I", 0.5),
            new tile("skew", "L", 2.0),
            new tile("dskew", "\\", 2.0)
        ],
        [
            new neighbor("bridge", "bridge"),
            new neighbor("bridge 1", "bridge 1"),
            new neighbor("bridge 1", "connection 1"),
            new neighbor("bridge 1", "t 2"),
            new neighbor("bridge 1", "t 3"),
            new neighbor("bridge 1", "track 1"),
            new neighbor("bridge", "transition 1"),
            new neighbor("bridge 1", "turn 1"),
            new neighbor("bridge 1", "viad"),
            new neighbor("bridge 1", "vias 1"),
            new neighbor("bridge", "wire"),
            new neighbor("component", "component"),
            new neighbor("connection 1", "component"),
            new neighbor("connection", "connection"),
            new neighbor("connection", "corner"),
            new neighbor("t 1", "connection 1"),
            new neighbor("t 2", "connection 1"),
            new neighbor("track 1", "connection 1"),
            new neighbor("turn", "connection 1"),
            new neighbor("substrate", "corner 1"),
            new neighbor("t 3", "corner 1"),
            new neighbor("track", "corner 1"),
            new neighbor("transition 2", "corner 1"),
            new neighbor("transition", "corner 1"),
            new neighbor("turn 1", "corner 1"),
            new neighbor("turn 2", "corner 1"),
            new neighbor("viad 1", "corner 1"),
            new neighbor("vias 1", "corner 1"),
            new neighbor("vias 2", "corner 1"),
            new neighbor("vias", "corner 1"),
            new neighbor("wire 1", "corner 1"),
            new neighbor("substrate", "substrate"),
            new neighbor("substrate", "t 1"),
            new neighbor("substrate", "track"),
            new neighbor("substrate", "transition 2"),
            new neighbor("substrate", "turn"),
            new neighbor("substrate", "viad 1"),
            new neighbor("substrate", "vias 2"),
            new neighbor("substrate", "vias 3"),
            new neighbor("substrate", "wire 1"),
            new neighbor("t 1", "t 3"),
            new neighbor("t 3", "t 1"),
            new neighbor("t 1", "t 2"),
            new neighbor("t 2", "t 2"),
            new neighbor("t 2", "t"),
            new neighbor("t 3", "track"),
            new neighbor("t 1", "track 1"),
            new neighbor("t 2", "track 1"),
            new neighbor("t 1", "transition 3"),
            new neighbor("t 3", "transition 2"),
            new neighbor("t 2", "transition 3"),
            new neighbor("t 3", "turn"),
            new neighbor("t 1", "turn 1"),
            new neighbor("t 2", "turn 1"),
            new neighbor("t 2", "turn 2"),
            new neighbor("t 3", "viad 1"),
            new neighbor("t 1", "viad"),
            new neighbor("t 2", "viad"),
            new neighbor("t 2", "vias 1"),
            new neighbor("t 1", "vias 1"),
            new neighbor("vias 1", "t 1"),
            new neighbor("vias 2", "t 1"),
            new neighbor("wire 1", "t 1"),
            new neighbor("track", "track"),
            new neighbor("track 1", "track 1"),
            new neighbor("track 1", "transition 3"),
            new neighbor("track", "transition 2"),
            new neighbor("track", "turn"),
            new neighbor("track 1", "turn 1"),
            new neighbor("track", "viad 1"),
            new neighbor("track 1", "viad"),
            new neighbor("track", "vias 2"),
            new neighbor("track", "vias 3"),
            new neighbor("track 1", "vias 1"),
            new neighbor("track", "wire 1"),
            new neighbor("transition 2", "turn"),
            new neighbor("transition", "turn"),
            new neighbor("transition 1", "turn 1"),
            new neighbor("transition 2", "viad 1"),
            new neighbor("transition 2", "vias 2"),
            new neighbor("transition 2", "vias 3"),
            new neighbor("transition 2", "vias"),
            new neighbor("wire", "transition 1"),
            new neighbor("transition 2", "wire 1"),
            new neighbor("turn 1", "turn"),
            new neighbor("turn 2", "turn"),
            new neighbor("turn", "turn 1"),
            new neighbor("turn", "turn 2"),
            new neighbor("turn 1", "viad 1"),
            new neighbor("turn", "viad"),
            new neighbor("turn 1", "vias 2"),
            new neighbor("turn 1", "vias 3"),
            new neighbor("turn 1", "vias"),
            new neighbor("turn", "vias 1"),
            new neighbor("turn 1", "wire 1"),
            new neighbor("viad 1", "viad 1"),
            new neighbor("viad 1", "vias 2"),
            new neighbor("viad 1", "vias 3"),
            new neighbor("viad 1", "wire 1"),
            new neighbor("vias 1", "wire 1"),
            new neighbor("vias 2", "wire 1"),
            new neighbor("vias 1", "vias 3"),
            new neighbor("vias 2", "vias 2"),
            new neighbor("vias 2", "vias"),
            new neighbor("wire", "wire"),
            new neighbor("wire 1", "wire 1"),
            new neighbor("bridge 1", "dskew"),
            new neighbor("connection 3", "dskew"),
            new neighbor("dskew", "dskew"),
            new neighbor("skew", "dskew"),
            new neighbor("t", "dskew"),
            new neighbor("t 2", "dskew"),
            new neighbor("t 1", "dskew"),
            new neighbor("track 1", "dskew"),
            new neighbor("transition 1", "dskew"),
            new neighbor("turn 3", "dskew"),
            new neighbor("viad", "dskew"),
            new neighbor("vias 3", "dskew"),
            new neighbor("skew", "bridge 1"),
            new neighbor("skew", "connection 1"),
            new neighbor("corner", "skew"),
            new neighbor("corner 3", "skew"),
            new neighbor("skew", "dskew"),
            new neighbor("skew", "skew 2"),
            new neighbor("skew 1", "skew"),
            new neighbor("skew 1", "skew 3"),
            new neighbor("substrate", "skew"),
            new neighbor("t 3", "skew"),
            new neighbor("t", "skew 2"),
            new neighbor("t 2", "skew 2"),
            new neighbor("t 1", "skew 2"),
            new neighbor("track", "skew"),
            new neighbor("track 1", "skew 2"),
            new neighbor("transition", "skew"),
            new neighbor("transition 1", "skew 2"),
            new neighbor("turn 1", "skew"),
            new neighbor("turn 2", "skew"),
            new neighbor("turn 3", "skew 2"),
            new neighbor("viad 1", "skew"),
            new neighbor("viad", "skew 2"),
            new neighbor("vias", "skew"),
            new neighbor("vias 1", "skew"),
            new neighbor("vias 2", "skew"),
            new neighbor("vias 3", "skew 2"),
            new neighbor("wire 1", "skew"),
        ],
        {
            "All": [
                "substrate",
                "component", "connection", "corner",
                "t", "track", "skew", "dskew",
                "turn",
                "bridge", "transition", "wire", "viad", "vias",
            ],
            "Chips": ["component", "substrate", "turn", "connection", "corner", "track", "t"],
            "Turnless": ["bridge", "component", "connection", "corner", "substrate", "t", "track", "transition", "viad", "vias", "wire", "skew", "dskew"],
            "Wires": ['substrate', "t", "track", "skew", "dskew", "turn"],
            "Wires2": ['substrate', "t", "track", "skew", "dskew", "turn", "bridge", "transition", "wire", "viad", "vias"],
            "Debug": ['substrate', 'turn'],
        }
    )

    export function getTileImage(name: string): Image {
        switch (helpers.stringTrim(name)) {
            case "wire": return img`
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                f f f f f f f f f f f f f f
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                f f f f f f f f f f f f f f
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
            `
            case "vias": return img`
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 f b b b b b b b b f 6 6
                6 f b b b b b b b b b b f 6
                6 f b b b b . . b b b b f 6
                6 f b b b . . . . b b b f 6
                6 f b b b . . . . b b b f 6
                6 f b b b b . . b b b b f 6
                6 f b b b b b b b b b b f 6
                6 6 f b b b b b b b b f 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 6 f f f f f f 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
            `
            case "bridge": return img`
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                f f f f f f f f f f f f f f
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                b b b b b b b b b b b b b b
                f f f f f f f f f f f f f f
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
            `
            case "component": return img`
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f
            `
            case "connection": return img`
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f f f f f f f f 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 f f f f f f f f f f 6 6
                6 6 f b b b b b b b b f 6 6
                6 6 f b b b b b b b b f 6 6
                6 6 f b b b b b b b b f 6 6
                6 6 f b b b b b b b b f 6 6
                f f f f f f f f f f f f f f
                c c c c c c c c c c c c c c
            `
            case "corner": return img`
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                f f 6 6 6 6 6 6 6 6 6 6 6 6
                c f 6 6 6 6 6 6 6 6 6 6 6 6
            `
            case "dskew": return img`
                6 6 6 f 7 7 7 7 7 7 7 f 6 6
                6 6 6 6 f 7 7 7 7 7 7 7 f 6
                6 6 6 6 6 f 7 7 7 7 7 7 7 f
                f 6 6 6 6 6 f 7 7 7 7 7 7 7
                7 f 6 6 6 6 6 f 7 7 7 7 7 7
                7 7 f 6 6 6 6 6 f 7 7 7 7 7
                7 7 7 f 6 6 6 6 6 f 7 7 7 7
                7 7 7 7 f 6 6 6 6 6 f 7 7 7
                7 7 7 7 7 f 6 6 6 6 6 f 7 7
                7 7 7 7 7 7 f 6 6 6 6 6 f 7
                7 7 7 7 7 7 7 f 6 6 6 6 6 f
                f 7 7 7 7 7 7 7 f 6 6 6 6 6
                6 f 7 7 7 7 7 7 7 f 6 6 6 6
                6 6 f 7 7 7 7 7 7 7 f 6 6 6
            `
            case "t": return img`
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                f f f f f f f f f f f f f f
                7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7
                f f f f 7 7 7 7 7 7 f f f f
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
            `
            case "track": return img`
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
            `
            case "transition": return img`
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 f f b b b b b b f f 6 6
                6 f b f b b b b b b f b f 6
                6 f b f b b b b b b f b f 6
                6 f b f b b b b b b f b f 6
                6 f b f b b b b b b f b f 6
                6 f b f b b b b b b f b f 6
                6 f b b b b b b b b b b f 6
                6 6 f b b b b b b b b f 6 6
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 f 7 b b b b 7 f 6 6 6
                6 6 6 f 7 7 7 7 7 7 f 6 6 6
            `
            case "turn": return img`
                f 6 6 f 7 7 7 7 7 7 f 6 6 6
                f 6 6 f 7 7 7 7 7 7 f 6 6 6
                f 6 6 f 7 7 7 7 7 7 f 6 6 6
                f 6 6 f 7 7 7 7 7 7 f f f f
                f 6 6 f 7 7 7 7 7 7 7 7 7 7
                f 6 6 f 7 7 7 7 7 7 7 7 7 7
                f 6 6 f 7 7 7 7 7 7 7 7 7 7
                f 6 6 f 7 7 7 7 7 7 7 7 7 7
                f 6 6 f 7 7 7 7 7 7 7 7 7 7
                f 6 6 f 7 7 7 7 7 7 7 7 7 7
                f 6 6 f f f f f f f f f f f
                f 6 6 6 6 6 6 6 6 6 6 6 6 6
                f 6 6 6 6 6 6 6 6 6 6 6 6 6
                f 6 6 6 6 6 6 6 6 6 6 6 6 6
            `
            case "viad": return img`
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 f f f f f f 6 6 6 6
                6 6 6 f b b b b b b f 6 6 6
                f f f b b b b b b b b f f f
                7 7 b b b b b b b b b b 7 7
                7 7 b b b b . . b b b b 7 7
                7 7 b b b . . . . b b b 7 7
                7 7 b b b . . . . b b b 7 7
                7 7 b b b b . . b b b b 7 7
                7 7 b b b b b b b b b b 7 7
                f f f b b b b b b b b f f f
                6 6 6 f b b b b b b f 6 6 6
                6 6 6 6 f f f f f f 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
            `
            case "skew": return img`
                6 6 6 f 7 7 7 7 7 7 7 f 6 6
                6 6 6 6 f 7 7 7 7 7 7 7 f 6
                6 6 6 6 6 f 7 7 7 7 7 7 7 f
                6 6 6 6 6 6 f 7 7 7 7 7 7 7
                6 6 6 6 6 6 6 f 7 7 7 7 7 7
                6 6 6 6 6 6 6 6 f 7 7 7 7 7
                6 6 6 6 6 6 6 6 6 f 7 7 7 7
                6 6 6 6 6 6 6 6 6 6 f 7 7 7
                6 6 6 6 6 6 6 6 6 6 6 f 7 7
                6 6 6 6 6 6 6 6 6 6 6 6 f 7
                6 6 6 6 6 6 6 6 6 6 6 6 6 f
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
            `
            case "substrate": return img`
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 6 6 6 6 6 6 6
            `
default:
return null
        }
    }
}