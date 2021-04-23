import { Color4, Vector3, ParticleSystem, Texture } from "@babylonjs/core";
import { GalaxiesSceneType } from "../../types";

class CoreParticles extends ParticleSystem {
  constructor(name: string, capacity: number, sceneOrEngine: GalaxiesSceneType, color: Color4) {
    super(name, capacity, sceneOrEngine);

    this.emitter = Vector3.Zero();

    this.color1 = color;
    this.color2 = color;
    this.colorDead = color;
    this.preWarmCycles = 12;
    this.preWarmStepOffset = 4;

    this.minSize = 50;
    this.maxSize = 50;

    this.minLifeTime = 1000000;
    this.maxLifeTime = 1000000;

    this.minEmitPower = 0;
    this.maxEmitPower = 0;

    this.emitRate = 1;
  }

  setTexture(texture: Texture) {
    this.particleTexture = texture;
  }
}

export default CoreParticles;
