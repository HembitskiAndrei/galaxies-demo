import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MainScene } from "../scenes/MainScene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
export declare class ElipticalGalaxy {
    name: string;
    galaxyMesh1: Mesh;
    galaxyMesh2: Mesh;
    galaxyMesh3: Mesh;
    private readonly materialForGalaxy1;
    private readonly materialForGalaxy2;
    private readonly materialForGalaxy3;
    readonly coreTransformNode: TransformNode;
    private readonly scene;
    constructor(name: string, scene: MainScene);
    setNoiseTexture(texture: Texture): void;
}
