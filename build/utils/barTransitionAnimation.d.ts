import { AnimationGroup } from "@babylonjs/core";
import { Rectangle } from "@babylonjs/gui";
export declare const barTransitionAnimation: (object: Rectangle, currentWidth: number, targetWidth: number, duration: number) => AnimationGroup;
export declare const barAlphaAnimation: (object: Rectangle, currentAlpha: number, targetAlpha: number, numFrame: number, duration: number) => AnimationGroup;
