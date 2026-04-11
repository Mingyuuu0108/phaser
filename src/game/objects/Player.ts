import * as Phaser from "phaser";

export default class Player {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Rectangle;
    body!: Phaser.Physics.Arcade.Body;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    speed = 200;
    canMove = true;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        cursors: Phaser.Types.Input.Keyboard.CursorKeys
    ) {

        this.scene = scene;
        this.cursors = cursors;
        this.sprite = scene.add.rectangle(
            x, 
            y, 
            32, 
            32, 
            0x0000ff
        );

        scene.physics.add.existing(this.sprite);

        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

        this.body.setCollideWorldBounds(true);
    }

    update() {
        if (!this.canMove) {
            this.body.setVelocity(0, 0);

            return;
        }

        let vx = 0;
        let vy = 0;

        if (this.cursors.left?.isDown)
            vx = -this.speed;

        else if (this.cursors.right?.isDown)
            vx = this.speed;

        if (this.cursors.up?.isDown)
            vy = -this.speed;

        else if (this.cursors.down?.isDown)
            vy = this.speed;

        this.body.setVelocity(vx, vy);

        // DEV - 좌표 로그 
        if (vx !== 0 || vy !== 0) {
            console.log(`x: ${Math.floor(this.sprite.x)}, y: ${Math.floor(this.sprite.y)}`);
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

        if (!movable) {
            this.body.setVelocity(0, 0);
        }
    }
}