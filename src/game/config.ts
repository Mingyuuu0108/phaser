import * as Phaser from "phaser";

import BootScene from "./scenes/BootScene";
import HomeMap from "./scenes/HomeScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,

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
        HomeMap
    ]
};