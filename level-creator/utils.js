const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x, y) {
        return `${x*16},${y*16}`;
    },
    nextPosition(initx, inity, dir) {
        let x = initx;
        let y = inity;
        const size = 1;
        if (dir === "left") {
            x -= size;
        } else if (dir === "right") {
            x += size;
        } else if (dir === "up") {
            y -= size;
        } else if (dir === "down") {
            y += size;
        }
        return { x, y };
    }
}