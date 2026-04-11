import * as Phaser from "phaser";

import { maps } from "../datas/mapDatas";

import Player from "../objects/Player";
import NPC from "../objects/NPC";
import Building from "../objects/Building";
import Portal from "../objects/Portal";

import DialogueSystem from "../systems/DialogueSystem";
import HUDSystem from "../systems/HUDSystem";
import MapNameSystem from "../systems/MapNameSystem";

export default class BaseScene extends Phaser.Scene {
    player!: Player;

    dialogue!: DialogueSystem;
    hud!: HUDSystem;
    mapName!: MapNameSystem;

    npcs: NPC[] = [];
    buildings: Building[] = [];
    portals: Portal[] = [];

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    zKey!: Phaser.Input.Keyboard.Key;

    mapWidth = 800;
    mapHeight = 600;

    spawnX?: number;
    spawnY?: number;

    constructor(key: string) {
        super(key);
    }

    init(data: any) {
        this.spawnX = data.spawnX ?? undefined;
        this.spawnY = data.spawnY ?? undefined;
    }

    create() {
        this.cursors = this.input.keyboard!.createCursorKeys();

        this.physics.world.setBounds(
            0,
            0,
            this.mapWidth,
            this.mapHeight
        );

        this.cameras.main.setBounds(
            0,
            0,
            this.mapWidth,
            this.mapHeight
        );

        this.player = new Player(
            this,
            this.spawnX ?? 100,
            this.spawnY ?? 100,
            this.cursors
        );

        this.cameras.main.startFollow(
            this.player.sprite
        );      
        
        this.dialogue = new DialogueSystem(
            this,
            this.player
        );

        this.hud = new HUDSystem(this, this.player.stats);

        this.mapName = new MapNameSystem(this);

        this.zKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        this.time.delayedCall(0, () => {
            if (this.player) {
                this.player.update();
            } 
        });
    }

    loadMap(mapKey: string) {
        const map = maps[mapKey];

        if (!map) {
            console.error("Map not found:", mapKey );
            return;
        }

        this.mapName.show(map.name);

        this.mapWidth = map.width;
        this.mapHeight = map.height;

        this.physics.world.setBounds(
            0,
            0,
            this.mapWidth,
            this.mapHeight
        );

        this.cameras.main.setBounds(
            0,
            0,
            this.mapWidth,
            this.mapHeight
        );

        this.add.rectangle(
            this.mapWidth / 2,
            this.mapHeight / 2,
            this.mapWidth,
            this.mapHeight,
            map.background
        )
        .setDepth(-1000);

        if (map.npcs) this.createNPCs(map.npcs);

        if (map.buildings) this.createBuildings(map.buildings);

        if (map.portals) {
            map.portals.forEach((p: any) => {
                this.createPortal(
                    p.x,
                    p.y,
                    p.width,
                    p.height,
                    p.target,
                    p.spawnX,
                    p.spawnY
                );
            });
        }
    }

    createNPCs(npcConfigs: any[]) {
        npcConfigs.forEach(data => {
            const npc =
                new NPC(
                    this,
                    data.x,
                    data.y,
                    data.dialogues
                );

            this.npcs.push(npc);
        });
    }
    createBuildings(buildingConfigs: any[]) {
        buildingConfigs.forEach(data => {
            const building = new Building(this, data);
            
            this.buildings.push(building);
        });
    }

    createPortal(
        x: number,
        y: number,
        width: number,
        height: number,
        targetScene: string,
        spawnX: number,
        spawnY: number
    ) {
        const portal = new Portal(
            this,
            x,
            y,
            width,
            height,
            targetScene,
            spawnX,
            spawnY
        );

        this.portals.push(portal);
    }

    checkInteraction() {

        if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
            if (this.dialogue.isTalking) {
                this.dialogue.next();

                return;
            }

            for (let npc of this.npcs) {
                const distance = Phaser.Math.Distance.Between(
                    this.player.sprite.x,
                    this.player.sprite.y,
                    npc.sprite.x,
                    npc.sprite.y
                );

                if (distance < 50) {
                    this.dialogue.start(npc.dialogues);

                    break;
                }
            }
        }
    }

    update() {
        if (this.player) this.player.update();
        if (this.zKey) this.checkInteraction();
        if (this.hud) this.hud.update();
    }
}