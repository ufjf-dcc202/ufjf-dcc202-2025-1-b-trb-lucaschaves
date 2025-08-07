class Plant {
    constructor(type) {
        const data = PLANT_DATA[type];
        this.type = type;
        this.name = data.name;
        this.currStage = 0;
        this.maxStage = data.growthStages;
        this.isWatered = false;
        this.price = data.price;
        this.sellValue = data.sellValue;
    }

    passDay() {
        if (!this.isWatered) {
            return false;
        }

        if (this.currStage < this.maxStage) {
            this.currStage++;
        }

        this.isWatered = false;
        return true;
    }
};