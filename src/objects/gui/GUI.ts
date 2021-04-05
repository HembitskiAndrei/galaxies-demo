import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { Ellipse } from "@babylonjs/gui/2D/controls/ellipse";
import { MultiLine } from "@babylonjs/gui/2D/controls/multiLine";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Galaxies } from "../../types";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { ISolarLabelsConfig } from "../../types";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";

export class GUI {
  advancedTexture: AdvancedDynamicTexture;
  onPointerUpObservable: any;
  onBackObservable: any;
  galaxiesButton: Rectangle[];
  backButton: Rectangle;
  lineToLabel: MultiLine;
  solarSystemNode: TransformNode;
  localArmPlane: AbstractMesh;

  constructor(name: string) {
    this.galaxiesButton = [];
    this.onPointerUpObservable = new Observable();
    this.onBackObservable = new Observable();
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(name);
    this.advancedTexture.idealWidth = 1024;
  }

  SetVisibilityGalaxiesButton(value: boolean) {
    this.galaxiesButton.forEach(button => {
      button.isVisible = value;
    })
    this.SetVisibilityBackButton(!value);
  }

  SetVisibilityBackButton(value: boolean) {
    this.backButton.isVisible = value;
  }

  AddLabel(text: string, galaxy: Galaxies) {
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

  AddSolarLabel(config: ISolarLabelsConfig) {
    this.solarSystemNode = config.solarSystem;
    this.localArmPlane = config.planeArmLabel;
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(config.planeSolarLabel, 1024, 512);

    const rect1 = new Rectangle();
    rect1.width = 1.0;
    rect1.height = 0.5;
    rect1.cornerRadius = 40;
    rect1.color = "#ffffff";
    rect1.thickness = 20;
    rect1.background = "#454545";
    advancedTexture.addControl(rect1);
    rect1.linkWithMesh(config.planeSolarLabel);
    rect1.linkOffsetY = -100;

    const label = new TextBlock();
    label.text = config.textSolarLabel;
    label.color = "#ffffff";
    label.fontSize = 100;
    rect1.addControl(label);

    const targetAdvancedTexture = AdvancedDynamicTexture.CreateForMesh(config.planeTargetSolarSystem);
    const target = new Ellipse();
    target.width = 1.0;
    target.height = 1.0;
    target.color = "#454545";
    target.thickness = 100;
    target.background = "#ffffff";
    targetAdvancedTexture.addControl(target);
    target.linkWithMesh(config.solarSystem);

    this.lineToLabel = new MultiLine();
    this.lineToLabel.color = "#ffffff";
    this.lineToLabel.lineWidth = 4;
    this.lineToLabel.add(config.planeSolarLabel);
    this.lineToLabel.add(config.planeTargetSolarSystem);

    this.advancedTexture.addControl(this.lineToLabel);

    const advancedTextureArm = AdvancedDynamicTexture.CreateForMesh(config.planeArmLabel, 1024, 256);

    const rectArm = new Rectangle();
    rectArm.width = 1.0;
    rectArm.height = 1.0;
    rectArm.cornerRadius = 40;
    rectArm.color = "#454545";
    rectArm.thickness = 20;
    rectArm.background = "#ffffff55";
    advancedTextureArm.addControl(rectArm);
    rectArm.linkWithMesh(config.solarSystem);
    rectArm.linkOffsetY = -100;

    const labelArm = new TextBlock();
    labelArm.text = config.textArmLabel;
    labelArm.color = "#000000";
    labelArm.fontSize = 150;
    rectArm.addControl(labelArm);
  }

  SetSolarLabelsVisibility(value: boolean) {
    this.lineToLabel.isVisible = value;
    this.solarSystemNode.setEnabled(value);
    this.localArmPlane.setEnabled(value);
  }

  AddBackButton() {
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
