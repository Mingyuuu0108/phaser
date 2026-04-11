import { consumableItemsData } from "./consumableItemsData";
import { weaponItemsData } from "./weaponItemsData";
import { armorItemsData } from "./armorItemsData";
import { miscItemsData } from "./miscItemsData";
import type { Item } from "../../../types/Item";

export const allItems: Record<string, Item> = {
    ...consumableItemsData,
    ...weaponItemsData,
    ...armorItemsData,
    ...miscItemsData
};

export { consumableItemsData, weaponItemsData, armorItemsData, miscItemsData };