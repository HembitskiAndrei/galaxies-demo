import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from "@babylonjs/loaders/glTF/index";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import "@babylonjs/core/Helpers/sceneHelpers";
import { CreateEnvironment } from "../utils/CreateEnvironment";
import { CreateLensFlare } from "../utils/CreateLensFlare";
import { IrregularGalaxy } from "../objects/IrregularGalaxy";
import { SpiralGalaxy } from "../objects/SpiralGalaxy";


export class MainScene extends Scene {
  engine: Engine;
  canvas: HTMLCanvasElement;
  assetsManager: AssetsManager;
  camera: ArcRotateCamera;

  constructor(engine: Engine, options?: SceneOptions) {
    super(engine, options);
    this.engine = engine;
    SceneLoader.OnPluginActivatedObservable.add(function (plugin) {
      if (plugin.name === "gltf" && plugin instanceof GLTFFileLoader) {
        plugin.animationStartMode = GLTFLoaderAnimationStartMode.NONE;
        plugin.compileMaterials = true;
        plugin.compileShadowGenerators = false;
      }
    });
  }

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.assetsManager = new AssetsManager(this);

    this.camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 100, 200), this);
    this.camera.minZ = 0.0;
    this.camera.maxZ = 32000;
    this.camera.lowerRadiusLimit = 250;
    this.camera.upperRadiusLimit = 500;
    this.camera.upperBetaLimit = Math.PI / 3;
    this.camera.setTarget(new Vector3(0, 0, 0));
    this.camera.storeState();
    this.camera.attachControl(this.canvas, false);

    CreateEnvironment(this);

    const irregularGalaxy = new IrregularGalaxy(this).init();
    irregularGalaxy.coreTransformNode.position.x += 500;

    const spiralGalaxy = new SpiralGalaxy(this).init();

    CreateLensFlare(this, spiralGalaxy.coreTransformNode);

    this.assetsManager.onFinish = () => {
      this.registerBeforeRender(() => {
        irregularGalaxy.coreTransformNode.addRotation(0, -(0.000175 * this.getAnimationRatio()), 0);
        spiralGalaxy.coreTransformNode.addRotation(0, 0.00045 * this.getAnimationRatio(), 0);
      });
    };

    window.addEventListener("resize", () => {
      this.engine.resize();
    });

    this.engine.runRenderLoop(() => {
      this.render();
    });

    this.assetsManager.load();
  }
}
