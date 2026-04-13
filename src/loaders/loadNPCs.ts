import * as Phaser from "phaser";

export default function loadNPCs(loader: Phaser.Loader.LoaderPlugin) {
    loader.spritesheet("npc_rogue_idle", "/assets/npcs/rogue_idle.png", { 
        frameWidth: 32, 
        frameHeight: 32 
    });
    loader.spritesheet("npc_wizzard_idle", "/assets/npcs/wizzard_idle.png", { 
        frameWidth: 32, 
        frameHeight: 32 
    });
}