import { AnimationGroup, PostProcess, PostProcessOptions, Camera } from "@babylonjs/core";
import { GalaxiesSceneType } from "../../types";
import glitchFactorAnimation from "../../utils/glitchFactorAnimation";

class GlitchPostprocess extends PostProcess {
  glitchFactor: number;
  glitchFactorAnimation: AnimationGroup;

  constructor(
    name: string,
    fragmentUrl: string,
    parameters: string[],
    samplers: string[],
    options: number | PostProcessOptions,
    camera: Camera,
    scene: GalaxiesSceneType,
  ) {
    super(name, fragmentUrl, parameters, samplers, options, camera);

    this.glitchFactor = 0;
    this.glitchFactorAnimation = glitchFactorAnimation(this, 0, 1.25, 40);
    this.glitchFactorAnimation.onAnimationGroupEndObservable.add(() => {
      camera.detachPostProcess(this);
    });
    let time = 0;
    this.onApply = effect => {
      effect.setFloat2("resolution", this.width, this.height);
      effect.setFloat("glitchInterval", 1.0);
      effect.setFloat("glitchRate", 1.0);
      effect.setFloat("glitchFactor", this.glitchFactor);
      effect.setFloat("time", time);
      time += scene.getAnimationRatio();
    };
  }
}

export default GlitchPostprocess;
