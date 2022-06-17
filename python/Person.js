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

    equip(item) {
        item.isEquiped = true;
        console.log(item.name + " is equiped");
    }

    unequip(item) {
        item.isEquiped = false;
    }

    removeItem(item) {
        this.inventory.splice(this.inventory.indexOf(item), 1);
    }

    use(item) {
        console.log(item.name + " is used");
        if (item.type == "consumable") {
            console.log("hp : " + this.hp + " + " + item.hp);
            if (this.hp + item.hp > this.maxHp) {
                this.hp = this.maxHp;
                console.log("oi")
            } else {
                this.hp += item.hp;
                console.log("oinkoink")
            }
            if (this.mana + item.mana > this.maxMana) {
                this.mana = this.maxMana;
            } else {
                this.mana += item.mana;
            }
        }
        //this.removeItem(item);
        console.log("new stats : " + this.hp + " " + this.mana);
    }

    displayInventory() {

        let inventory = document.getElementById("inventory");

        let equipedH2 = document.createElement("h2");
        let equipedTitle = document.createTextNode("equiped");
        equipedH2.appendChild(equipedTitle);
        let equipedDiv = document.createElement("div");
        let equipedUl = document.createElement("ul");


        let unequipedH2 = document.createElement("h2");
        let unequipedTitle = document.createTextNode("unequiped");
        unequipedH2.appendChild(unequipedTitle);
        let unequipedDiv = document.createElement("div");
        let unequipedUl = document.createElement("ul");

        let consumableH2 = document.createElement("h2");
        let consumableTitle = document.createTextNode("consumable");
        consumableH2.appendChild(consumableTitle);
        let consumableDiv = document.createElement("div");
        let consumableUl = document.createElement("ul");

        this.inventory.forEach((item) => {
            let li = document.createElement("li");
            const txt = document.createTextNode(item.name);
            li.appendChild(txt);
            if (item.isEquiped && item.type != "consumable") {
                let button = document.createElement("button");
                button.innerHTML = "unequip ?";
                button.onclick = () => {
                    this.unequip(item);
                    document.getElementById("inventory").innerHTML = "";
                    this.displayInventory();
                }
                li.appendChild(button);
                equipedUl.appendChild(li);
            } else if (!item.isEquiped && item.type != "consumable") {
                let button = document.createElement("button");
                button.innerHTML = "equip ?";
                button.onclick = () => {
                    document.getElementById("inventory").innerHTML = "";
                    this.equip(item);
                    this.displayInventory();
                }
                li.appendChild(button);
                unequipedUl.appendChild(li);
            } else if (item.type == "consumable") {
                let button = document.createElement("button");
                button.innerHTML = "use ?";
                button.onclick = () => {
                    this.use(item);
                    document.getElementById("inventory").innerHTML = "";
                    this.displayInventory();
                }
                li.appendChild(button);
                consumableUl.appendChild(li);
            }
        })
        inventory.appendChild(equipedH2);
        equipedDiv.appendChild(equipedUl);
        inventory.appendChild(equipedDiv);
        inventory.appendChild(unequipedH2);
        unequipedDiv.appendChild(unequipedUl);
        inventory.appendChild(unequipedDiv);
        inventory.appendChild(consumableH2);
        consumableDiv.appendChild(consumableUl);
        inventory.appendChild(consumableDiv);

    }

}