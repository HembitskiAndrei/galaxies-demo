import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from "@babylonjs/loaders/glTF/index";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import "@babylonjs/core/Helpers/sceneHelpers";
import { CreateEnvironment } from "../utils/CreateEnvironment";
import { IrregularGalaxy } from "../objects/IrregularGalaxy";
import { SpiralGalaxy } from "../objects/SpiralGalaxy";
import { ElipticalGalaxy } from "../objects/ElipticalGalaxy";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { CoreParticles } from "../objects/particles/coreParticles";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { GUI } from "../objects/gui/GUI";
import { Galaxies } from "../types";

export class MainScene extends Scene {
  engine: Engine;
  canvas: HTMLCanvasElement;
  assetsManager: AssetsManager;
  camera: ArcRotateCamera;
  galaxiesArray: Galaxies[];

  constructor(engine: Engine, options?: SceneOptions) {
    super(engine, options);
    this.engine = engine;
    this.galaxiesArray = [];
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
    this.camera.lowerRadiusLimit = 800;
    this.camera.upperRadiusLimit = 950;
    this.camera.upperBetaLimit = Math.PI / 3;
    this.camera.setTarget(new Vector3(0, 0, 0));
    this.camera.storeState();

    CreateEnvironment(this);

    const gui = new GUI("gui");
    gui.onPointerUpObservable.add((parentGalaxy: Galaxies) => {
      const invisibleGalaxies = this.galaxiesArray.filter(galaxy => galaxy.name !== parentGalaxy.name);
      invisibleGalaxies.forEach(galaxy => galaxy.coreTransformNode.setEnabled(false))

      gui.setVisibilityGalaxiesButton(false);

      this.camera.attachControl(this.canvas, false);
      this.camera.setTarget(parentGalaxy.coreTransformNode.position);
      this.camera.alpha = Math.PI / 2;
      this.camera.lowerRadiusLimit = 250;
      this.camera.upperRadiusLimit = 350;
    });

    gui.onBackObservable.add(() => {
      this.galaxiesArray.forEach(galaxy => galaxy.coreTransformNode.setEnabled(true))

      gui.setVisibilityGalaxiesButton(true);

      this.camera.detachControl(this.canvas);
      this.camera.restoreState();
      this.camera.lowerRadiusLimit = 800;
      this.camera.upperRadiusLimit = 950;
      this.camera.setTarget(new Vector3(0, 0, 0));
    });

    const coreSpiralGalaxyParticles = new CoreParticles("coreSpiralGalaxyParticles", 1, this).init(new Color4(0.9,0.9,0.9,0.9));
    coreSpiralGalaxyParticles.start();

    const coreElipticalGalaxyParticles = new CoreParticles("coreElipticalGalaxyParticles", 1, this).init(new Color4(0.5,0.5,0.5,0.5));
    coreElipticalGalaxyParticles.start();

    const lensFlareTextureTask = this.assetsManager.addTextureTask(
      "lensFlareTextureTask",
      "./assets/textures/lensFlare1.png",
      false,
      false,
    );
    lensFlareTextureTask.onSuccess = task => {
      coreSpiralGalaxyParticles.setTexture(task.texture);
      coreElipticalGalaxyParticles.setTexture(task.texture);
    };

    const irregularGalaxy = new IrregularGalaxy("Irregular Galaxy", this).init();
    this.galaxiesArray.push(irregularGalaxy);
    irregularGalaxy.coreTransformNode.position.x += 400;
    gui.addLabel(irregularGalaxy.name, irregularGalaxy)

    const spiralGalaxy = new SpiralGalaxy("Spiral Galaxy", this).init();
    this.galaxiesArray.push(spiralGalaxy);
    gui.addLabel(spiralGalaxy.name, spiralGalaxy)
    coreSpiralGalaxyParticles.emitter = <AbstractMesh>spiralGalaxy.coreTransformNode;

    const elipticalGalaxy = new ElipticalGalaxy("Spherical Galaxy", this).init();
    this.galaxiesArray.push(elipticalGalaxy);
    gui.addLabel(elipticalGalaxy.name, elipticalGalaxy)
    elipticalGalaxy.coreTransformNode.position.x -= 400;
    coreElipticalGalaxyParticles.emitter = <AbstractMesh>elipticalGalaxy.coreTransformNode;

    const noiseTextureTask = this.assetsManager.addTextureTask(
      "noiseTextureTask",
      "./assets/noise/perlinNoise.png",
      false,
      false,
    );
    noiseTextureTask.onSuccess = task => {
      irregularGalaxy.setNoiseTexture(task.texture);
      spiralGalaxy.setNoiseTexture(task.texture);
      elipticalGalaxy.setNoiseTexture(task.texture);
    };

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

    return this;
  }
}
