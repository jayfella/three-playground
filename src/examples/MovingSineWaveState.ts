import {BaseAppState} from "../state/BaseAppState";
import * as THREE from 'three';
import {threeJsApp} from "../three/ThreeJsApplication";

export class MovingSineWaveState extends BaseAppState {
    private readonly sphere: THREE.Mesh;

    private position = new THREE.Vector3(-5, 0, 0);
    private sine = 0;
    private speed = 2;

    constructor() {
        super();

        const sphereGeom = new THREE.SphereGeometry(0.2);
        const sphereMesh = new THREE.MeshBasicMaterial({ color: 0x0000ff });

        this.sphere = new THREE.Mesh(sphereGeom, sphereMesh);
    }

    onInitialize(): void {
    }

    onEnable(): void {
        threeJsApp.getScene().add(this.sphere);
    }

    onDisable(): void {
        threeJsApp.getScene().remove(this.sphere);
    }

    cleanup(): void {
    }

    update(tpf: number): void {
        this.sine += tpf * this.speed;

        this.position.x += tpf * this.speed;
        this.position.y = Math.sin(this.sine);

        this.sphere.position.set(this.position.x, this.position.y, this.position.z);
    }
}