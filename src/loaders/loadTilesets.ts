import * as Phaser from "phaser";

export default function loadTilesets(loader: Phaser.Loader.LoaderPlugin) {
    // tilesets
    loader.image("floors", "/assets/maps/Floors_Tiles.png");

    // maps
    loader.tilemapTiledJSON("homeMap", "/assets/maps/home.json");
}