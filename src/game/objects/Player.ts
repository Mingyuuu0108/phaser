import * as Phaser from "phaser";
import StatSystem from "../systems/StatSystem";
import InventorySystem from "../systems/InventorySystem";
import GameManager from "../systems/GameManager";

export default class Player {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    body!: Phaser.Physics.Arcade.Body;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    stats: StatSystem;
    inventory: InventorySystem;

    speed = 200;
    canMove = true;

    private direction: "down" | "up" | "side" = "down";
    private isMoving = false;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        gameManager: GameManager
    ) {
        this.sprite = scene.add.sprite(x, y, "player_idle_down");

        this.scene = scene;
        this.cursors = cursors;

        this.stats = new StatSystem();
        this.inventory = new InventorySystem(this.scene, this.stats, gameManager);

        this.createAnimations();
        this.createSprite();
    }

    private createSprite() {
        this.sprite.setScale(2);

        this.scene.physics.add.existing(this.sprite);
        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
        this.body.setCollideWorldBounds(true);

        this.body.setSize(20, 16);
        this.body.setOffset(22, 44);

        this.sprite.play("idle_down");
    }

    private createAnimations() {
        const anims = this.scene.anims;

        if (anims.exists("walk_down")) return;

        anims.create({
            key: "walk_down",
            frames: anims.generateFrameNumbers("player_walk_down", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "walk_up",
            frames: anims.generateFrameNumbers("player_walk_up", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "walk_side",
            frames: anims.generateFrameNumbers("player_walk_side", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: "idle_down",
            frames: anims.generateFrameNumbers("player_idle_down", { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        anims.create({
            key: "idle_up",
            frames: anims.generateFrameNumbers("player_idle_up", { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        anims.create({
            key: "idle_side",
            frames: anims.generateFrameNumbers("player_idle_side", { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
    }

    update() {
        if (!this.canMove) {
            this.body.setVelocity(0, 0);
            this.playIdle();
            return;
        }

        let vx = 0;
        let vy = 0;

        if (this.cursors.left?.isDown) {
            vx = -this.speed;
            this.direction = "side";
            this.sprite.setFlipX(true);
        } else if (this.cursors.right?.isDown) {
            vx = this.speed;
            this.direction = "side";
            this.sprite.setFlipX(false);
        }

        if (this.cursors.up?.isDown) {
            vy = -this.speed;
            if (vx === 0) this.direction = "up";
        } else if (this.cursors.down?.isDown) {
            vy = this.speed;
            if (vx === 0) this.direction = "down";
        }

        // 대각선 속도 보정
        if (vx !== 0 && vy !== 0) {
            const norm = Math.SQRT2;
            vx /= norm;
            vy /= norm;
        }

        this.body.setVelocity(vx, vy);

        this.isMoving = vx !== 0 || vy !== 0;

        if (this.isMoving) {
            this.playWalk();
        } else {
            this.playIdle();
        }

        // Y축 depth 정렬
        this.sprite.setDepth(this.sprite.y);
    }

    private playWalk() {
        const key = `walk_${this.direction}`;
        if (this.sprite.anims.currentAnim?.key !== key) {
            this.sprite.play(key);
        }
    }

    private playIdle() {
        const key = `idle_${this.direction}`;
        if (this.sprite.anims.currentAnim?.key !== key) {
            this.sprite.play(key);
        }
    }

    stop() {
        this.canMove = false;
        this.body.setVelocity(0, 0);
    }

    resume() {
        this.canMove = true;
    }

    setMovable(movable: boolean) {
        this.canMove = movable;
        if (!movable) this.body.setVelocity(0, 0);
    }
}