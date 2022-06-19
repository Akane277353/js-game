class Hud {
    constructor(config) {
        this.image = new Image();
        this.image.src = "images/ui/hud.png";
        this.image.onload = () => {
            this.isLoaded = true;
        }
        this.x = 0;
        this.y = 0;
    }

    draw(ctx, cameraPerson) {
        this.x = 10;
        this.y = 10;
        this.isLoaded && ctx.drawImage(this.image, this.x, this.y);
        ctx.fillStyle = "#8fce00";
        ctx.fillRect(30, 14, cameraPerson.hp / cameraPerson.maxHp * 26, 3);

        ctx.fillStyle = "#3d85c6";
        ctx.fillRect(30, 18, cameraPerson.hp / cameraPerson.maxHp * 26, 2);
    }
}