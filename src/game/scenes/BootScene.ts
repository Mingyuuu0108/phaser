import * as Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        // 로딩 바 배경
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const barBg = this.add.rectangle(width / 2, height / 2, 320, 20, 0x333333)
            .setOrigin(0.5, 0.5);

        const bar = this.add.rectangle(width / 2 - 160, height / 2, 0, 20, 0x44aaff)
            .setOrigin(0, 0.5);

        const loadingText = this.add.text(width / 2, height / 2 - 30, "Loading...", {
            fontSize: "16px",
            color: "#ffffff"
        }).setOrigin(0.5, 0.5);

        // 로딩 진행률
        this.load.on("progress", (value: number) => {
            bar.width = 320 * value;
        });

        this.load.on("complete", () => {
            loadingText.setText("Complete!");
        });

        // 플레이어 스프라이트시트
        // Walk: 384x64 → 6프레임 (64x64)
        this.load.spritesheet("player_walk_down", "assets/characters/player/walk_down.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("player_walk_side", "/assets/characters/player/walk_side.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("player_walk_up", "/assets/characters/player/walk_up.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        // Idle: 256x64 → 4프레임 (64x64)
        this.load.spritesheet("player_idle_down", "/assets/characters/player/idle_down.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("player_idle_side", "/assets/characters/player/idle_side.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("player_idle_up", "/assets/characters/player/idle_up.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        // 타일셋
        this.load.image("floors", "/assets/tilesets/floors.png");
        this.load.image("walls", "/assets/tilesets/walls.png");
    }

    create() {
        this.scene.start("HomeScene");
    }
}