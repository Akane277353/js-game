class Ennemy extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 1; //Math.floor(Math.random() * 100);

        this.timeBeforeTurn = 50;

        this.isPlayerControlled = false;

        this.hp = config.hp || 100;
        this.maxHp = config.maxHp || 100;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            this.startBehavior(state, {
                type: "walk",
                direction: this.direction,
            })
            this.updateSprite();
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        if (behavior.type == "walk") {
            if (state.map.isSelf(this.x, this.y, this.direction)) {
                this.timeBeforeTurn = 50;
                this.direction = Object.keys(this.directionUpdate)[Math.floor(Math.random() * 4)];
                return;
            }
            this.movingProgressRemaining = 1;
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
        this.timeBeforeTurn -= 1;
        if (this.timeBeforeTurn <= 0) {
            this.timeBeforeTurn = 50;
            this.direction = Object.keys(this.directionUpdate)[Math.floor(Math.random() * 4)];
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }

}