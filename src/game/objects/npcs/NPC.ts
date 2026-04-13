import * as Phaser from "phaser";
import type { BaseNPCConfig } from "../../../types/NPC";
import type { DialogueLine } from "../../../types/DialogueLine";

export default class NPC {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    body!: Phaser.Physics.Arcade.Body;
    config: BaseNPCConfig;

    dialogues: DialogueLine[] = [];

    constructor(scene: Phaser.Scene, config: BaseNPCConfig) {
        this.scene = scene;
        this.config = config;

        this.sprite = scene.add.sprite(config.x, config.y, config.textureKey);
        this.sprite.setScale(config.scale ?? 2);

        scene.physics.add.existing(this.sprite, true);
        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

        this.createAnimation();
        this.sprite.play(config.animKey);

        // Y축 depth
        this.sprite.setDepth(config.y);
    }

    private createAnimation() {
        const { animKey, textureKey, frameCount } = this.config;
        const anims = this.scene.anims;

        if (anims.exists(animKey)) return;

        anims.create({
            key: animKey,
            frames: anims.generateFrameNumbers(textureKey, { start: 0, end: frameCount - 1 }),
            frameRate: 6,
            repeat: -1
        });
    }

    getType() {
        return this.config.type;
    }
}