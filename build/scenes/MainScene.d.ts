import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import "@babylonjs/core/Helpers/sceneHelpers";
import { Galaxies } from "../types";
export declare class MainScene extends Scene {
    engine: Engine;
    canvas: HTMLCanvasElement;
    assetsManager: AssetsManager;
    camera: ArcRotateCamera;
    galaxiesArray: Galaxies[];
    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions);
}
