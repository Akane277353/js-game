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
        for (let i = 0; i < this.maptab.length; i++) {
            for (let j = 0; j < this.maptab[i].length; j++) {
                if (this.maptab[i][j] === "x") {
                    this.addWall(utils.withGrid(i), utils.withGrid(j), 16, 16, "wall");
                }
            }
        }
    }

    draw(ctx, cameraPerson) {
        for (let i = 0; i < this.maptab.length; i++) {
            for (let j = 0; j < this.maptab[i].length; j++) {
                if (this.maptab[i][j] === "x") {
                    ctx.fillStyle = "#8fce00";
                    ctx.fillRect(utils.withGrid(i + 11) - cameraPerson.x, utils.withGrid(j + 6.7) - cameraPerson.y, 16, 16);
                }
            }
        }
    }

    mountObject() {
        Object.values(this.gameObject).forEach(o => {
            if (!o.isPlayerControlled && o.hp > 0) {
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
            if (x >= values[0] && x <= values[2] && y >= values[1] && y <= values[3] && (this.walls[i][4] != "dead")) {
                res = true;
            }
        }
        return res;
    }

    isSelf(currentx, currenty, dir) {
        const { x, y } = utils.nextPosition(currentx, currenty, dir);
        let res = false;
        for (let i = 0; i < this.walls.length; i++) {
            const values = Object.values(this.walls[i])
            if (x >= values[0] && x <= values[2] && y >= values[1] && y <= values[3] && (this.walls[i][4] != "character")) {
                res = true;
            }
        }
        return res;
    }

    isPlayer(currentx, currenty, dir) {
        const { x, y } = utils.nextPosition(currentx, currenty, dir);
        let pos = -1;
        for (let i = 0; i < this.walls.length; i++) {
            const values = Object.values(this.walls[i])
            if (x >= values[0] && x <= values[2] && y >= values[1] && y <= values[3] && this.walls[i][4] === "character") {
                pos = i;
            }
        }
        return pos;
    }

    existWall(x, y, width, height, type) {
        let res = false;
        for (let i = 0; i < this.walls.length; i++) {
            const values = Object.values(this.walls[i])
            if (x === values[0] && x + width === values[2] && y === values[1] && y + height === values[3] && this.walls[i][4] === type) {
                res = true;
            }
        }
        return res;
    }

    addWall(x, y, width, height, type) {
        let inside = this.existWall(x, y, width, height, type);
        if (!inside) {
            const wall = [x, y, x + width, y + height, type];
            this.walls.unshift(wall);
        }
    }

    removeWall(x, y, width, height) {
        for (let i = 0; i < this.walls.length; i++) {
            if (x === this.walls[i][0] && y === this.walls[i][1] && x + width === this.walls[i][2] && y + height === this.walls[i][3]) {
                delete this.walls[wall];
                this.walls.splice(i, 1);
            }
        }
    }

    moveWall(wasx, wasy, width, height, dir) {
        this.removeWall(wasx, wasy, width, height);
        const { x, y } = utils.nextPosition(wasx, wasy, dir);
        this.addWall(x, y);
    }

    updateWall() {
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i][4] === "character") {
                delete this.walls[i];
                this.walls.splice(i, 1);
            }
        }
        this.mountObject();
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
            if (object.hp > 0 || object.isPlayerControlled) {
                if (order.length === 0) {
                    order.push(object);
                } else {
                    order = this.checkposition(object, order);
                }
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
        delete this.bullets[nb - 1];
        this.bullets.splice(nb - 1, 1);
    }

    updateWallSatut(pos) {
        this.walls[pos][4] = "dead";
    }

    //a refaire
    collide(cameraPerson) {
        Object.values(this.gameObject).forEach(object => {
            for (let i = 0; i < this.bullets.length; i++) {
                if (!object.isPlayerControlled) {
                    let pos = this.isPlayer(this.bullets[i].x, this.bullets[i].y, this.bullets[i].direction);
                    if (pos != -1) {
                        object.hp -= cameraPerson.attack;
                        if (object.hp <= 0) {
                            this.updateWallSatut(pos);
                        }
                        this.killBullet(i);
                    }
                }
            }
        })
    }
}

window.OverworldMap = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObject: {
            mike: new Ennemy({
                name: "mike",
                x: utils.withGrid(7),
                y: utils.withGrid(4),
                hp: 100,
                maxHp: 100,
                src: "images/characters/people/npc1.png",
            }),
            hero: new Person({
                name: "hero",
                inventory: [
                    new Item(window.gameItems.blade_of_shurelia),
                    new Item(window.gameItems.potion_of_health),
                ],
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