export interface AppState {
    initialize(): void;
    isInitialized(): boolean;
    setEnabled(value: boolean): void;
    isEnabled(): boolean;
    stateAttached(): void;
    stateDetached(): void;
    update(tpf: number): void;
    cleanup(): void;
}
