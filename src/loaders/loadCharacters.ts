import * as Phaser from "phaser";

export default function loadCharacters(loader: Phaser.Loader.LoaderPlugin) {
    loader.spritesheet("player_walk_down", "/assets/characters/player/walk_down.png", { frameWidth: 64, frameHeight: 64 });
    loader.spritesheet("player_walk_side", "/assets/characters/player/walk_side.png", { frameWidth: 64, frameHeight: 64 });
    loader.spritesheet("player_walk_up", "/assets/characters/player/walk_up.png", { frameWidth: 64, frameHeight: 64 });
    loader.spritesheet("player_idle_down", "/assets/characters/player/idle_down.png", { frameWidth: 64, frameHeight: 64 });
    loader.spritesheet("player_idle_side", "/assets/characters/player/idle_side.png", { frameWidth: 64, frameHeight: 64 });
    loader.spritesheet("player_idle_up", "/assets/characters/player/idle_up.png", { frameWidth: 64, frameHeight: 64 });
}