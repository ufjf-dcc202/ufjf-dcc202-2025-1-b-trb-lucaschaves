class Plant {
    constructor(type) {
        const data = PLANT_DATA[type];
        this.type = type;
        this.name = data.name;
        this.currState = 0;
        this.maxStage = data.growthStages;
        this.isWatered = false;
    }
};