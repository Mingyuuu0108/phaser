import BaseScene from "./BaseScene";

export default class HomeScene extends BaseScene {

    constructor() {
        super("HomeScene");
    }

    create() {
        super.create();

        this.loadMap("home");
    }
}