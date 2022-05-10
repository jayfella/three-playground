import {BaseAppState} from "../state/BaseAppState";
import Stats from 'three/examples/jsm/libs/stats.module'

export class ThreeStatsState extends BaseAppState {

    private readonly stats = Stats();

    public constructor() {
        super();
    }

    onInitialize(): void {
    }

    onEnable(): void {
        document.body.appendChild(this.stats.dom)
    }

    onDisable(): void {
        document.body.removeChild(this.stats.dom);
    }

    cleanup(): void {
    }

    update(): void {
        this.stats.update()
    }
}
