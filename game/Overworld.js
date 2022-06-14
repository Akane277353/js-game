class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Camera
            const cameraPerson = this.map.gameObject.hero;

            // Update object
            Object.values(this.map.gameObject).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            })

            // Draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            // Draw game object
            Object.values(this.map.gameObject).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMap.DemoRoom);

        this.map.mountObject();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction;

        this.startGameLoop();
    }
}