import * as Phaser from "phaser";

export default function loadTilesets(loader: Phaser.Loader.LoaderPlugin) {
    loader.spritesheet("floors", "/assets/tilesets/floors.png", { frameWidth: 16, frameHeight: 16 });
    loader.spritesheet("walls", "/assets/tilesets/walls.png", { frameWidth: 16, frameHeight: 16 });
}