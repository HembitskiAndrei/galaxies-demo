import { Engine, Scene, SceneOptions, AssetsManager, GlowLayer } from "@babylonjs/core";
import { GalaxiesType } from "../types";
import GalaxyCamera from "../objects/GalaxyCamera";
declare class MainScene extends Scene {
    engine: Engine;
    canvas: HTMLCanvasElement;
    assetsManager: AssetsManager;
    camera: GalaxyCamera;
    activeGalaxy: GalaxiesType;
    galaxiesArray: GalaxiesType[];
    gl: GlowLayer;
    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions);
}
export default MainScene;
