class House {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`House parts: ${this.parts.join(', ')}`);
    }
}

interface Builder {
    buildWalls(): void;
    buildDoors(): void;
    buildWindows(): void;
}

class WoodenHouseBuilder implements Builder {
    private house: House;

    constructor() {
        this.house = new House();
    }

    public reset(): void {
        this.house = new House();
    }

    public buildWalls(): void {
        this.house.parts.push('Wooden Walls');
    }

    public buildDoors(): void {
        this.house.parts.push('Wooden Doors');
    }

    public buildWindows(): void {
        this.house.parts.push('Wooden Windows');
    }

    public getHouse(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}

class StoneHouseBuilder implements Builder {
    private house: House;

    constructor() {
        this.house = new House();
    }

    public reset(): void {
        this.house = new House();
    }

    public buildWalls(): void {
        this.house.parts.push('Stone Walls');
    }

    public buildDoors(): void {
        this.house.parts.push('Stone Doors');
    }

    public buildWindows(): void {
        this.house.parts.push('Stone Windows');
    }

    public getHouse(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}

class Director {
    private builder!: Builder;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    public buildMinimalHouse(): void {
        this.builder.buildWalls();
    }

    public buildFullHouse(): void {
        this.builder.buildWalls();
        this.builder.buildDoors();
        this.builder.buildWindows();
    }
}

export { Director, WoodenHouseBuilder, StoneHouseBuilder, House };
