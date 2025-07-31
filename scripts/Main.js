document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');

    const gameState = {
        selectedTool: TOOLS.SHOVEL,
        selectedSeed: null,
        money: 100
    };

    function handleTileClick(tile) {
        // Lógica da Mão: Plantio
        if (gameState.selectedTool === TOOLS.HAND) {
            if (tile.state === TILE_STATES.TILLED && !tile.plant && gameState.selectedSeed) {
                const newPlant = new Plant(gameState.selectedSeed);
                tile.plant = newPlant;
                tile.state = TILE_STATES.PLANTED;
            }
        }

        // Lógica da Pá: Limpar os tiles
        if (gameState.selectedTool === TOOLS.SHOVEL) {
            if (tile.state === TILE_STATES.ROCK || tile.state === TILE_STATES.WEED || tile.state === TILE_STATES.PLANTED) {
                tile.state = TILE_STATES.EMPTY;
            }
        } 
        // Lógica da Enxada: Prepara o solo
        else if (gameState.selectedTool === TOOLS.HOE) {
            if (tile.state === TILE_STATES.EMPTY) {
                tile.state = TILE_STATES.TILLED;
            }
        }

        // Lógica do Regador: Aguar o solo arado
        else if (gameState.selectedTool === TOOLS.WATERING_CAN) {
            if (tile.state === TILE_STATES.TILLED || tile.state === TILE_STATES.PLANTED) {
                tile.state = TILE_STATES.WATERED;
            }
        }
        
        tile.update();
    }

    const seedButtons = document.querySelectorAll('.seed-button');

    seedButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plantKey = button.dataset.seed;

            if (gameState.selectedSeed === plantKey) {
                gameState.selectedSeed = null;
                button.classList.remove('active');
            } else {
                seedButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                gameState.selectedSeed = plantKey;
            }
        });
    });

    const toolButtons = document.querySelectorAll('.tool-button');

    function changeCursor() {
        const allToolClasses = Object.values(TOOLS).map(tool => `cursor-${tool}`);
        gridContainer.classList.remove(...allToolClasses);
        if (gameState.selectedTool) {
            gridContainer.classList.add(`cursor-${gameState.selectedTool}`);
            console.log("tool: ", gameState.selectedTool);
            console.log(`cursor-${gameState.selectedTool}`);
        }
    };

    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            toolButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            gameState.selectedTool = button.dataset.tool;
            changeCursor();
        });
    });

    changeCursor();

    const GRID_SIZE = 12;

    const gameGrid = new Grid(gridContainer, GRID_SIZE, handleTileClick);
    gameGrid.initialize();
    gameGrid.render();
});