class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.anger = 0; // to invoke an spirit

        this.hp = config.hp || 100;
        this.maxHp = config.maxHp || 100;
        this.mana = config.mana || 100;
        this.maxMana = config.maxMana || 100;
        this.level = config.level || 1;
        this.exp = config.exp || 0;
        this.maxExp = config.maxExp || 100;
        this.attack = config.attack || 10;
        this.defense = config.defense || 10;
        this.speed = config.speed || 10;
        this.luck = config.luck || 10;
        this.strength = config.strength || 10;
        this.dexterity = config.dexterity || 10;
        this.intelligence = config.intelligence || 10;
        this.constitution = config.constitution || 10;
        this.charisma = config.charisma || 10;
        this.wisdom = config.wisdom || 10;

        this.inventory = config.inventory || [];

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
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow,
                })
            }
            this.updateSprite();
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        if (behavior.type == "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }
            this.movingProgressRemaining = 1;
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
        console.log("x : " + this.x + " y : " + this.y)
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }

    displayInventory() {
        this.inventory.forEach((item) => {
            let li = document.createElement("li");
            const txt = document.createTextNode(item.name);
            li.appendChild(txt);
            document.getElementById("inventory").appendChild(li);
        })
    }

}