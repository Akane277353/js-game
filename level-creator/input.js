class DirectionInput {
    constructor() {
        this.heldDirections = [];

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }

        this.action = {
            "KeyE": "shoot",
        }
    }

    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
        })

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const indexM = this.heldDirections.indexOf(dir);
            if (indexM > -1) {
                this.heldDirections.splice(indexM, 1);
            }
        })

    }
}