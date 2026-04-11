import { townBuildings } from "./townBuildingData";
import { townNPCs } from "./townNPCData";
import { townPortals } from "./townPortalData";

const townMapData = {
    name: "시작의 마을",

    width: 1200,
    height: 600,

    background: 0x55aa55,

    buildings: townBuildings,
    npcs: townNPCs,
    portals: townPortals
};

export default townMapData;