import { townBuildings } from "./townBuildingData";
import { townNPCs } from "./townNPCData";
import { townPortals } from "./townPortalData";

const townMapData = {

    width: 800,
    height: 500,

    background: 0x55aa55,

    buildings: townBuildings,
    npcs: townNPCs,
    portals: townPortals
};

export default townMapData;