import type IrregularGalaxy from "./objects/IrregularGalaxy";
import type SpiralGalaxy from "./objects/SpiralGalaxy";
import type GalaxyCamera from "./objects/GalaxyCamera";
import type MainScene from "./scenes/MainScene";
import type GlitchPostprocess from "./objects/postprocesses/GlitchPostprocess";

export type GlitchPostprocessType = GlitchPostprocess;

export type GalaxiesSceneType = MainScene;

export type GalaxiesType = SpiralGalaxy | IrregularGalaxy;

export type GalaxyCameraType = GalaxyCamera;

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
