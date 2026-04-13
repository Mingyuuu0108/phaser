import * as Phaser from "phaser";

export default function loadEnemies(loader: Phaser.Loader.LoaderPlugin) {
    loader.spritesheet("enemy_skeleton_idle", "/assets/enemies/skeleton_idle.png", {
        frameWidth: 32,
        frameHeight: 32
    });
    loader.spritesheet("enemy_skeleton_run", "/assets/enemies/skeleton_run.png", {
        frameWidth: 64,
        frameHeight: 64
    });
}