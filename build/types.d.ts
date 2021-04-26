import type IrregularGalaxy from "./objects/IrregularGalaxy";
import type SpiralGalaxy from "./objects/SpiralGalaxy";
import type GalaxyCamera from "./objects/GalaxyCamera";
import type MainScene from "./scenes/MainScene";
import type GlitchPostprocess from "./objects/postprocesses/GlitchPostprocess";
export declare type GlitchPostprocessType = GlitchPostprocess;
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
  top: string;
}
export interface ILineConfig {
  width: number;
  horizontalAlignment: number;
  verticalAlignment: number;
  left: number;
  top: string;
}
