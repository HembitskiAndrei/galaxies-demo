import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Galaxies } from "../../types";

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

    this.addBackButton();
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
    rect1.width = 0.175;
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
    label.fontSize = 20;
    rect1.addControl(label);
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
