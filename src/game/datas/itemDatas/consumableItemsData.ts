import type { ConsumableItem } from "../../../types/Item";

export const consumableItemsData: Record<string, ConsumableItem> = {
    potion: {
        id: "potion",
        name: "회복 포션",
        description: "HP를 30 회복한다.",
        type: "consumable",
        healAmount: 30
    },
    hi_potion: {
        id: "hi_potion",
        name: "하이 포션",
        description: "HP를 100 회복한다.",
        type: "consumable",
        healAmount: 100
    }
};