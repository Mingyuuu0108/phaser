import * as Phaser from "phaser";
import type { Item, InventoryItem, EquipmentSlot, EquipmentItem } from "../../types/Item";
import GameManager from "./GameManager";
import StatSystem from "./StatSystem";

type Tab = "items" | "equip";

export default class InventorySystem {
    // 아이템 데이터
    items: InventoryItem[] = [];
    equipped: Record<EquipmentSlot, EquipmentItem | null> = {
        weapon: null,
        armor: null
    };

    // UI
    private scene: Phaser.Scene;
    private container!: Phaser.GameObjects.Container;
    private renderGroup!: Phaser.GameObjects.Group;
    private descText!: Phaser.GameObjects.Text;
    private tabText!: Phaser.GameObjects.Text;

    private stats: StatSystem;
    private isOpen = false;
    private selectedIndex = 0;
    private currentTab: Tab = "items";

    private upKey!: Phaser.Input.Keyboard.Key;
    private downKey!: Phaser.Input.Keyboard.Key;
    private leftKey!: Phaser.Input.Keyboard.Key;
    private rightKey!: Phaser.Input.Keyboard.Key;
    private enterKey!: Phaser.Input.Keyboard.Key;
    private xKey!: Phaser.Input.Keyboard.Key;

    private readonly W = 500;
    private readonly H = 400;
    private readonly PADDING = 40;

    // 게임 매니저
    private gameManager: GameManager;

    constructor(scene: Phaser.Scene, stats: StatSystem, gameManager: GameManager) {
        this.scene = scene;
        this.stats = stats;
        this.gameManager = gameManager;

        this.createUI();
        this.registerKeys();
        this.hide();
    }

    // ── UI 생성 ────────────────────────────────────────

    private createUI() {
        const cx = this.scene.cameras.main.width / 2;
        const cy = this.scene.cameras.main.height / 2;

        this.container = this.scene.add.container(0, 0);
        this.container.setScrollFactor(0);
        this.container.setDepth(2000);

        // 어두운 배경
        const dim = this.scene.add.rectangle(
            0, 0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000, 0.7
        ).setOrigin(0, 0);

        // 메인 패널
        const panel = this.scene.add.rectangle(cx, cy, this.W, this.H, 0x1a1a2e)
            .setOrigin(0.5, 0.5);

        // 테두리
        const border = this.scene.add.rectangle(cx, cy, this.W, this.H)
            .setOrigin(0.5, 0.5)
            .setStrokeStyle(2, 0x4444aa);

        // 제목
        const title = this.scene.add.text(cx, cy - this.H / 2 + 16, "인벤토리", {
            fontSize: "18px",
            color: "#ffff88"
        }).setOrigin(0.5, 0);

        // 탭
        this.tabText = this.scene.add.text(cx, cy - this.H / 2 + 44, "", {
            fontSize: "13px",
            color: "#aaaaaa"
        }).setOrigin(0.5, 0);

        // 구분선
        const line = this.scene.add.rectangle(cx, cy - this.H / 2 + 66, this.W - 20, 1, 0x444466)
            .setOrigin(0.5, 0);

        // 설명
        this.descText = this.scene.add.text(cx, cy + this.H / 2 - 36, "", {
            fontSize: "12px",
            color: "#cccccc",
            wordWrap: { width: this.W - 40 }
        }).setOrigin(0.5, 0);

        // 조작 안내
        const guide = this.scene.add.text(
            cx, cy + this.H / 2 - 16,
            "TAB: 탭 전환   Enter: 사용/해제   I: 닫기",
            { fontSize: "11px", color: "#666688" }
        ).setOrigin(0.5, 0);

        // 렌더 그룹 (아이템 목록)
        this.renderGroup = this.scene.add.group();

        this.container.add([dim, panel, border, title, this.tabText, line, this.descText, guide]);
    }

    private registerKeys() {
        this.upKey = this.scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );
        this.downKey = this.scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this.leftKey = this.scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        this.rightKey = this.scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );
        this.enterKey = this.scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.xKey = this.scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.X
        );
    }

    // ── 열기 / 닫기 ────────────────────────────────────

    open() {
        this.isOpen = true;
        this.selectedIndex = 0;
        this.currentTab = "items";
        this.container.setVisible(true);
        this.gameManager!.pauseAll();
        this.renderList();
    }

    hide() {
        this.isOpen = false;
        this.gameManager!.resumeAll();
        this.renderGroup.clear(true, true);
        this.container.setVisible(false);
    }

    toggle() {
        this.isOpen ? this.hide() : this.open();
    }

    update() {
        if (!this.isOpen) return;

        if (Phaser.Input.Keyboard.JustDown(this.leftKey) || Phaser.Input.Keyboard.JustDown(this.rightKey)) {
            this.currentTab = this.currentTab === "items" ? "equip" : "items";
            this.selectedIndex = 0;
            this.renderList();
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
            this.selectedIndex = Math.max(0, this.selectedIndex - 1);
            this.renderList();
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
            this.selectedIndex = Math.min(this.maxIndex(), this.selectedIndex + 1);
            this.renderList();
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.useSelected();
        }

        if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
            //
        }
    }

    private renderList() {
        this.renderGroup.clear(true, true);
        this.descText.setText("");

        const cx = this.scene.cameras.main.width / 2;
        const cy = this.scene.cameras.main.height / 2;
        const startX = cx - this.W / 2 + this.PADDING;
        const startY = cy - this.H / 2 + 80;

        const itemTab  = this.currentTab === "items" ? "▶ 아이템" : "  아이템";
        const equipTab = this.currentTab === "equip"  ? "▶ 장비"  : "  장비";
        this.tabText.setText(`${itemTab}        ${equipTab}`);

        if (this.currentTab === "items") {
            this.renderItems(startX, startY);
        } else {
            this.renderEquip(startX, startY);
        }
    }

    private renderItems(startX: number, startY: number) {
        if (this.items.length === 0) {
            const t = this.scene.add.text(
                startX,
                startY,
                "아이템이 없습니다.",
                {
                    fontSize: "14px",
                    color: "#666666"
                }
            )
            .setScrollFactor(0)
            .setDepth(2001);

            this.renderGroup.add(t);
            return;
        }

        this.items.forEach((entry: InventoryItem, i: number) => {
            const isSelected = i === this.selectedIndex;

            if (isSelected) {
                const bg = this.scene.add.rectangle(
                    startX + (this.W - this.PADDING * 2) / 2,
                    startY + i * 28,
                    this.W - this.PADDING * 2,
                    24,
                    0x333366
                )
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0)
                .setDepth(2001);

                this.renderGroup.add(bg);
                this.descText.setText(entry.item.description);
            }

            const t = this.scene.add.text(
                startX,
                startY + i * 28 - 8,
                `${this.getTypeTag(entry.item.type)} ${entry.item.name}  x${entry.quantity}`,
                { 
                    fontSize: "14px",
                    color: isSelected ? "#ffffff" : "#aaaaaa"
                }
            )
            .setScrollFactor(0)
            .setDepth(2002);

            this.renderGroup.add(t);
        });
    }

    private renderEquip(startX: number, startY: number) {
        const slots: EquipmentSlot[] = ["weapon", "armor"];
        const slotNames: Record<EquipmentSlot, string> = {
            weapon: "무기",
            armor: "방어구"
        };

        slots.forEach((slot, i) => {
            const isSelected = i === this.selectedIndex;
            const equipped = this.equipped[slot];

            if (isSelected) {
                const bg = this.scene.add.rectangle(
                    startX + (this.W - this.PADDING * 2) / 2,
                    startY + i * 28,
                    this.W - this.PADDING * 2,
                    24,
                    0x333366
                )
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0)
                .setDepth(2001);

                this.renderGroup.add(bg);
                if (equipped) this.descText.setText(equipped.description);
            }

            const t = this.scene.add.text(
                startX,
                startY + i * 28 - 8,
                `[${slotNames[slot]}]  ${equipped ? equipped.name : "비어있음"}`,
                { fontSize: "14px", color: isSelected ? "#ffffff" : "#aaaaaa" }
            )
            .setScrollFactor(0)
            .setDepth(2002);

            this.renderGroup.add(t);
        });
    }

    // ── 액션 ───────────────────────────────────────────

    private useSelected() {
        if (this.currentTab === "items") {
            const entry = this.items[this.selectedIndex];
            if (!entry) return;

            console.log(`[인벤토리] ${this.use(entry.item.id)}`);
            this.selectedIndex = Math.min(this.selectedIndex, Math.max(0, this.items.length - 1));
        } else {
            const slots: EquipmentSlot[] = ["weapon", "armor"];
            console.log(`[인벤토리] ${this.unequip(slots[this.selectedIndex])}`);
        }

        this.renderList();
    }

    // ── 아이템 조작 ────────────────────────────────────

    add(item: Item, quantity: number = 1) {
        const existing = this.items.find(i => i.item.id === item.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ item, quantity });
        }
        console.log(`[인벤토리] ${item.name} x${quantity} 획득`);
    }

    remove(itemId: string, quantity: number = 1): boolean {
        const index = this.items.findIndex(i => i.item.id === itemId);
        if (index === -1) return false;

        this.items[index].quantity -= quantity;
        if (this.items[index].quantity <= 0) this.items.splice(index, 1);

        return true;
    }

    use(itemId: string): string {
        const entry = this.items.find(i => i.item.id === itemId);
        if (!entry) return "아이템이 없습니다.";

        const { item } = entry;

        switch (item.type) {
            case "consumable":
                if (item.healAmount) {
                    this.stats.heal(item.healAmount);
                    this.remove(itemId);
                    return `${item.name} 사용 → HP +${item.healAmount}`;
                }
                return "사용할 수 없는 아이템입니다.";
            case "equipment":
                return this.equip(item as EquipmentItem);
            case "misc":
                return "이 아이템은 사용할 수 없습니다.";
            default:
                return "알 수 없는 아이템입니다.";
        }
    }

    equip(item: EquipmentItem): string {
        if (this.equipped[item.slot]) this.unequip(item.slot);
        this.equipped[item.slot] = item;
        this.remove(item.id);
        this.applyEquipment(item, 1);
        return `${item.name} 장착 완료`;
    }

    unequip(slot: EquipmentSlot): string {
        const item = this.equipped[slot];
        if (!item) return "장착된 아이템이 없습니다.";
        this.applyEquipment(item, -1);
        this.add(item);
        this.equipped[slot] = null;
        return `${item.name} 해제 완료`;
    }

    private applyEquipment(item: EquipmentItem, sign: 1 | -1) {
        if (item.attackBonus)  this.stats.stats.attack  += item.attackBonus  * sign;
        if (item.defenseBonus) this.stats.stats.defense += item.defenseBonus * sign;
        if (item.maxHpBonus) {
            this.stats.stats.maxHp += item.maxHpBonus * sign;
            this.stats.stats.hp = Math.min(this.stats.stats.hp, this.stats.stats.maxHp);
        }
    }

    // ── 유틸 ───────────────────────────────────────────

    has(itemId: string): boolean {
        return this.items.some(i => i.item.id === itemId);
    }

    getQuantity(itemId: string): number {
        return this.items.find(i => i.item.id === itemId)?.quantity ?? 0;
    }

    private maxIndex(): number {
        return this.currentTab === "items"
            ? Math.max(0, this.items.length - 1)
            : 1;
    }

    private getTypeTag(type: string): string {
        switch (type) {
            case "consumable": return "[소비]";
            case "equipment":  return "[장비]";
            case "misc":       return "[기타]";
            default:           return "";
        }
    }
}