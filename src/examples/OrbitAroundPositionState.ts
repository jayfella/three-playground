import {BaseAppState} from "../state/BaseAppState";
import * as THREE from 'three';
import {threeJsApp} from "../three/ThreeJsApplication";
import {Vector3} from "three";

export class OrbitAroundPositionState extends BaseAppState {

    private readonly pointCube: THREE.Mesh;
    private readonly rotatingCube: THREE.Mesh;

    private readonly pointPos: THREE.Vector3 = new Vector3(2, 0, 0);
    private readonly radius = 3;
    private readonly rotationSpeed = 2;

    constructor() {
        super();

        const pointGeom = new THREE.BoxGeometry(1, 1, 1);
        const pointMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.pointCube = new THREE.Mesh(pointGeom, pointMat);

        const cubeGeom = new THREE.BoxGeometry(1, 1, 1);
        const cubeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.rotatingCube = new THREE.Mesh(cubeGeom, cubeMat);

    }

    onInitialize(): void {
    }

    onEnable(): void {
        this.pointCube.position.set(this.pointPos.x, this.pointPos.y, this.pointPos.z);

        threeJsApp.getScene().add(this.pointCube);
        threeJsApp.getScene().add(this.rotatingCube);
    }

    onDisable(): void {
        threeJsApp.getScene().add(this.pointCube);
        threeJsApp.getScene().remove(this.rotatingCube);
    }

    cleanup(): void {
    }

    private theta = 0;

    update(tpf: number): void {
        this.theta += tpf * this.rotationSpeed;


        const x = this.pointPos.x + (this.radius * Math.cos(this.theta));
        const z = this.pointPos.z + (this.radius * Math.sin(this.theta));

        this.rotatingCube.position.x = x;
        this.rotatingCube.position.z = z;
    }

}