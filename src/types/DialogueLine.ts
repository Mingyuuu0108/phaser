// 대화창 - 화자, 이름, 대사, 초상화
export interface DialogueLine {
    speaker: "npc" | "player";
    name: string;
    text: string;
    portrait?: string;
};