document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');

    const gameState = {
        selectedTool: TOOLS.SHOVEL,
        selectedSeed: null,
        money: 100,
        day: 0
    };

    function handleTileClick(tile) {
        const tool = gameState.selectedTool;
        // Lógica da Mão: Plantio
        if (tool === TOOLS.HAND) {
            if (tile.state === TILE_STATES.TILLED && !tile.plant && gameState.selectedSeed) {
                const newPlant = new Plant(gameState.selectedSeed);
                tile.plant = newPlant;
                tile.state = TILE_STATES.PLANTED;
            }
        }

        // Lógica da Pá: Limpar os tiles
        if (tool === TOOLS.SHOVEL) {
            if (tile.state === TILE_STATES.ROCK || tile.state === TILE_STATES.WEED || tile.state === TILE_STATES.PLANTED || tile.state === TILE_STATES.WATERED) {
                tile.state = TILE_STATES.EMPTY;
            }
        } 
        // Lógica da Enxada: Prepara o solo
        else if (tool === TOOLS.HOE) {
            if (tile.state === TILE_STATES.EMPTY) {
                tile.state = TILE_STATES.TILLED;
            }
        }

        // Lógica do Regador: Aguar o solo arado
        else if (tool === TOOLS.WATERING_CAN) {
            if (tile.state === TILE_STATES.PLANTED) {
                tile.state = TILE_STATES.WATERED;
                tile.plant.isWatered = true;
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

    const nextDayButton = document.getElementById('next-day-button');

    function passDay() {
        gameState.day++;
        gameGrid.tiles.flat().forEach(tile => {
            if (tile.state === TILE_STATES.WATERED) {
                tile.state = TILE_STATES.PLANTED;
            }

            if (tile.plant) {
                const survived = tile.plant.passDay();
                if (!survived) {
                    console.log(`Planta ${tile.plant.name} (${tile.x}, ${tile.y}) morreu`);
                    tile.plant = null;
                    tile.state = TILE_STATES.EMPTY;
                }
            }
            tile.update();
        });
        console.log("Novo dia: ", gameState.day);
    }

    nextDayButton.addEventListener('click', passDay);

    const GRID_SIZE = 12;

    const gameGrid = new Grid(gridContainer, GRID_SIZE, handleTileClick);
    gameGrid.initialize();
    gameGrid.render();
});