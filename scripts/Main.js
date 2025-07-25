document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');

    const GRID_SIZE = 12;

    const gameGrid = new Grid(gridContainer, GRID_SIZE);
    gameGrid.initialize();
    gameGrid.render();
});