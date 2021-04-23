import { AdvancedDynamicTexture, Rectangle } from "@babylonjs/gui";
import { AnimationGroup } from "@babylonjs/core/";
import { GalaxiesType, IButtonConfig, ILineConfig, ILinesContainerConfig } from "../../types";
declare class GUI {
    advancedTexture: AdvancedDynamicTexture;
    onPointerUpObservable: any;
    galaxiesButton: Rectangle[];
    activeButtonAnimation: AnimationGroup;
    barsAlphaAnimation: AnimationGroup[];
    inactiveButtonAnimation: AnimationGroup;
    bars: Rectangle[];
    constructor(name: string);
    AddLabel(text: string, galaxy: GalaxiesType, config: IButtonConfig): void;
    CreatContainerForLines(config: ILinesContainerConfig): Rectangle;
    CreateLines(config: ILineConfig, parent: Rectangle): Rectangle;
    SetActiveButton(index: number): void;
    SetInactiveButton(index: number): void;
    SetBarsAnimation(index: number): void;
}
export default GUI;
