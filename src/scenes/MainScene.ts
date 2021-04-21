import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene, SceneOptions } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from "@babylonjs/loaders/glTF";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import "@babylonjs/core/Helpers/sceneHelpers";
import { CreateEnvironment } from "../utils/CreateEnvironment";
import { IrregularGalaxy } from "../objects/IrregularGalaxy";
import { SpiralGalaxy } from "../objects/SpiralGalaxy";
import { EllipticalGalaxy } from "../objects/EllipticalGalaxy";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { CoreParticles } from "../objects/particles/coreParticles";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";
import { GUI } from "../objects/gui/GUI";
import { Galaxies } from "../types";

export class MainScene extends Scene {
  engine: Engine;
  canvas: HTMLCanvasElement;
  assetsManager: AssetsManager;
  camera: ArcRotateCamera;
  galaxiesArray: Galaxies[];
  gl: GlowLayer;

  constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
    super(engine, options);
    this.engine = engine;
    this.canvas = canvas;

    SceneLoader.OnPluginActivatedObservable.add(function (plugin) {
      if (plugin.name === "gltf" && plugin instanceof GLTFFileLoader) {
        plugin.animationStartMode = GLTFLoaderAnimationStartMode.NONE;
        plugin.compileMaterials = true;
        plugin.compileShadowGenerators = false;
      }
    });

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

    this.gl = new GlowLayer("glow", this);
    this.gl.intensity = 1.0;

    this.galaxiesArray = [];

    const gui = new GUI("gui");
    gui.AddBackButton();
    gui.SetVisibilityBackButton(false);
    gui.onPointerUpObservable.add((parentGalaxy: Galaxies) => {
      const invisibleGalaxies = this.galaxiesArray.filter(galaxy => galaxy.name !== parentGalaxy.name);
      invisibleGalaxies.forEach(galaxy => galaxy.coreTransformNode.setEnabled(false));

      if (parentGalaxy.name === "Spiral Galaxy") {
        // gui.SetSolarLabelsVisibility(true);
      }

      gui.SetVisibilityGalaxiesButton(false);

      this.camera.attachControl(this.canvas, false);
      this.camera.setTarget(parentGalaxy.coreTransformNode.position);
      this.camera.alpha = Math.PI / 2;
      this.camera.lowerRadiusLimit = 250;
      this.camera.upperRadiusLimit = 350;
    });

    gui.onBackObservable.add(() => {
      this.galaxiesArray.forEach(galaxy => galaxy.coreTransformNode.setEnabled(true));

      gui.SetSolarLabelsVisibility(false);

      gui.SetVisibilityGalaxiesButton(true);

      this.camera.detachControl(this.canvas);
      this.camera.restoreState();
      this.camera.lowerRadiusLimit = 800;
      this.camera.upperRadiusLimit = 950;
    });

    const coreSpiralGalaxyParticles = new CoreParticles(
      "coreSpiralGalaxyParticles",
      1,
      this,
      new Color4(0.7, 0.7, 0.7, 0.5),
    );
    coreSpiralGalaxyParticles.start();

    const coreEllipticalGalaxyParticles = new CoreParticles(
      "coreEllipticalGalaxyParticles",
      1,
      this,
      new Color4(0.5, 0.5, 0.5, 0.5),
    );
    coreEllipticalGalaxyParticles.start();

    const lensFlareTextureTask = this.assetsManager.addTextureTask(
      "lensFlareTextureTask",
      "./assets/textures/lensFlare.png",
      false,
      false,
    );
    lensFlareTextureTask.onSuccess = task => {
      coreSpiralGalaxyParticles.setTexture(task.texture);
      coreEllipticalGalaxyParticles.setTexture(task.texture);
    };

    const irregularGalaxy = new IrregularGalaxy("Irregular Galaxy", this);
    this.galaxiesArray.push(irregularGalaxy);
    irregularGalaxy.coreTransformNode.position.x += 300;
    gui.AddLabel(irregularGalaxy.name, irregularGalaxy);

    const spiralGalaxy = new SpiralGalaxy("Spiral Galaxy", this);
    this.galaxiesArray.push(spiralGalaxy);
    gui.AddLabel(spiralGalaxy.name, spiralGalaxy);
    coreSpiralGalaxyParticles.emitter = <AbstractMesh>spiralGalaxy.coreTransformNode;

    const ellipticalGalaxy = new EllipticalGalaxy("Elliptical Galaxy", this);
    this.galaxiesArray.push(ellipticalGalaxy);
    gui.AddLabel(ellipticalGalaxy.name, ellipticalGalaxy);
    ellipticalGalaxy.coreTransformNode.position.x -= 300;
    coreEllipticalGalaxyParticles.emitter = <AbstractMesh>ellipticalGalaxy.coreTransformNode;

    const noiseTextureTask = this.assetsManager.addTextureTask(
      "noiseTextureTask",
      "./assets/noise/perlinNoise.png",
      false,
      false,
    );
    noiseTextureTask.onSuccess = task => {
      irregularGalaxy.setNoiseTexture(task.texture);
      spiralGalaxy.SetNoiseTexture(task.texture);
      ellipticalGalaxy.setNoiseTexture(task.texture);
    };

    const rotateSpeedIrregularGalaxy = 0.000175;
    const rotateSpeedSpiralGalaxy = 0.00045;
    this.assetsManager.onFinish = () => {
      const configSolarLabels = {
        textSolarLabel: "Our solar system",
        textArmLabel: "Local Arm",
        planeSolarLabel: spiralGalaxy.planeSolarSystem,
        solarSystem: spiralGalaxy.solarSystem,
        planeTargetSolarSystem: spiralGalaxy.planeTargetSolarSystem,
        planeArmLabel: spiralGalaxy.planeLocalArm,
      };
      gui.AddSolarLabel(configSolarLabels);
      gui.SetSolarLabelsVisibility(false);
      this.registerBeforeRender(() => {
        irregularGalaxy.coreTransformNode.addRotation(0, -(rotateSpeedIrregularGalaxy * this.getAnimationRatio()), 0);
        spiralGalaxy.coreTransformNode.addRotation(0, rotateSpeedSpiralGalaxy * this.getAnimationRatio(), 0);
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
