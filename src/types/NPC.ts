import type { Item } from "./Item";
import type { DialogueLine } from "./DialogueLine";

export type NPCType = "talk" | "shop" | "quest" | "enemy";

// 베이스
export interface BaseNPCConfig {
    id: string;
    type: NPCType;
    name: string;
    textureKey: string;       // BootScene에서 load한 키
    animKey: string;          // idle 애니메이션 키
    frameWidth: number;
    frameHeight: number;
    frameCount: number;
    scale?: number;
    x: number;
    y: number;
}

// 대화 NPC
export interface TalkNPCConfig extends BaseNPCConfig {
    type: "talk";
    dialogues: DialogueLine[];
}

// 상점 NPC
export interface ShopNPCConfig extends BaseNPCConfig {
    type: "shop";
    dialogues: DialogueLine[];
    shopItems: { item: Item; price: number }[];
}

// 퀘스트 NPC
export interface QuestNPCConfig extends BaseNPCConfig {
    type: "quest";
    dialogues: DialogueLine[];
    rewardItems?: Item[];
    rewardExp?: number;
    questId: string;
}

// 전투 NPC
export interface EnemyNPCConfig extends BaseNPCConfig {
    type: "enemy";
    hp: number;
    attack: number;
    defense: number;
    expReward: number;
    dropItems?: { item: Item; chance: number }[];  // chance: 0~1
}

export type NPCConfig =
    | TalkNPCConfig
    | ShopNPCConfig
    | QuestNPCConfig
    | EnemyNPCConfig;