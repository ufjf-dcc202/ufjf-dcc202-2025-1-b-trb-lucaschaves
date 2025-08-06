class Tile {
    constructor(x, y, onClickCallback) {
        // Coordenadas do tile na grid
        this.x = x;
        this.y = y;
        this.state = TILE_STATES.EMPTY;
        this.element = document.createElement('div');
        // Associa todos so tiles criados a classe tile de css
        this.element.classList.add('tile');
        // Da um id unico para eles baseado nas coords
        this.element.id = `tile-${x}-${y}`;
        this.element.addEventListener('click', () => onClickCallback(this));
        // Planta crescendo neste tile
        this.plant = null;
    }

    // Metodo para atualizar estados e aparencia do tile
    // com a passagem do tempo
    update() {
        const allStates = Object.values(TILE_STATES);
        this.element.classList.remove(...allStates, 'watered');
        for (let i = 0; i <= 5; i++) { // Limpa até 5 estágios, max atual no jogo
            this.element.classList.remove(`stage-${i}`);
        }

        if (this.state !== TILE_STATES.EMPTY) {
            this.element.classList.add(this.state);
        }

        if (this.plant) {
            this.element.classList.add(`stage-${this.plant.currStage}`);
            
            if (this.plant.isWatered) {
                this.element.classList.add('watered');
            }
        }
    }
};