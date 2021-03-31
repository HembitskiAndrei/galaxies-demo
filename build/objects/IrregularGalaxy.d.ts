import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MainScene } from "../scenes/MainScene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
export declare class IrregularGalaxy {
    name: string;
    galaxyMesh: Mesh;
    readonly coreTransformNode: TransformNode;
    private readonly scene;
    private readonly materialForGalaxy;
    constructor(name: string, scene: MainScene);
    setNoiseTexture(texture: Texture): void;
}
