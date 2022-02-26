const ITERATIONS = 9000 // total number of dots to draw
const CHUNK_SIZE = 300 // number of dots to draw at once
const PRE_ERASE_DELAY = 6000 // milliseconds to linger after draw completes
const POST_ERASE_DELAY = 500 // milliseconds to linger after erase, before draw starts
const OFFSET = 3 // default 3; factor of random walk. higher=sparser, lower=denser

class Rorschach {
    ctx = null;
    currX = 0;
    currY = 0;
    remainingIterations = -1;
    symmetry = {
        x: true,
        y: false
    };

    constructor(ctx) {
        this.ctx = ctx
    }

    reshape() {
        this.ctx.canvas.width  = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    start() {
        this.reshape()
        this.#newColor()

        this.currX = Math.floor(this.#xLimit()/2)
        this.currY = Math.floor(this.#yLimit()/2)
        this.remainingIterations = ITERATIONS

        window.requestAnimationFrame(this.drawFrame.bind(this))
    }

    drawFrame(timestamp) {
        let x = this.currX;
        let y = this.currY;
        let i = 0, j = 0;
        let currIterations = CHUNK_SIZE;
        if (currIterations > this.remainingIterations)
            currIterations = this.remainingIterations;

        let coordinates = [];
        for (i = 0; i < currIterations; i++) {
            x += this.#jitter();
            y += this.#jitter();
            coordinates.push({x, y})
            if (this.symmetry.x) {
                coordinates.push({
                    x: this.#xLimit() - x,
                    y: y,
                });
            }
            if (this.symmetry.y) {
                coordinates.push({
                    x: x,
                    y: this.#yLimit() - y,
                });
            }
            if (this.symmetry.x && this.symmetry.y) {
                coordinates.push({
                    x: this.#xLimit() - x,
                    y: this.#yLimit() - y,
                });
            }
        }
        this.#drawPoints(coordinates);
        this.remainingIterations = Math.max(this.remainingIterations - currIterations, 0);
        this.currX = x;
        this.currY = y;

        // nothing left to draw
        if (this.remainingIterations === 0) {
            // leave the drawing up, then erase
            setTimeout(() => {
                this.#erase();
                // leave the canvas blank for a moment, then restart
                setTimeout(this.start.bind(this), POST_ERASE_DELAY);
            }, PRE_ERASE_DELAY)
            return
        }

        // draw next frame
        window.requestAnimationFrame(this.drawFrame.bind(this));
    }

    #newColor() {
        let h = Math.floor(Math.random() * 361);
        this.ctx.fillStyle = this.#hslToHex(h, 100, 50);
    }

    // stolen from https://stackoverflow.com/a/44134328
    #hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    #xLimit() {
        return this.ctx.canvas.width;
    }

    #yLimit() {
        return this.ctx.canvas.height;
    }

    #drawPoints(coordinates) {
        coordinates.forEach(o => {
            this.#drawPoint(o.x, o.y);
        });
    }

    #drawPoint(x, y) {
        this.ctx.fillRect(x, y, 1, 1);
    }

    #erase() {
        this.ctx.clearRect(0, 0, this.#xLimit(), this.#yLimit());
    }

    #jitter() {
        const r = Math.random() * (1 + (OFFSET << 1));
        return Math.floor(r - OFFSET);
    }
}

export default Rorschach;
