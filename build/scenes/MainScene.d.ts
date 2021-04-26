import { Engine, Scene, SceneOptions, AssetsManager, GlowLayer, Mesh } from "@babylonjs/core";
import { GalaxiesType, GlitchPostprocessType } from "../types";
import GalaxyCamera from "../objects/GalaxyCamera";
declare class MainScene extends Scene {
    engine: Engine;
    canvas: HTMLCanvasElement;
    assetsManager: AssetsManager;
    camera: GalaxyCamera;
    sky: Mesh;
    cameraGUI: GalaxyCamera;
    activeGalaxy: GalaxiesType;
    galaxiesArray: GalaxiesType[];
    gl: GlowLayer;
    glitchPostprocess: GlitchPostprocessType;
    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions);
}
export default MainScene;
