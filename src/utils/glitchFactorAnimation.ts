import { Animation, AnimationGroup, EasingFunction, CubicEase } from "@babylonjs/core";
import { GlitchPostprocessType } from "../types";

const glitchFactorAnimation = (
  object: GlitchPostprocessType,
  currentGlitchFactor: number,
  targetGlitchFactor: number,
  duration: number,
) => {
  const animationGlitchFactor = new Animation(
    "animationGlitchFactor",
    "glitchFactor",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  );

  const keysGlitchFactor = [];
  keysGlitchFactor.push({ frame: 0, value: currentGlitchFactor });
  keysGlitchFactor.push({ frame: 20, value: targetGlitchFactor });
  keysGlitchFactor.push({ frame: 40, value: targetGlitchFactor });
  keysGlitchFactor.push({ frame: 60, value: currentGlitchFactor });
  animationGlitchFactor.setKeys(keysGlitchFactor);

  const easingFunctionGlitchFactor = new CubicEase();
  easingFunctionGlitchFactor.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationGlitchFactor.setEasingFunction(easingFunctionGlitchFactor);

  const animationGroup = new AnimationGroup("animationGlitchFactorGroups");
  animationGroup.speedRatio = duration;
  animationGroup.addTargetedAnimation(animationGlitchFactor, object);

  return animationGroup;
};

export default glitchFactorAnimation;
