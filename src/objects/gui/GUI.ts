import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { Ellipse } from "@babylonjs/gui/2D/controls/ellipse";
import { MultiLine } from "@babylonjs/gui/2D/controls/multiLine";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Galaxies } from "../../types";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import {AbstractMesh, TransformNode} from "@babylonjs/core";

export class GUI {
  advancedTexture: AdvancedDynamicTexture;
  onPointerUpObservable: any;
  onBackObservable: any;
  galaxiesButton: Rectangle[];
  backButton: Rectangle;

  constructor(name: string) {
    this.galaxiesButton = [];
    this.onPointerUpObservable = new Observable();
    this.onBackObservable = new Observable();
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(name);
    this.advancedTexture.idealWidth = 1024;
  }

  setVisibilityGalaxiesButton(value: boolean) {
    this.galaxiesButton.forEach(button => {
      button.isVisible = value;
    })
    this.setVisibilityBackButton(!value);
  }

  setVisibilityBackButton(value: boolean) {
    this.backButton.isVisible = value;
  }

  addLabel(text: string, galaxy: Galaxies) {
    const rect1 = new Rectangle();
    this.galaxiesButton.push(rect1)
    rect1.width = 0.2;
    rect1.height = "35px";
    rect1.cornerRadius = 10;
    rect1.color = "#878787";
    rect1.thickness = 4;
    rect1.background = "#454545";
    rect1.hoverCursor = "pointer";
    rect1.isPointerBlocker = true;
    rect1.onPointerEnterObservable.add(() => {
      rect1.background = "#5c5c5c";
      rect1.color = "#ffffff";
    })
    rect1.onPointerOutObservable.add(() => {
      rect1.background = "#454545";
      rect1.color = "#878787";
    })
    rect1.onPointerDownObservable.add(() => {
      rect1.background = "#555572";
      rect1.color = "#ffffff";
    })
    rect1.onPointerUpObservable.add(() => {
      rect1.background = "#5c5c5c";
      rect1.color = "#ffffff";
      this.onPointerUpObservable.notifyObservers(galaxy);
    })
    this.advancedTexture.addControl(rect1);
    rect1.linkWithMesh(galaxy.coreTransformNode);
    rect1.linkOffsetY = 100;

    const label = new TextBlock();
    label.text = text;
    label.color = "#ffffff";
    label.fontSize = 19;
    rect1.addControl(label);
  }

  addArmLabel(text: string, node: TransformNode, labelLocalArm: AbstractMesh) {
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(labelLocalArm, 1024, 256);

    const rect1 = new Rectangle();
    rect1.width = 1.0;
    rect1.height = 1.0;
    rect1.cornerRadius = 40;
    rect1.color = "#454545";
    rect1.thickness = 20;
    rect1.background = "#ffffff55";
    advancedTexture.addControl(rect1);
    rect1.linkWithMesh(node);
    rect1.linkOffsetY = -100;

    const label = new TextBlock();
    label.text = text;
    label.color = "#000000";
    label.fontSize = 150;
    rect1.addControl(label);
  }

  addSolarLabel(text: string, sun: Mesh, node: TransformNode, targetPlane: Mesh) {
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(sun, 1024, 512);

    const rect1 = new Rectangle();
    rect1.width = 1.0;
    rect1.height = 0.5;
    rect1.cornerRadius = 40;
    rect1.color = "#ffffff";
    rect1.thickness = 20;
    rect1.background = "#454545";
    advancedTexture.addControl(rect1);
    rect1.linkWithMesh(sun);
    rect1.linkOffsetY = -100;

    const label = new TextBlock();
    label.text = text;
    label.color = "#ffffff";
    label.fontSize = 100;
    rect1.addControl(label);

    const targetAdvancedTexture = AdvancedDynamicTexture.CreateForMesh(targetPlane);
    const target = new Ellipse();
    target.width = 1.0;
    target.height = 1.0;
    target.color = "#454545";
    target.thickness = 100;
    target.background = "#ffffff";
    targetAdvancedTexture.addControl(target);
    target.linkWithMesh(node);

    const line = new MultiLine();
    line.color = "#7b7b7b";
    line.lineWidth = 3;
    line.add(sun);
    line.add(targetPlane);

    this.advancedTexture.addControl(line);
  }

  addBackButton() {
    const rectback = new Rectangle();
    rectback.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rectback.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    rectback.left = "-40px";
    rectback.top = "40px";
    rectback.width = 0.1;
    rectback.height = "35px";
    rectback.cornerRadius = 10;
    rectback.color = "#878787";
    rectback.thickness = 4;
    rectback.background = "#454545";
    rectback.hoverCursor = "pointer";
    rectback.isPointerBlocker = true;
    rectback.onPointerEnterObservable.add(() => {
      rectback.background = "#5c5c5c";
      rectback.color = "#ffffff";
    })
    rectback.onPointerOutObservable.add(() => {
      rectback.background = "#454545";
      rectback.color = "#878787";
    })
    rectback.onPointerDownObservable.add(() => {
      rectback.background = "#555572";
      rectback.color = "#ffffff";
    })
    rectback.onPointerUpObservable.add(() => {
      rectback.background = "#5c5c5c";
      rectback.color = "#ffffff";
      this.onBackObservable.notifyObservers();
    })
    this.advancedTexture.addControl(rectback);

    const label = new TextBlock();
    label.text = "Back";
    label.color = "#ffffff";
    label.fontSize = 20;
    rectback.addControl(label);

    this.backButton = rectback;
    this.backButton.isVisible = false;
  }
}
