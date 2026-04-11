import * as Phaser from "phaser";
import type { DialogueLine } from "../../types/DialogueLine";

export default class NPC {
    sprite: Phaser.GameObjects.Rectangle;

    dialogues: DialogueLine[];

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        dialogues: DialogueLine[]
    ) {
        this.sprite = scene.add.rectangle(
            x, 
            y, 
            32, 
            32, 
            0xffaa00
        );

        scene.physics.add.existing(
            this.sprite,
            true
        );

        this.dialogues = dialogues;
    }
}