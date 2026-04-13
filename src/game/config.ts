import * as Phaser from "phaser";

import BootScene from "./scenes/BootScene";
import HomeScene from "./scenes/HomeScene";
import TownScene from "./scenes/TownScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,

    // 해상도 - 가로 800px, 세로 600px
    width: 800,
    height: 600,

    // 화면 크기 & 배치 - fit, 브라우저 중앙 배치
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    input: {
        keyboard: true
    },

    // 물리 엔진 설정 - Arcade Physics
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