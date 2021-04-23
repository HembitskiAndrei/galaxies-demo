import { AnimationGroup, Vector3 } from "@babylonjs/core";
import { GalaxiesType, GalaxyCameraType } from "../types";
export declare const cameraTransitionAnimation: (object: GalaxyCameraType, targetPosition: Vector3, duration: number, galaxy: GalaxiesType, onTurnOffObservable: any, onTurnOnObservable: any) => AnimationGroup;
