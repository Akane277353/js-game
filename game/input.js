class DirectionInput {
    constructor() {
        this.heldDirections = [];

        this.heldActions = [];

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

    get actions() {
        return this.heldActions[0];
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            const act = this.action[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
            if (act && this.heldActions.indexOf(act) === -1) {
                this.heldActions.unshift(act);
            }
        })

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const act = this.action[e.code];
            const indexM = this.heldDirections.indexOf(dir);
            const indexA = this.heldActions.indexOf(act);
            if (indexM > -1) {
                this.heldDirections.splice(indexM, 1);
            }
            if (indexA > -1) {
                this.heldActions.splice(indexA, 1);
            }
        })
    }
}