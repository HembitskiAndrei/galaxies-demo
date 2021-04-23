import { Color4, ParticleSystem, Texture } from "@babylonjs/core";
import { GalaxiesSceneType } from "../../types";
declare class CoreParticles extends ParticleSystem {
    constructor(name: string, capacity: number, sceneOrEngine: GalaxiesSceneType, color: Color4);
    setTexture(texture: Texture): void;
}
export default CoreParticles;
