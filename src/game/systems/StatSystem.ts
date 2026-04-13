import type { Stats } from "../../types/Stats"; 

export default class StatSystem {
    stats: Stats;

    constructor() {
        this.stats = {
            hp: 100,
            maxHp: 100,

            attack: 10,
            defense: 5,

            gold: 0
        };
    }

    takeDamage(amount: number) {
        const damage = Math.max(1, amount - this.stats.defense);
        this.stats.hp = Math.max(0, this.stats.hp - damage);

        return damage;
    }

    heal(amount: number) {
        this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + amount);
    }
}