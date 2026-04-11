import type { EquipmentItem } from "../../../types/Item";

export const weaponItemsData: Record<string, EquipmentItem> = {
    wood_sword: {
        id: "wood_sword",
        name: "나무 검",
        description: "공격력이 5 증가한다.",
        type: "equipment",
        slot: "weapon",
        attackBonus: 5
    },
    iron_sword: {
        id: "iron_sword",
        name: "철 검",
        description: "공격력이 10 증가한다.",
        type: "equipment",
        slot: "weapon",
        attackBonus: 10
    }
};