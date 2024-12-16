import { Director, WoodenHouseBuilder, StoneHouseBuilder } from './builder';

function clientCode(director: Director) {
    const woodenBuilder = new WoodenHouseBuilder();
    director.setBuilder(woodenBuilder);

    console.log('Standard wooden house:');
    director.buildFullHouse();
    woodenBuilder.getHouse().listParts();

    const stoneBuilder = new StoneHouseBuilder();
    director.setBuilder(stoneBuilder);

    console.log('Standard stone house:');
    director.buildFullHouse();
    stoneBuilder.getHouse().listParts();

    console.log('Custom wooden house:');
    woodenBuilder.buildWalls();
    woodenBuilder.buildWindows();
    woodenBuilder.getHouse().listParts();
}

const director = new Director();
clientCode(director);
