import * as Phaser from "phaser";

import BootScene from "./scenes/BootScene";
import HomeScene from "./scenes/HomeScene";
import TownScene from "./scenes/TownScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    input: {
        keyboard: true
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },

    scene: [
        BootScene,
        HomeScene,
        TownScene
    ]
};