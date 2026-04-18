import BaseScene from "./BaseScene";

export default class HomeScene extends BaseScene {

    constructor() {
        super("HomeScene");
    }

    create() {
        super.create();

        this.loadMap("homeMap");

        // 타일맵 
        const map = this.make.tilemap({ key: "homeMap" });

        const tileset = map.addTilesetImage("Floors_Tiles", "floors", 16, 16);

        map.createLayer("Tile Layer 1", tileset!, 0, 0);
    }
}
