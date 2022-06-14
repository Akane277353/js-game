class OverworldMap {
    constructor(config) {
        this.gameObject = config.gameObject;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentx, currenty, dir) {
        const { x, y } = utils.nextPosition(currentx, currenty, dir);
        const wall = "" + x + "," + y;
        return this.walls[wall] || false;
    }

    mountObject() {
        Object.values(this.gameObject).forEach(o => {
            o.mount(this);
        })
    }

    addWall(x, y) {
        const wall = "" + x + "," + y;
        this.walls[wall] = true;
    }

    removeWall(x, y) {
        const wall = "" + x + "," + y;
        delete this.walls[wall];
    }

    moveWall(wasx, wasy, dir) {
        this.removeWall(wasx, wasy);
        const { x, y } = utils.nextPosition(wasx, wasy, dir);
        this.addWall(x, y);
    }
}

window.OverworldMap = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObject: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            bob: new GameObject({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "images/characters/people/npc1.png",
            })
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
        }
    },

    Kitchen: {
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObject: {
            hero: new Person({
                x: 5,
                y: 6,
            }),
            npc1: new GameObject({
                x: 9,
                y: 4,
                src: "images/characters/people/npc1.png",
            }),
        }
    },
}