import BaseScene from "./BaseScene";

export default class TownScene extends BaseScene {

    constructor() {
        super("TownScene");
    }

    create() {
        super.create();

        this.loadMap("town");
    }
}