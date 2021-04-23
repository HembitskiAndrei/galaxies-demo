import { TransformNode, Mesh, Texture } from "@babylonjs/core";
import { GalaxiesSceneType } from "../types";
declare class IrregularGalaxy {
    name: string;
    galaxyMesh: Mesh;
    readonly coreTransformNode: TransformNode;
    private readonly scene;
    private readonly materialsForGalaxy;
    constructor(name: string, scene: GalaxiesSceneType);
    setNoiseTexture(texture: Texture): void;
}
export default IrregularGalaxy;
