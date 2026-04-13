interface Pausable {
    stop(): void;
    resume(): void;
}

export default class GameManager {
    private pausables: Pausable[] = [];
    private isPaused = false;

    register(obj: Pausable) {
        if (!obj) {
            console.warn("[GameManager] undefined 객체는 등록할 수 없습니다.");
            return;
        }
        this.pausables.push(obj);
    }

    unregister(obj: Pausable) {
        this.pausables = this.pausables.filter(p => p !== obj);
    }

    pauseAll() {
        if (this.isPaused) return;
        this.isPaused = true;
        this.pausables.forEach(obj => {
            if (obj) obj.stop();
        });
    }

    resumeAll() {
        if (!this.isPaused) return;
        this.isPaused = false;
        this.pausables.forEach(obj => {
            if (obj) obj.resume();
        });
    }

    get paused() {
        return this.isPaused;
    }
}