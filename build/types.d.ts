import type IrregularGalaxy from "./objects/IrregularGalaxy";
import type SpiralGalaxy from "./objects/SpiralGalaxy";
import type GalaxyCamera from "./objects/GalaxyCamera";
import type MainScene from "./scenes/MainScene";
export declare type GalaxiesSceneType = MainScene;
export declare type GalaxiesType = SpiralGalaxy | IrregularGalaxy;
export declare type GalaxyCameraType = GalaxyCamera;
export interface IButtonConfig {
    width: number;
    horizontalAlignment: number;
    verticalAlignment: number;
    left: number;
    top: number;
}
export interface ILinesContainerConfig {
    width: number;
    height: number;
    horizontalAlignment: number;
    verticalAlignment: number;
    left: number;
    top: number;
}
export interface ILineConfig {
    width: number;
    horizontalAlignment: number;
    verticalAlignment: number;
    left: number;
    top: string;
}