class MainLoop {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
        this.menu = true;
    }

    gameLoop() {
        const step = () => {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const cameraPerson = this.map.gameObject.hero;

            this.map.collide(cameraPerson);

            Object.values(this.map.gameObject).forEach(object => {
                object.update({
                    arrow: this.input.direction,
                    map: this.map,
                });
            })

            this.map.updateWall();

            const printOrder = this.map.order();

            // Draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            // Draw game object
            for (let i = 0; i < printOrder.length; i++) {
                printOrder[i].sprite.draw(this.ctx, cameraPerson);
            }

            if (this.input.actions === "shoot" && this.map.cd === 0) {
                this.map.shoot(cameraPerson);
                this.map.cd = 20;
            }

            if (this.map.bullets.length > 0) {
                Object.values(this.map.bullets).forEach(bullet => {
                    bullet.update({
                        map: this.map,
                        nb: this.map.bullets.length,
                    });
                });

                for (let i = 0; i < this.map.bullets.length; i++) {
                    try {
                        this.map.bullets[i].sprite.draw(this.ctx, cameraPerson);
                    } catch (error) {

                    }
                }
            }
            if (this.map.cd > 0) {
                this.map.cd -= 1;
            }

            new KeyPressListener("Enter", () => {
                //console.log(this.map)
            })

            new KeyPressListener("Enter", () => {
                if (this.map.cd <= 0) {
                    cameraPerson.hp -= 10;
                    console.log(cameraPerson.hp)
                    this.map.cd = 20;
                }
            })

            this.hud.draw(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    startMap(mapConfig) {
        this.map = new Map(mapConfig);
        this.map.mountObject();
    }

    init() {
        this.map = new Map(window.OverworldMap.DemoRoom);

        this.map.mountObject();
        console.log(this.map.walls)

        this.input = new DirectionInput();
        this.input.init();
        this.input.direction;
        this.input.actions;

        this.hud = new Hud();


        this.map.gameObject.hero.displayInventory();

        this.gameLoop();
    }
}