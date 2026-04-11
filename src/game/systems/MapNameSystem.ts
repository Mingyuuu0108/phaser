import * as Phaser from "phaser";

export default class MapNameSystem {
    private scene: Phaser.Scene;
    private mapNameText?: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    show(name: string, duration: number = 1500) {
        if (this.mapNameText) {
            this.mapNameText.destroy();
        }

        this.mapNameText = this.scene.add.text(
            this.scene.cameras.main.width / 2,
            60,
            name,
            {
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4
            }
        )
        .setOrigin(0.5, 0.5)
        .setScrollFactor(0)
        .setDepth(1001)
        .setAlpha(1);

        this.scene.tweens.add({
            targets: this.mapNameText,
            alpha: 0,
            delay: duration - 500,
            duration: 500,
            onComplete: () => {
                this.mapNameText?.destroy();
            }
        });
    }
}