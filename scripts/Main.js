document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');

    const gameState = {
        selectedTool: TOOLS.SHOVEL,
    };

    function handleTileClick(tile) {
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
            if (tile.state === TILE_STATES.TILLED) {
                tile.state = TILE_STATES.WATERED;
            }
        }
        
        tile.update();
    }

    const toolButtons = document.querySelectorAll('.tool-button');
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            toolButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            gameState.selectedTool = button.dataset.tool;
        });
    });


    const GRID_SIZE = 12;

    const gameGrid = new Grid(gridContainer, GRID_SIZE, handleTileClick);
    gameGrid.initialize();
    gameGrid.render();
});