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


            Object.values(this.map.gameObject).forEach(object => {
                object.update({
                    arrow: this.input.direction,
                    map: this.map,
                });
            })


            this.map.draw(this.ctx, cameraPerson);
            /*
            // Draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson);
            */

            // Draw game object

            Object.values(this.map.gameObject).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

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
        this.map.init();

        console.log(this.map.walls)

        this.input = new DirectionInput();
        this.input.init();
        this.input.direction;
        this.input.actions;


        document.addEventListener("click", e => {
            this.map.changeBlock(e.clientX, e.clientY, this.canvas, this.map.gameObject.hero);
        })

        this.gameLoop();
    }
}