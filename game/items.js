class Item {
    constructor(config) {
        this.src = config.src;
        this.name = config.name;
        this.description = config.description;
        this.type = config.type;
        this.value = config.value;
        this.weight = config.weight;
        this.cd = config.cd || 20;
        this.isEquiped = config.isEquiped || false;


        this.hp = config.hp || 0;
        this.mana = config.mana || 0;
        this.attack = config.attack || 0;
        this.defense = config.defense || 0;
        this.speed = config.speed || 0;
        this.luck = config.luck || 0;
        this.strength = config.strength || 0;
        this.dexterity = config.dexterity || 0;
        this.intelligence = config.intelligence || 0;
        this.constitution = config.constitution || 0;
        this.charisma = config.charisma || 0;
        this.wisdom = config.wisdom || 0;
    }
}

window.gameItems = {
    blade_of_shurelia: {
        src: null,
        name: "Blade of Shurelia",
        description: "A sword that is made of a strange metal. It seems to be made of a strange metal.",
        type: "weapon",
        value: 100,
        weight: 1,
        cd: 20,
        isEquiped: true,
    },
    stick_of_truth: {
        src: null,
        name: "Stick of Truth",
        description: "none",
        type: "weapon",
        value: 100,
        weight: 1,
        cd: 20,
    },
    potion_of_health: {
        src: null,
        name: "Potion of Health",
        description: "A potion that restores health.",
        type: "consumable",
        value: 100,
        weight: 1,
        hp: 50,
    },
    potion_of_mana: {
        src: null,
        name: "Potion of Mana",
        description: "A potion that restores mana.",
        type: "consumable",
        value: 100,
        weight: 1,
        mana: 100,
    },
}

/*
[utils.asGridCoord(7, 6)]: true,
[utils.asGridCoord(8, 6)]: true,
[utils.asGridCoord(7, 7)]: true,
[utils.asGridCoord(8, 7)]: true,
*/