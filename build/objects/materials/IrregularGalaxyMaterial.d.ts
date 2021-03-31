import { PBRCustomMaterial } from "@babylonjs/materials";
import { MainScene } from "../../scenes/MainScene";
import { Texture } from "@babylonjs/core";
export declare class IrregularGalaxyMaterial extends PBRCustomMaterial {
    constructor(name: string, scene: MainScene);
    init(): this;
    setTexture(texture: Texture): void;
}
