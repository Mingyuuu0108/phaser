import type { EquipmentItem } from "../../../types/Item";

export const armorItemsData: Record<string, EquipmentItem> = {
    leather_armor: {
        id: "leather_armor",
        name: "가죽 갑옷",
        description: "방어력이 5 증가한다.",
        type: "equipment",
        slot: "armor",
        defenseBonus: 5
    },
    iron_armor: {
        id: "iron_armor",
        name: "철 갑옷",
        description: "방어력이 10, 최대 HP가 20 증가한다.",
        type: "equipment",
        slot: "armor",
        defenseBonus: 10,
        maxHpBonus: 20
    }
};