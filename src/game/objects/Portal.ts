import * as Phaser from "phaser";
import BaseScene from "../scenes/BaseScene";

export default class Portal {
    sprite: Phaser.GameObjects.Rectangle;

    private isUsed = false;

    constructor(
        scene: BaseScene,
        x: number,
        y: number,
        width: number,
        height: number,
        targetScene: string,
        spawnX: number,
        spawnY: number
    ) {
        this.sprite = scene.add.rectangle(
            x,
            y,
            width,
            height,
            0xff0000,
            0
        );

        scene.physics.add.existing(
            this.sprite,
            true
        );

        scene.physics.add.overlap( 
            scene.player.sprite,
            this.sprite,
            () => {
                if (this.isUsed) return;

                if (scene.dialogue.isTalking) return;

                this.isUsed = true;

                scene.player.stop();

                scene.scene.start(
                    targetScene,
                    {
                        spawnX, 
                        spawnY
                    }
                );
            }
        );
    }
}