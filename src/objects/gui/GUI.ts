import {
  TEXT_SHADOW_COLOR,
  DEFAULT_COLOR_BACKGROUND,
  HOVER_COLOR_BACKGROUND,
  TEXT_COLOR,
  PRESSED_COLOR_BORDER,
  DEFAULT_BORDER_COLOR,
} from "../../utils/constants";
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from "@babylonjs/gui";
import { Observable, AnimationGroup, Vector2 } from "@babylonjs/core/";
import { GalaxiesType, IButtonConfig, ILineConfig, ILinesContainerConfig } from "../../types";
import buttonAnimation from "../../utils/buttonAnimation";
import { barTransitionAnimation, barAlphaAnimation } from "../../utils/barTransitionAnimation";

class GUI {
  advancedTexture: AdvancedDynamicTexture;
  onPointerUpObservable: any;
  galaxiesButton: Rectangle[];
  activeButtonAnimation: AnimationGroup;
  barsAlphaAnimation: AnimationGroup[];
  inactiveButtonAnimation: AnimationGroup;
  bars: Rectangle[];

  constructor(name: string) {
    this.galaxiesButton = [];
    this.onPointerUpObservable = new Observable();
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(name);
    this.advancedTexture.idealWidth = 1024;
    this.barsAlphaAnimation = [];
    const container = this.CreatContainerForLines({
      width: 125,
      height: 0.6,
      horizontalAlignment: Control.HORIZONTAL_ALIGNMENT_RIGHT,
      verticalAlignment: Control.VERTICAL_ALIGNMENT_CENTER,
      left: -50,
      top: "0",
    });
    const numLines = 10;
    this.bars = Array.from({ length: numLines }, (item, index) => {
      return this.CreateLines(
        {
          width: 100,
          horizontalAlignment: Control.HORIZONTAL_ALIGNMENT_RIGHT,
          verticalAlignment: Control.VERTICAL_ALIGNMENT_TOP,
          left: -3,
          top: `${1 + 10.5 * index}%`,
        },
        container,
      );
    });
  }

  AddLabel(text: string, galaxy: GalaxiesType, config: IButtonConfig) {
    const rectBackground = new Rectangle();
    rectBackground.horizontalAlignment = config.horizontalAlignment;
    rectBackground.verticalAlignment = config.verticalAlignment;
    rectBackground.leftInPixels = config.left;
    rectBackground.topInPixels = config.top;
    this.galaxiesButton.push(rectBackground);
    rectBackground.widthInPixels = config.width;
    rectBackground.heightInPixels = 35;
    rectBackground.transformCenterX = 1.0;
    rectBackground.thickness = 0;
    rectBackground.background = DEFAULT_COLOR_BACKGROUND;
    rectBackground.hoverCursor = "pointer";
    rectBackground.isPointerBlocker = true;
    this.advancedTexture.addControl(rectBackground);

    const textLabel = new TextBlock();
    textLabel.leftInPixels = -10;
    textLabel.text = text;
    textLabel.color = TEXT_COLOR;
    textLabel.shadowColor = TEXT_SHADOW_COLOR;
    textLabel.shadowBlur = 15;
    textLabel.shadowOffsetX = 0;
    textLabel.shadowOffsetY = 0;
    textLabel.fontSizeInPixels = 26;
    textLabel.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
    textLabel.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
    rectBackground.addControl(textLabel);

    rectBackground.onPointerEnterObservable.add(() => {
      textLabel.color = HOVER_COLOR_BACKGROUND;
    });
    rectBackground.onPointerOutObservable.add(() => {
      textLabel.color = TEXT_COLOR;
    });
    rectBackground.onPointerDownObservable.add(() => {
      textLabel.color = PRESSED_COLOR_BORDER;
    });
    rectBackground.onPointerUpObservable.add(() => {
      textLabel.color = TEXT_COLOR;
      this.onPointerUpObservable.notifyObservers(galaxy);
    });
  }

  CreatContainerForLines(config: ILinesContainerConfig) {
    const rectContainer = new Rectangle();
    rectContainer.horizontalAlignment = config.horizontalAlignment;
    rectContainer.verticalAlignment = config.verticalAlignment;
    rectContainer.leftInPixels = config.left;
    rectContainer.top = config.top;
    rectContainer.widthInPixels = config.width;
    rectContainer.height = config.height;
    rectContainer.transformCenterX = 1.0;
    rectContainer.thickness = 0;
    rectContainer.background = DEFAULT_COLOR_BACKGROUND;
    this.advancedTexture.addControl(rectContainer);
    return rectContainer;
  }

  CreateLines(config: ILineConfig, parent: Rectangle) {
    const rectLine = new Rectangle();
    rectLine.horizontalAlignment = config.horizontalAlignment;
    rectLine.verticalAlignment = config.verticalAlignment;
    rectLine.cornerRadius = 10;
    rectLine.leftInPixels = config.left;
    rectLine.top = config.top;
    rectLine.widthInPixels = config.width;
    rectLine.heightInPixels = 10;
    rectLine.transformCenterX = 1.0;
    rectLine.color = DEFAULT_BORDER_COLOR;
    rectLine.thickness = 2;
    rectLine.background = DEFAULT_COLOR_BACKGROUND;
    parent.addControl(rectLine);
    return rectLine;
  }

  SetActiveButton(index: number) {
    this.activeButtonAnimation = buttonAnimation(this.galaxiesButton[index], new Vector2(1.0, 1.0), 1.0, 50);
    this.activeButtonAnimation.play(false);
  }

  SetInactiveButton(index: number) {
    this.SetBarsAnimation(index);
    this.inactiveButtonAnimation = buttonAnimation(this.galaxiesButton[index], new Vector2(0.7, 0.7), 0.25, 50);
    this.inactiveButtonAnimation.play(false);
  }

  SetBarsAnimation(index: number) {
    const delta = 0.1;
    const widthFactor = 100;
    const degree = 1.5;
    this.barsAlphaAnimation.forEach(animGroup => animGroup.dispose());
    this.bars.forEach((v, i) => {
      const animGroup = barTransitionAnimation(
        v,
        (index === 0 ? Math.pow(delta * (this.bars.length - i + 1), degree) : Math.pow(delta * (i + 2), degree)) *
          widthFactor,
        (index === 0 ? Math.pow(delta * (i + 2), degree) : Math.pow(delta * (this.bars.length - i + 1), degree)) *
          widthFactor,
        50,
      );
      animGroup.play(false);

      const deltaFrame = 4;
      const animGroupAlpha = barAlphaAnimation(
        v,
        0.25,
        0.5,
        index === 0 ? deltaFrame * (this.bars.length - i + 1) : deltaFrame * (i + 1),
        50,
      );
      animGroupAlpha.play(true);
      this.barsAlphaAnimation.push(animGroupAlpha);
    });
  }
}

export default GUI;
