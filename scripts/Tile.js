class Tile {
    constructor(x, y) {
        // Coordenadas do tile na grid
        this.x = x;
        this.y = y;
        this.state = TILE_STATES.EMPTY;
        this.element = document.createElement('div');
        // Associa todos so tiles criados a classe tile de css
        this.element.classList.add('tile');
        // Da um id unico para eles baseado nas coords
        this.element.id = `tile-${x}-${y}`;
    }

    // Metodo para atualizar estados e aparencia do tile
    // com a passagem do tempo
    update() {
        const states = Object.values(TILE_STATES);
        // Remove qualquer estado que estiver associado ao tile
        this.element.classList.remove(states);

        // Adiciona novo estado
        if (this.state !== TILE_STATES.EMPTY) {
            this.element.classList.add(this.state);
        }
    };
};