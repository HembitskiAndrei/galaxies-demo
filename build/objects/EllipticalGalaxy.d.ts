import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MainScene } from "../scenes/MainScene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
export declare class EllipticalGalaxy {
    name: string;
    private readonly materialsForGalaxy;
    readonly coreTransformNode: TransformNode;
    private readonly scene;
    constructor(name: string, scene: MainScene);
    setNoiseTexture(texture: Texture): void;
}
