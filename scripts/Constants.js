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

// Plantas possíveis, se pa adiciono mais
const PLANT_DATA = {
        feijao: {
        name: 'Feijão',
        growthStages: 3, // 3 fases de crescimento 
        price: 10,
        harvestValue: 30,
        icon: '🫘'
    },
    tomate: {
        name: 'Tomate',
        growthStages: 4,
        price: 15,
        harvestValue: 50,
        icon: '🍅'
    },
        mandioca: {
        name: 'Mandioca',
        growthStages: 5,
        price: 25,
        harvestValue: 100,
        icon: '🌱'
    },
}

Object.freeze(PLANT_DATA);