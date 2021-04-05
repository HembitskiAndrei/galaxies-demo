import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MainScene } from "../scenes/MainScene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
export declare class SpiralGalaxy {
    name: string;
    readonly coreTransformNode: TransformNode;
    solarSystem: TransformNode;
    planeLocalArm: AbstractMesh;
    planeSolarSystem: Mesh;
    planeTargetSolarSystem: Mesh;
    private readonly scene;
    private readonly materialsForGalaxy;
    constructor(name: string, scene: MainScene);
    AddMeshesForGUI(): void;
    SetNoiseTexture(texture: Texture): void;
}
