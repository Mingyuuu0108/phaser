import Phaser from "phaser";
import Player from "../objects/Player";
import type { DialogueLine } from "../../types/DialogueLine";

export default class DialogueSystem {
    scene: Phaser.Scene;
    player: Player;

    // Dialogue UI
    dialogueBox!: Phaser.GameObjects.Rectangle;
    dialogueText!: Phaser.GameObjects.Text;
    nameText!: Phaser.GameObjects.Text;
    portraitLeft!: Phaser.GameObjects.Image;
    portraitRight!: Phaser.GameObjects.Image;

    // Dialogue Data
    dialogues: DialogueLine[] = [];
    dialogueIndex = 0;
    isTalking = false;

    constructor(
        scene: Phaser.Scene,
        player: Player
    ) {
        this.scene = scene;
        this.player = player;
        this.createUI();
    }

    createUI() {
        const cam = this.scene.cameras.main;

        // Dialogue - 박스
        this.dialogueBox = this.scene.add.rectangle(
            cam.width / 2,
            cam.height - 100,
            cam.width - 40,
            140,
            0x000000,
            0.7
        )
        .setScrollFactor(0)
        .setDepth(1000)
        .setVisible(false);
        
        // Dialogue - 이름
        this.nameText = this.scene.add.text(
            this.dialogueBox.x - this.dialogueBox.width / 2 + 20,
            this.dialogueBox.y - this.dialogueBox.height / 2 + 5,
            "",
            {
                fontSize: "18px",
                color: "#ffff00"
            }
        )
        .setScrollFactor(0)
        .setDepth(1001)
        .setVisible(false);

        // Dialogue - 대사
        this.dialogueText = this.scene.add.text(
            this.dialogueBox.x - this.dialogueBox.width / 2 + 20,
            this.dialogueBox.y - this.dialogueBox.height / 2 + 30,
            "",
            {
                fontSize: "20px",
                color: "#ffffff", 
                wordWrap:  {width: cam.width - 80}
            }
        )
        .setScrollFactor(0)
        .setDepth(1001)
        .setVisible(false);

        // Dialogue - 왼쪽 초상화
        this.portraitLeft = this.scene.add.image(
            100,
            cam.height - 200,
            "player"
        )
        .setScrollFactor(0)
        .setDepth(999)
        .setVisible(false);

        // Dialogue - 오른쪽 초상화
        this.portraitRight = this.scene.add.image(
            cam.width - 100,
            cam.height - 200,
            "npc"
        )
        .setScrollFactor(0)
        .setDepth(999)
        .setVisible(false);
    }

    start(dialogues: DialogueLine[]) {
        this.dialogues = dialogues;
        this.dialogueIndex = 0;
        this.isTalking = true;

        this.player.setMovable(false);
        
        this.dialogueBox.setVisible(true);
        this.nameText.setVisible(true);
        this.dialogueText.setVisible(true);

        this.showLine();
    }

    showLine() {
        const line = this.dialogues[this.dialogueIndex];

        this.nameText.setText(line.name);
        this.dialogueText.setText(line.text);

        if (line.speaker === "player") {
            this.portraitLeft.setVisible(true);
            this.portraitRight.setVisible(false);
        }

        else {
            this.portraitLeft.setVisible(false);
            this.portraitRight.setVisible(true);
        }
    }

    next() {
        if (!this.isTalking) return;

        this.dialogueIndex++;

        if (this.dialogueIndex < this.dialogues.length) {
            this.showLine();
        } else {
            this.end();
        }
    }

    end() {
        this.isTalking = false;

        this.player.setMovable(true);

        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.nameText.setVisible(false);
        this.portraitLeft.setVisible(false);
        this.portraitRight.setVisible(false);
    }
}