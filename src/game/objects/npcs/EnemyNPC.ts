import NPC from "../NPC";
import type { EnemyNPCConfig } from "../../../types/NPC";
import type BaseScene from "../../scenes/BaseScene";
import type Player from "../Player";

export default class EnemyNPC extends NPC {
    declare config: EnemyNPCConfig;

    hp: number;

    constructor(scene: BaseScene, config: EnemyNPCConfig) {
        super(scene, config);
        this.hp = config.hp;
    }

    takeDamage(amount: number): number {
        const dmg = Math.max(1, amount - this.config.defense);
        this.hp = Math.max(0, this.hp - dmg);
        return dmg;
    }

    isDead() {
        return this.hp <= 0;
    }

    die(player: Player) {
        if (this.config.dropItems) {
            this.config.dropItems.forEach(({ item, chance }) => {
                if (Math.random() < chance) {
                    player.inventory.add(item);
                    console.log(`[Drop] ${item.name} 획득`);
                }
            });
        }

        this.sprite.destroy();
    }
}