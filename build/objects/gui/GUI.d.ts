import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { Galaxies } from "../../types";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { AbstractMesh, TransformNode } from "@babylonjs/core";
export declare class GUI {
    advancedTexture: AdvancedDynamicTexture;
    onPointerUpObservable: any;
    onBackObservable: any;
    galaxiesButton: Rectangle[];
    backButton: Rectangle;
    constructor(name: string);
    setVisibilityGalaxiesButton(value: boolean): void;
    setVisibilityBackButton(value: boolean): void;
    addLabel(text: string, galaxy: Galaxies): void;
    addArmLabel(text: string, node: TransformNode, labelLocalArm: AbstractMesh): void;
    addSolarLabel(text: string, sun: Mesh, node: TransformNode, targetPlane: Mesh): void;
    addBackButton(): void;
}
