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
    }

    mountObject() {
        Object.values(this.gameObject).forEach(o => {
            if (!o.isPlayerControlled) {
                o.mount(this);
            }
        })
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

        let res = false;

        for (let i = 0; i < this.walls.length; i++) {
            const values = Object.values(this.walls[i])
            if (x >= values[0] && x <= values[2] && y >= values[1] && y <= values[3]) {
                res = true;
            }
        }
        return res;
    }

    addWall(x, y, width, height) {
        const wall = [x, y, x + width, y + height];
        this.walls.unshift(wall);
    }

    removeWall(x, y, width, height) {
        for (let i = 0; i < this.walls.length; i++) {
            const values = Object.values(this.walls[i])
            if (x === values[0] && y === values[1] && x + width === values[2] && y + height === values[3]) {
                delete this.walls[wall];
            }
        }

    }

    moveWall(wasx, wasy, width, height, dir) {
        this.removeWall(wasx, wasy, width, height);
        const { x, y } = utils.nextPosition(wasx, wasy, dir);
        this.addWall(x, y);
    }

    checkposition(object, order) {
        var pushed = false;
        for (let i = 0; i < order.length; i++) {
            const y = order[i].y;
            if (object.y <= y) {
                order.splice(i, 0, object);
                pushed = true;
                return order;
            }
        }
        if (!pushed) {
            order.push(object);
            return order;
        }
    }

    order() {
        var order = [];
        Object.values(this.gameObject).forEach(object => {
            if (order.length === 0) {
                order.push(object);
            } else {
                order = this.checkposition(object, order);
            }
        })
        return order;
    }

    shoot(cameraPerson) {
        this.bullets.push(new Bullet({
            x: cameraPerson.x,
            y: cameraPerson.y,
            direction: cameraPerson.direction,
        }));
    }

    killBullet(nb) {
        delete this.bullets[nb];
        this.bullets.splice(nb - 1, 1);
        console.log(this.bullets)
    }
}

window.OverworldMap = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObject: {
            mike: new Ennemy({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "images/characters/people/npc1.png",
            }),
            bob: new GameObject({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "images/characters/people/npc1.png",
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
        },
        walls: [
            { x1: 99, y1: 84, x2: 141, y2: 120 },
        ]
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

/*
[utils.asGridCoord(7, 6)]: true,
[utils.asGridCoord(8, 6)]: true,
[utils.asGridCoord(7, 7)]: true,
[utils.asGridCoord(8, 7)]: true,
*/