import type { TalkNPCConfig, EnemyNPCConfig } from "../../../../types/NPC";
import { allItems } from "../../itemDatas";

export const townNPCs: (TalkNPCConfig | EnemyNPCConfig)[] = [
    {
        id: "old_man",
        type: "talk",
        name: "노인",
        textureKey: "npc_rogue_idle",
        animKey: "npc_rogue_idle",
        frameWidth: 32,
        frameHeight: 32,
        frameCount: 4,
        scale: 2,
        x: 200,
        y: 200,
        dialogues: [
            { speaker: "npc", name: "name", text: "이 마을에 온 걸 환영하네." },
        ]
    },
    // {
    //     id: "skeleton_01",
    //     type: "enemy",
    //     name: "스켈레톤",
    //     textureKey: "enemy_skeleton_idle",
    //     animKey: "enemy_skeleton_idle",
    //     frameWidth: 32,
    //     frameHeight: 32,
    //     frameCount: 4,
    //     scale: 2,
    //     x: 300,
    //     y: 250,
    //     hp: 50,
    //     attack: 8,
    //     defense: 2,
    //     expReward: 30,
    //     dropItems: [
    //         { item: allItems["potion"], chance: 0.5 },
    //         { item: allItems["old_letter"], chance: 0.2 }
    //     ]
    // }
];