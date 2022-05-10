import { AppState } from "./AppState";

export abstract class BaseAppState implements AppState {
    private initialized = false;
    private enabled: boolean;

    protected constructor(enabled = true) {
        this.enabled = enabled;
    }

    public abstract onInitialize(): void;

    public abstract onEnable(): void;

    public abstract onDisable(): void;

    public abstract cleanup(): void;

    public abstract update(tpf: number): void;

    public initialize(): void {
        this.initialized = true;

        this.onInitialize();

        if (this.isEnabled()) {
            this.onEnable();
        }
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public setEnabled(value: boolean) {
        if (this.enabled === value) {
            return;
        }

        this.enabled = value;

        if (value) {
            this.onEnable();
        } else {
            this.onDisable();
        }
    }

    public isEnabled() {
        return this.enabled;
    }

    public stateAttached() {
    }

    public stateDetached() {
    }
}
