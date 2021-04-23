import { TransformNode, Texture } from "@babylonjs/core";
import { GalaxiesSceneType } from "../types";
declare class SpiralGalaxy {
    name: string;
    readonly coreTransformNode: TransformNode;
    private readonly scene;
    private readonly materialsForGalaxy;
    constructor(name: string, scene: GalaxiesSceneType);
    SetNoiseTexture(texture: Texture): void;
}
export default SpiralGalaxy;
