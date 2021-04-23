import { Animation, AnimationGroup, EasingFunction, CubicEase } from "@babylonjs/core";
import { Rectangle } from "@babylonjs/gui";

export const barTransitionAnimation = (
  object: Rectangle,
  currentWidth: number,
  targetWidth: number,
  duration: number,
) => {
  const animationWidth = new Animation(
    "animationWidth",
    "widthInPixels",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  );

  const keysWidth = [];
  keysWidth.push({ frame: 0, value: currentWidth });
  keysWidth.push({ frame: 60, value: targetWidth });
  animationWidth.setKeys(keysWidth);

  const easingFunctionWidth = new CubicEase();
  easingFunctionWidth.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationWidth.setEasingFunction(easingFunctionWidth);

  const animationGroup = new AnimationGroup("animationWidthGroups");
  animationGroup.speedRatio = duration;
  animationGroup.addTargetedAnimation(animationWidth, object);
  animationGroup.onAnimationGroupEndObservable.add(function () {
    animationGroup.dispose();
  });
  return animationGroup;
};

export const barAlphaAnimation = (
  object: Rectangle,
  currentAlpha: number,
  targetAlpha: number,
  numFrame: number,
  duration: number,
) => {
  const animationAlpha = new Animation(
    "animationAlpha",
    "alpha",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );

  const keysAlpha = [];
  keysAlpha.push({ frame: 0, value: currentAlpha });
  keysAlpha.push({ frame: numFrame / 2, value: targetAlpha });
  keysAlpha.push({ frame: numFrame, value: currentAlpha });
  animationAlpha.setKeys(keysAlpha);

  const easingFunctionAlpha = new CubicEase();
  easingFunctionAlpha.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationAlpha.setEasingFunction(easingFunctionAlpha);

  const animationGroup = new AnimationGroup("animationAlphaGroups");
  animationGroup.speedRatio = duration;
  animationGroup.addTargetedAnimation(animationAlpha, object);
  animationGroup.normalize(0, 60);
  animationGroup.onAnimationGroupEndObservable.add(function () {
    animationGroup.dispose();
  });
  return animationGroup;
};
