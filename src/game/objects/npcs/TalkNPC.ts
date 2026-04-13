import NPC from "./NPC";
import type { TalkNPCConfig } from "../../../types/NPC";
import type BaseScene from "../../scenes/BaseScene";

export default class TalkNPC extends NPC {
    declare config: TalkNPCConfig;

    constructor(scene: BaseScene, config: TalkNPCConfig) {
        super(scene, config);
        this.dialogues = config.dialogues;
    }
}