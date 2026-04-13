export const homeNPCs = [
    {
        x: 200,
        y: 150,
        npc_type: "guide_merchant",
        dialogues: [
            { speaker: "npc", name: "상인", text: "어이쿠, 처음 보는 얼굴이군요! 이 마을은 처음이신가요?" },
            { speaker: "player", name: "바케샤", text: "네, 방금 도착했습니다. 여기선 어떻게 움직여야 하죠?" },
            { speaker: "npc", name: "상인", text: "허허, 아주 기초적인 것부터 알려드리지요. 이동은 키보드의 [화살표 키]를 사용하면 됩니다." },
            { speaker: "npc", name: "상인", text: "지금 저와 대화하는 것처럼, 누군가에게 말을 걸거나 물건을 조사할 땐 [Z] 키를 누르세요." },
            { speaker: "player", name: "바케샤", text: "화살표로 움직이고 Z로 확인... 알겠습니다!" },
            { speaker: "npc", name: "상인", text: "좋습니다! 저희 마을에 오신 것을 환영합니다." }
        ]
    },
    {
        x: 300,
        y: 300,
        dialogues: [
            { speaker: "npc", name: "상인", text: "안녕하세요 여행자님." },
            { speaker: "npc", name: "상인", text: "저희 가게에는 여러 좋은 물건들이 많답니다!" },
            { speaker: "npc", name: "상인", text: "아! 여행하면서 얻은 물건들은 [X] 키를 누르시고 인벤토리 열어서 확인하실 수 있어요!"},
            { speaker: "player", name: "바케샤", text: "알겠습니다!" },
            { speaker: "npc", name: "상인", text: "언제든지 다시 찾아와요~" }
        ]
    },
];