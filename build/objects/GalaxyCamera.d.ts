import { ArcRotateCamera, AnimationGroup, Vector3, Scene, AbstractMesh } from "@babylonjs/core";
import { GalaxiesType } from "../types";
declare class GalaxyCamera extends ArcRotateCamera {
    canvas: HTMLCanvasElement;
    transitionAnimation: AnimationGroup;
    targetNode: AbstractMesh;
    onTurnOffObservable: any;
    onTurnOnObservable: any;
    constructor(name: string, alpha: number, beta: number, radius: number, target: Vector3, scene: Scene, canvas: HTMLCanvasElement, setActiveOnSceneIfNoneActive?: boolean);
    SetTransitionAnimation(galaxy: GalaxiesType): void;
}
export default GalaxyCamera;
