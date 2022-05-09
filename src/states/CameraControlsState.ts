import { BaseAppState } from '../state/BaseAppState'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import * as THREE from 'three';
import { CameraReticleState } from "./CameraReticleState";
import {VersionedHolder} from "../version/VersionedHolder";
import {threeJsApp} from "../three/ThreeJsApplication";
import {VersionedReference} from "../version/VersionedReference";

export class CameraControlsState extends BaseAppState {
    private readonly cameraControls: PointerLockControls;

    private readonly lookModeHolder = new VersionedHolder(false);

    private readonly cameraData = {
        movement: new THREE.Vector3(), // determines the direction the keyboard wants the camera to move (-1 to +1).
        movementSpeed: 15, // how fast the camera moves in the above direction.
    };

    constructor() {
        super();

        this.cameraControls = new PointerLockControls(threeJsApp.getCamera(), threeJsApp.getRenderer().domElement);
    }

    public onInitialize(): void {
    }

    public onEnable(): void {
        threeJsApp.getRenderer().domElement.addEventListener('click', this.canvasClick);
        window.addEventListener('keydown', this.keyDownWalk);
        window.addEventListener('keyup', this.keyUpWalk);

        this.resetCamera();
    }

    public onDisable(): void {
        threeJsApp.getRenderer().domElement.removeEventListener('click', this.canvasClick);
        window.removeEventListener('keydown', this.keyDownWalk);
        window.removeEventListener('keyup', this.keyUpWalk);
    }

    public cleanup(): void {
    }

    public update(tpf: number): void {
        if (this.lookModeHolder.getObject() !== this.cameraControls.isLocked) {
            this.lookModeHolder.updateObject(this.cameraControls.isLocked);

            const reticleState = threeJsApp.getStateManager().getState(CameraReticleState);

            if (reticleState) {
                reticleState.setEnabled(this.cameraControls.isLocked);
            }
        }

        // move camera
        threeJsApp.getCamera().translateX(this.cameraData.movement.x * this.cameraData.movementSpeed * tpf);
        threeJsApp.getCamera().translateY(this.cameraData.movement.y * this.cameraData.movementSpeed * tpf);
        threeJsApp.getCamera().translateZ(this.cameraData.movement.z * this.cameraData.movementSpeed * tpf);

        threeJsApp.getCamera().updateMatrix();
    }

    private canvasClick = () => {
        if (this.cameraControls) {
            this.cameraControls.lock();
        }
    };

    private keyDownWalk = (e: KeyboardEvent) => {
        if (this.cameraControls && this.cameraControls.isLocked) {
            switch (e.code) {
                case 'KeyW':
                    this.cameraData.movement.z = -1;
                    break;
                case 'KeyS':
                    this.cameraData.movement.z = 1;
                    break;
                case 'KeyA':
                    this.cameraData.movement.x = -1;
                    break;
                case 'KeyD':
                    this.cameraData.movement.x = 1;
                    break;
                case 'KeyQ':
                    this.cameraData.movement.y = 1;
                    break;
                case 'KeyE':
                    this.cameraData.movement.y = -1;
                    break;
                default:
                    break;
            }
        }
    };

    private keyUpWalk = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'KeyW':
            case 'KeyS':
                this.cameraData.movement.z = 0;
                break;
            case 'KeyA':
            case 'KeyD':
                this.cameraData.movement.x = 0;
                break;
            case 'KeyQ':
            case 'KeyE':
                this.cameraData.movement.y = 0;
                break;
            default:
                break;
        }
    };

    public getMovementSpeed(): number {
        return this.cameraData.movementSpeed;
    }

    public setMovementSpeed(speed: number): void {
        this.cameraData.movementSpeed = speed;
    }

    public resetCamera(): void {
        threeJsApp.getCamera().position.x = 0;
        threeJsApp.getCamera().position.y = 5;
        threeJsApp.getCamera().position.z = 10;
        threeJsApp.getCamera().lookAt(0, 0, 0);
    };

    public isInLookMode(): boolean {
        return this.cameraControls.isLocked;
    }

    public createLookModeReference(): VersionedReference<boolean> {
        return this.lookModeHolder.createReference();
    }
}
