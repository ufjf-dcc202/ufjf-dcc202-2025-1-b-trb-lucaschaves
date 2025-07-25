class Grid {
    constructor(containerElement, size) {
        this.containerElement = containerElement;
        this.size = size;
        this.tiles = [];
    }

    initialize() {
        for (let x = 0; x < this.size; x++) {
            const column = [];
            for (let y = 0; y < this.size; y++) {
                const tile = new Tile(x, y);
                const random = Math.random();
                // Cria alguns tiles aleatoriamente com pedras e ervas daninhas
                if (random < 0.1) {
                    tile.state = TILE_STATES.ROCK;
                } else if (random < 0.2) {
                    tile.state = TILE_STATES.WEED;
                }      
                column.push(tile);
            }
            this.tiles.push(column);
        }
    }

    render() {
        this.containerElement.innerHTML = '';
        // Cria o grid no css igualmente espaçado
        this.containerElement.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const tile = this.tiles[x][y];
                tile.update();
                this.containerElement.appendChild(tile.element);
            }
        }
    }
};