import { homeNPCs } from "./homeNPCData";
import { homePortals } from "./homePortalData";

const homeMapData = {
    name: "시작의 집",
    
    width: 800,
    height: 600,

    background: 0x88aaff,

    buildings: [],
    npcs: homeNPCs,
    portals: homePortals
};

export default homeMapData;