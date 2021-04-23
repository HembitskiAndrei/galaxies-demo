import {
  Animation,
  AnimationGroup,
  AnimationEvent,
  ExponentialEase,
  CubicEase,
  EasingFunction,
  Vector3,
} from "@babylonjs/core";
import { GalaxiesType, GalaxyCameraType } from "../types";

export const cameraTransitionAnimation = (
  object: GalaxyCameraType,
  targetPosition: Vector3,
  duration: number,
  galaxy: GalaxiesType,
  onTurnOffObservable: any,
  onTurnOnObservable: any,
) => {
  const animationTargetPosition = new Animation(
    "animationTargetPosition",
    "position",
    1,
    Animation.ANIMATIONTYPE_VECTOR3,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );

  const keysTargetPosition = [];
  keysTargetPosition.push({ frame: 0, value: object.targetNode.position });
  keysTargetPosition.push({ frame: 160, value: targetPosition });
  animationTargetPosition.setKeys(keysTargetPosition);

  const easingFunctionTargetPosition = new ExponentialEase(5);
  easingFunctionTargetPosition.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationTargetPosition.setEasingFunction(easingFunctionTargetPosition);

  const eventAnimationPosition = new AnimationEvent(80, () => {
    onTurnOffObservable.notifyObservers(false);
  });

  animationTargetPosition.addEvent(eventAnimationPosition);

  const animationRadius = new Animation(
    "animationRadius",
    "radius",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );

  const tmpRadius = object.radius;
  const keysRadius = [];
  keysRadius.push({ frame: 0, value: object.radius });
  keysRadius.push({ frame: 78, value: tmpRadius + 200 });
  keysRadius.push({ frame: 79, value: tmpRadius });
  keysRadius.push({ frame: 160, value: tmpRadius });
  animationRadius.setKeys(keysRadius);

  const easingFunctionRadius = new ExponentialEase(1);
  easingFunctionRadius.setEasingMode(EasingFunction.EASINGMODE_EASEIN);
  animationRadius.setEasingFunction(easingFunctionRadius);

  const animationAlpha = new Animation(
    "animationAlpha",
    "alpha",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );

  const keysAlpha = [];
  keysAlpha.push({ frame: 0, value: object.alpha });
  keysAlpha.push({ frame: 60, value: Math.PI / 2 });
  keysAlpha.push({ frame: 160, value: Math.PI / 2 });
  animationAlpha.setKeys(keysAlpha);

  const easingFunctionAlpha = new CubicEase();
  easingFunctionAlpha.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationAlpha.setEasingFunction(easingFunctionAlpha);

  const animationBeta = new Animation(
    "animationBeta",
    "beta",
    1,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );

  const keysBeta = [];
  keysBeta.push({ frame: 0, value: object.beta });
  keysBeta.push({ frame: 60, value: Math.PI / 3 });
  keysBeta.push({ frame: 160, value: Math.PI / 3 });
  animationBeta.setKeys(keysBeta);

  const easingFunctionBeta = new CubicEase();
  easingFunctionBeta.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  animationBeta.setEasingFunction(easingFunctionBeta);

  const eventTurnOnAnimationPosition = new AnimationEvent(20, () => {
    onTurnOnObservable.notifyObservers(true);
  });

  animationBeta.addEvent(eventTurnOnAnimationPosition);

  const animationGroup = new AnimationGroup(`animationTransitionGroups_${object.name}`, object.getScene());
  animationGroup.addTargetedAnimation(animationTargetPosition, object.targetNode);
  animationGroup.addTargetedAnimation(animationRadius, object);
  animationGroup.addTargetedAnimation(animationAlpha, object);
  animationGroup.addTargetedAnimation(animationBeta, object);
  animationGroup.speedRatio = duration;
  animationGroup.normalize(0, 160);
  animationGroup.onAnimationGroupEndObservable.add(function () {
    animationGroup.dispose();
  });
  return animationGroup;
};
