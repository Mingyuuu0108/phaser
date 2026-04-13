import * as Phaser from "phaser";
import { loadCharacters, loadNPCs, loadTilesets } from "../../loaders";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        this.createLoadingBar();

        loadCharacters(this.load);
        loadNPCs(this.load);
        loadTilesets(this.load);
    }

    private createLoadingBar() {
        const width  = this.cameras.main.width;
        const height = this.cameras.main.height;

        const bar = this.add.rectangle(
            width / 2 - 160, height / 2, 0, 20, 0x44aaff
        )
        .setOrigin(0, 0.5);

        this.add.rectangle(
            width / 2, height / 2, 320, 20, 0x333333
        )
        .setOrigin(0.5, 0.5);

        this.add.text(width / 2, height / 2 - 30, "Loading...", {
            fontSize: "16px",
            color: "#ffffff"
        })
        .setOrigin(0.5, 0.5);

        this.load.on("progress", (value: number) => {
            bar.width = 320 * value;
        });
    }

    create() {
        this.scene.start("HomeScene");
    }
}