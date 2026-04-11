import type { MiscItem } from "../../../types/Item";

export const miscItemsData: Record<string, MiscItem> = {
    old_letter: {
        id: "old_letter",
        name: "낡은 편지",
        description: "누군가에게 전달해야 할 것 같다.",
        type: "misc"
    },
    ancient_coin: {
        id: "ancient_coin",
        name: "고대 동전",
        description: "용도를 알 수 없는 동전이다.",
        type: "misc"
    }
};