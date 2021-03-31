import { PBRCustomMaterial } from "@babylonjs/materials";
import { MainScene } from "../../scenes/MainScene";
import { Texture } from "@babylonjs/core";
import { GalaxyMaterialConfig } from "../../types";
export declare class GalaxyMaterial extends PBRCustomMaterial {
    constructor(name: string, scene: MainScene, config: GalaxyMaterialConfig);
    setTexture(texture: Texture): void;
}
