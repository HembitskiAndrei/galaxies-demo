import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { MultiLine } from "@babylonjs/gui/2D/controls/multiLine";
import { Galaxies } from "../../types";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { ISolarLabelsConfig } from "../../types";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
export declare class GUI {
    advancedTexture: AdvancedDynamicTexture;
    onPointerUpObservable: any;
    onBackObservable: any;
    galaxiesButton: Rectangle[];
    backButton: Rectangle;
    lineToLabel: MultiLine;
    solarSystemNode: TransformNode;
    localArmPlane: AbstractMesh;
    constructor(name: string);
    SetVisibilityGalaxiesButton(value: boolean): void;
    SetVisibilityBackButton(value: boolean): void;
    AddLabel(text: string, galaxy: Galaxies): void;
    AddSolarLabel(config: ISolarLabelsConfig): void;
    SetSolarLabelsVisibility(value: boolean): void;
    AddBackButton(): void;
}
