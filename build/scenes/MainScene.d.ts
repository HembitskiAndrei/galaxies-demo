import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import "@babylonjs/core/Helpers/sceneHelpers";
export declare class MainScene extends Scene {
    engine: Engine;
    canvas: HTMLCanvasElement;
    assetsManager: AssetsManager;
    camera: ArcRotateCamera;
    constructor(engine: Engine, options?: SceneOptions);
    init(canvas: HTMLCanvasElement): void;
}
