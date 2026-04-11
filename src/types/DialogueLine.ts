export type DialogueLine = {
    speaker: "npc" | "player";

    name: string;

    text: string;

    portrait?: string;
};