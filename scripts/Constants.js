// "enum" de estados possiveis para um tile
const TILE_STATES = {
    EMPTY: 'empty',
    ROCK: 'rock',
    WEED: 'weed',
    TILLED: 'tilled',
    PLANTED: 'planted',
    WATERED: 'watered'
};

// Gambiarra pra se comportar como enum
Object.freeze(TILE_STATES);

// Mesma gambiarra para as ferramentas
const TOOLS = {
    HAND: 'hand',
    SHOVEL: 'shovel',
    HOE: 'hoe',
    WATERING_CAN: 'watering-can',
    SICKLE: 'sickle'
};

Object.freeze(TOOLS);