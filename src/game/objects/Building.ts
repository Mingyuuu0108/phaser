import * as Phaser from "phaser";
import BaseScene from "../scenes/BaseScene";

export default class Building {
    sprite: Phaser.GameObjects.Rectangle;
    door?: Phaser.GameObjects.Rectangle;

    constructor(
        scene: BaseScene,
        data: any
    ) {
        this.sprite = scene.add.rectangle(
            data.x,
            data.y,
            data.width || 120,
            data.height || 120,
            0x4444aa
        )
        .setDepth(100);

        scene.physics.add.existing(
            this.sprite,
            true
        );

        scene.physics.add.collider(
            scene.player.sprite,
            this.sprite
        );

        if (data.portal) {
            this.createDoor(
                scene,
                data
            );
        }

    }

    createDoor(
        scene: BaseScene,
        data: any
    ) {
        const doorX = data.x;

        const doorY = data.y + (data.height || 120) / 2;

        this.door = scene.add.rectangle(
            doorX,
            doorY,
            30,
            20,
            0x885522
        )
        .setDepth(150);

        scene.createPortal(
            doorX,
            doorY,
            30,
            20,
            data.portal.target,
            data.portal.spawnX,
            data.portal.spawnY
        );
    }
}