import * as THREE from 'three';
import {AppStateManager} from "../state/AppStateManager";

export class ThreeJsApplication {
    private readonly camera: THREE.PerspectiveCamera;
    private readonly scene: THREE.Scene;
    private readonly renderer: THREE.WebGLRenderer;
    private readonly clock = new THREE.Clock();
    private delta = 0;

    private readonly stateManager: AppStateManager;

    private readonly canvasSize = {
        x: 1200,
        y: 600,
    };

    constructor() {
        this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
        this.camera.position.set(0, 5, 50);
        // this.camera.rotateY(Math.PI);

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#b2b2b2');
        // this.renderer.setPixelRatio(window.devicePixelRatio); // not certain this is a great idea...
        this.renderer.setSize(640, 600);
        this.renderer.setAnimationLoop(this.updateLoop);

        this.stateManager = new AppStateManager();

        this.bindToWindow();
    }

    public bindToWindow() {
        window.addEventListener('resize', () => {
            this.canvasSize.x = window.innerWidth;
            this.canvasSize.y = window.innerHeight;

            this.renderer.setSize(this.canvasSize.x, this.canvasSize.y);
            this.camera.aspect = this.canvasSize.x / this.canvasSize.y;
            this.camera.updateProjectionMatrix();
        });
    }

    public getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    public getRenderer(): THREE.WebGLRenderer {
        return this.renderer;
    }

    public getScene(): THREE.Scene {
        return this.scene;
    }

    public getStateManager(): AppStateManager {
        return this.stateManager;
    }

    private updateLoop = () => {
        this.renderer.render(this.scene, this.camera);

        this.delta = this.clock.getDelta();
        this.stateManager.update(this.delta);
    }
}

export const threeJsApp = new ThreeJsApplication();
