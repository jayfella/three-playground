import { AppState } from "./AppState";

type Constructor<T> = new (...args: any[]) => T;


export class AppStateManager {
    private readonly initializing: AppState[] = [];
    private readonly states: AppState[] = [];
    private readonly terminating: AppState[] = [];

    public attach(state: AppState) {
        if (!this.states.includes(state) && !this.initializing.includes(state)) {
            state.stateAttached();
            this.initializing.push(state);
        }
    }

    public detach(state: AppState): boolean {
        if (this.states.includes(state)) {
            state.stateDetached();
            this.states.splice(this.states.indexOf(state), 1);
            this.terminating.push(state);
            return true;
        } else if (this.initializing.includes(state)) {
            state.stateDetached();
            this.initializing.splice(this.initializing.indexOf(state), 1);
            return true;
        } else {
            return false;
        }
    }

    public hasState<T extends AppState>(state: Constructor<T>): boolean {
        return this.getState(state) !== undefined;
    }

    public getState<T extends AppState>(state: Constructor<T>): T {
        for (let i = 0; i < this.states.length; i++) {
            if (this.states[i] instanceof state) {
                return this.states[i] as T;
            }
        }

        for (let i = 0; i < this.initializing.length; i++) {
            if (this.initializing[i] instanceof state) {
                return this.initializing[i] as T;
            }
        }

        throw new Error(`AppState does not exist: ${state} - Check with hasState first!`);
    }

    public getStates(): AppState[] {
        return this.states;
    }

    private initializePending(): void {
        for (let i = 0; i < this.initializing.length; i++) {
            this.states.push(this.initializing[i]);
            this.initializing[i].initialize();
        }

        this.initializing.splice(0, this.initializing.length);
    }

    private terminatePending(): void {
        for (let i = 0; i < this.terminating.length; i++) {
            this.terminating[i].cleanup();
        }

        this.terminating.splice(0, this.terminating.length);
    }

    public update(tpf: number): void {
        this.terminatePending();
        this.initializePending();

        for (let i = 0; i < this.states.length; i++) {
            if (this.states[i].isEnabled()) {
                this.states[i].update(tpf);
            }
        }
    }
}
