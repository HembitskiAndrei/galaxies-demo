import {ParticleSystem, Texture} from "@babylonjs/core";
import { MainScene } from "../../scenes/MainScene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export class CoreParticles extends ParticleSystem{
  constructor(name: string, capacity: number, sceneOrEngine: MainScene) {
    super(name, capacity, sceneOrEngine);
  }

  init(color: Color4) {

    this.emitter = Vector3.Zero();

    this.color1 = color;
    this.color2 = color;
    this.colorDead = color;
    this.preWarmCycles = 4;
    this.preWarmStepOffset = 1;

    this.minSize = 250;
    this.maxSize = 250;

    this.minLifeTime = 1000000;
    this.maxLifeTime = 1000000;

    this.minEmitPower = 0;
    this.maxEmitPower = 0;

    this.emitRate = 1;

    return this;
  }

  setTexture(texture: Texture) {
    this.particleTexture = texture;
  }
}
