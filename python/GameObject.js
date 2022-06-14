class GameObject {
    constructor(config) {
        this.isMounted = false
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.action = config.action || "none";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/people/hero.png",
        });
    }

    mount(map) {
        map.addWall(this.x - 12, this.y - 7, 22, 10);
    }

    update() {

    }
}