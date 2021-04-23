import { ArcRotateCamera, AnimationGroup, Vector3, Scene, AbstractMesh, Observable } from "@babylonjs/core";
import { cameraTransitionAnimation } from "../utils/cameraTransitionAnimation";
import { GalaxiesType } from "../types";

class GalaxyCamera extends ArcRotateCamera {
  canvas: HTMLCanvasElement;
  transitionAnimation: AnimationGroup;
  targetNode: AbstractMesh;
  onTurnOffObservable: any;
  onTurnOnObservable: any;

  constructor(
    name: string,
    alpha: number,
    beta: number,
    radius: number,
    target: Vector3,
    scene: Scene,
    canvas: HTMLCanvasElement,
    setActiveOnSceneIfNoneActive?: boolean,
  ) {
    super(name, alpha, beta, radius, target, scene, setActiveOnSceneIfNoneActive);
    this.onTurnOffObservable = new Observable();
    this.onTurnOnObservable = new Observable();
    this.position = new Vector3(0, 100, 400);
    this.canvas = canvas;
    this.minZ = 0.0;
    this.maxZ = 32000;
    this.lowerRadiusLimit = 250;
    this.upperRadiusLimit = 600;
    this.upperBetaLimit = Math.PI / 3;
    this.attachControl(this.canvas, false);

    this.targetNode = new AbstractMesh("target", scene);
    this.setTarget(this.targetNode);
  }

  SetTransitionAnimation(galaxy: GalaxiesType) {
    this.transitionAnimation = cameraTransitionAnimation(
      this,
      galaxy.coreTransformNode.position,
      100,
      galaxy,
      this.onTurnOffObservable,
      this.onTurnOnObservable,
    );
    this.transitionAnimation.play(false);
  }
}

export default GalaxyCamera;
