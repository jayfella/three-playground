import { BaseAppState } from "../state/BaseAppState";
import * as THREE from 'three';
import { threeJsApp } from "../three/ThreeJsApplication";

export class CameraReticleState extends BaseAppState {
    private readonly reticle: THREE.Group;
    private readonly camDir = new THREE.Vector3();

    constructor() {
        super(false);
        this.reticle = new THREE.Group();

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        const size = 0.0015;
        const horizontalPoints = [
            new THREE.Vector3(-size, 0, 0),
            new THREE.Vector3(size, 0, 0),
        ];

        const verticalPoints = [
            new THREE.Vector3(0, -size, 0),
            new THREE.Vector3(0, size, 0),
        ];

        const horizontalGeometry = new THREE.BufferGeometry().setFromPoints(horizontalPoints);
        const horizontalLine = new THREE.Line(horizontalGeometry, material);
        this.reticle.add(horizontalLine);

        const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
        const verticalLine = new THREE.Line(verticalGeometry, material);
        this.reticle.add(verticalLine);
    }

    public onInitialize(): void {
    }

    public onEnable(): void {
        threeJsApp.getScene().add(this.reticle);
    }

    public onDisable(): void {
        threeJsApp.getScene().remove(this.reticle);
    }

    public cleanup(): void {
    }

    public update(): void {
        threeJsApp.getCamera().getWorldDirection(this.camDir);

        this.reticle.position.set(
            threeJsApp.getCamera().position.x + this.camDir.x * .1,
            threeJsApp.getCamera().position.y + this.camDir.y * .1,
            threeJsApp.getCamera().position.z + this.camDir.z * .1,
        );

        this.reticle.setRotationFromEuler(threeJsApp.getCamera().rotation);
    }
}
