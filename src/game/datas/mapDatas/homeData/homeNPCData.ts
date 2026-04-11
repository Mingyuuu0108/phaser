export const homeNPCs = [
    {
        x: 200,
        y: 150,
        npc_type: "guide_merchant",
        dialogues: [
            { speaker: "npc", name: "상인", text: "어이쿠, 처음 보는 얼굴이군요! 이 마을은 처음이신가요?" },
            { speaker: "player", name: "플레이어", text: "네, 방금 도착했습니다. 여기선 어떻게 움직여야 하죠?" },
            { speaker: "npc", name: "상인", text: "허허, 아주 기초적인 것부터 알려드리지요. 이동은 키보드의 **[화살표 키]**를 사용하면 됩니다." },
            { speaker: "npc", name: "상인", text: "지금 저와 대화하는 것처럼, 누군가에게 말을 걸거나 물건을 조사할 땐 **[Z] 키**를 누르세요." },
            { speaker: "player", name: "플레이어", text: "화살표로 움직이고 Z로 확인... 알겠습니다!" },
            { speaker: "npc", name: "상인", text: "좋습니다! 조작법을 익히셨으니 이제 제 물건들도 좀 보시겠습니까? 아주 귀한 것들이 많답니다." }
        ]
    },
    {
        x: 300,
        y: 300,
        dialogues: [
            { speaker: "npc", name: "상인", text: "안녕하세요 여행자님." },
            { speaker: "player", name: "플레이어", text: "물건 좀 보려고요." },
            { speaker: "npc", name: "상인", text: "좋은 물건 많습니다!" }
        ]
    },
];