import * as Phaser from "phaser";
import StatSystem from "./StatSystem";

export default class HUDSystem {
    scene: Phaser.Scene;
    stats: StatSystem;

    private hpBarBg!: Phaser.GameObjects.Rectangle;
    private hpBar!: Phaser.GameObjects.Rectangle;
    private hpText!: Phaser.GameObjects.Text;

    private readonly BAR_X = 20;
    private readonly HP_Y = 20;
    private readonly BAR_WIDTH = 160;
    private readonly BAR_HEIGHT = 20;

    constructor(scene: Phaser.Scene, stats: StatSystem) {
        this.scene = scene;
        this.stats = stats;

        this.createHPBar();
    }

    private createHPBar() {
        this.hpBarBg = this.scene.add.rectangle(
            this.BAR_X,
            this.HP_Y,
            this.BAR_WIDTH,
            this.BAR_HEIGHT,
            0x333333
        )
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(1000);

        this.hpBar = this.scene.add.rectangle(
            this.BAR_X,
            this.HP_Y,
            this.BAR_WIDTH,
            this.BAR_HEIGHT,
            0xff4444
        )
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(1001);

        this.hpText = this.scene.add.text(
            this.BAR_X + 6,
            this.HP_Y + 3,
            "",
            { fontSize: "12px", color: "#ffffff" }
        )
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(1002);
    }

    update() {
        const { hp, maxHp } = this.stats.stats;

        // HP 바
        const hpRatio = hp / maxHp;
        this.hpBar.width = this.BAR_WIDTH * hpRatio;
        this.hpText.setText(`HP ${hp} / ${maxHp}`);
    }
}