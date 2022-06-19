class Map {
    constructor(config) {
        this.gameObject = config.gameObject;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.bullets = [];
        this.cd = 0;
        this.maptab = config.maptab || [];
    }

    init() {

    }

    draw(ctx, cameraPerson) {
        for (let i = 0; i < this.maptab.length; i++) {
            for (let j = 0; j < this.maptab[i].length; j++) {
                if (this.maptab[i][j] === "x") {
                    ctx.fillStyle = "#8fce00";
                    ctx.fillRect(utils.withGrid(i), utils.withGrid(j), 16, 16);
                }
            }
        }
    }

    coord() {
        let t = [];
        let line = [];
        for (let i = 0; i < this.maptab.length; i++) {
            line = [];
            for (let j = 0; j < this.maptab[i].length; j++) {
                var coord = "" + utils.withGrid(i) + "," + utils.withGrid(j);
                line.push(coord);
            }
            t.push(line);
        }
        console.log(t);
    }

    changeBlock(x, y, ctx) {
        this.coord();
        let div = 16;
        console.log(x, y);

        var rect = ctx.getBoundingClientRect();
        console.log(rect.top, rect.left);
        console.log(x - rect.top, y - rect.left);
        const nx = Math.floor((x - rect.top) / div);
        const ny = Math.floor((y - rect.left) / div);
        console.log(nx, ny)
        for (let i = 0; i < this.maptab.length; i++) {
            for (let j = 0; j < this.maptab[i].length; j++) {
                if (nx >= utils.withGrid(i) && nx <= utils.withGrid(i) + 16 && ny >= utils.withGrid(j) && ny <= utils.withGrid(j) + 16) {
                    if (this.maptab[i][j] === "x") {
                        this.maptab[i][j] = "o";
                    } else {
                        this.maptab[i][j] = "x";
                    }
                }
            }
        }
    }

}

window.OverworldMap = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObject: {
            hero: new Person({
                name: "hero",
                isPlayerControlled: true,
                x: utils.withGrid(6),
                y: utils.withGrid(4),
            }),
        },
        maptab: [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]
        ],
        walls: [
            //{ x1: 99, y1: 84, x2: 141, y2: 120, type: "wall" },
        ]
    },
}

/*
[utils.asGridCoord(7, 6)]: true,
[utils.asGridCoord(8, 6)]: true,
[utils.asGridCoord(7, 7)]: true,
[utils.asGridCoord(8, 7)]: true,
*/