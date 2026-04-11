export type ItemType = "consumable" | "equipment" | "misc";

export type EquipmentSlot = "weapon" | "armor";

// 기본 아이템
export interface BaseItem {
    id: string;
    name: string;
    description: string;
    type: ItemType;
}

// 소비 아이템
export interface ConsumableItem extends BaseItem {
    type: "consumable";
    healAmount?: number;
}

// 장비 아이템
export interface EquipmentItem extends BaseItem {
    type: "equipment";
    slot: EquipmentSlot;
    attackBonus?: number;
    defenseBonus?: number;
    maxHpBonus?: number;
}

// 기타 아이템 (퀘스트 등)
export interface MiscItem extends BaseItem {
    type: "misc";
}

export type Item = ConsumableItem | EquipmentItem | MiscItem;

export interface InventoryItem {
    item: Item;
    quantity: number;
}