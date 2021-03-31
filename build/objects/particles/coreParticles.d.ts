import { ParticleSystem, Texture } from "@babylonjs/core";
import { MainScene } from "../../scenes/MainScene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
export declare class CoreParticles extends ParticleSystem {
    constructor(name: string, capacity: number, sceneOrEngine: MainScene, color: Color4);
    setTexture(texture: Texture): void;
}
