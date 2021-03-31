import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MainScene } from "../scenes/MainScene";
export declare class SpiralGalaxy {
    galaxyMesh1: Mesh;
    galaxyMesh2: Mesh;
    galaxyMesh3: Mesh;
    galaxyMesh4: Mesh;
    readonly coreTransformNode: TransformNode;
    private readonly scene;
    constructor(scene: MainScene);
    init(): this;
}
