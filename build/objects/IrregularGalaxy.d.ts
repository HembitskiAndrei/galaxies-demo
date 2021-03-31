import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MainScene } from "../scenes/MainScene";
export declare class IrregularGalaxy {
    galaxyMesh: Mesh;
    readonly coreTransformNode: TransformNode;
    private readonly scene;
    constructor(scene: MainScene);
    init(): this;
}
