import { Animation, AnimationGroup, EasingFunction, CubicEase, Vector2 } from "@babylonjs/core";
import { Rectangle } from "@babylonjs/gui";

export const buttonAnimation = (object: Rectangle, targetScale: Vector2, targetAlpha: number, duration: number) => {
  const animationScaleX = new Animation(
    "animationScaleX",
    "scaleX",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  );

  const keysScaleX = [];
  keysScaleX.push({ frame: 0, value: object.scaleX });
  keysScaleX.push({ frame: 60, value: targetScale.x });
  animationScaleX.setKeys(keysScaleX);

  const easingFunctionScaleX = new CubicEase();
  easingFunctionScaleX.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationScaleX.setEasingFunction(easingFunctionScaleX);

  const animationScaleY = new Animation(
    "animationScaleY",
    "scaleY",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  );

  const keysScaleY = [];
  keysScaleY.push({ frame: 0, value: object.scaleY });
  keysScaleY.push({ frame: 60, value: targetScale.y });
  animationScaleY.setKeys(keysScaleY);

  const easingFunctionScaleY = new CubicEase();
  easingFunctionScaleY.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationScaleY.setEasingFunction(easingFunctionScaleY);

  const animationAlpha = new Animation(
    "animationAlpha",
    "alpha",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  );

  const keysAlpha = [];
  keysAlpha.push({ frame: 0, value: object.alpha });
  keysAlpha.push({ frame: 60, value: targetAlpha });
  animationAlpha.setKeys(keysAlpha);

  const easingFunctionAlpha = new CubicEase();
  easingFunctionAlpha.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationAlpha.setEasingFunction(easingFunctionAlpha);

  const animationGroup = new AnimationGroup("animationScaleGroups");
  animationGroup.speedRatio = duration;
  animationGroup.addTargetedAnimation(animationScaleX, object);
  animationGroup.addTargetedAnimation(animationScaleY, object);
  animationGroup.addTargetedAnimation(animationAlpha, object);

  return animationGroup;
};

export default buttonAnimation;
