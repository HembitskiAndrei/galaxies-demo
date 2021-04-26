import {
  Engine,
  Vector3,
  Color4,
  Scene,
  SceneOptions,
  AssetsManager,
  AbstractMesh,
  GlowLayer,
  SceneLoader,
  Mesh,
  Layer,
} from "@babylonjs/core";
import { MAIN_CAMERA_LAYER, GUI_CAMERA_LAYER } from "../utils/constants";
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from "@babylonjs/loaders/glTF";
import { Control } from "@babylonjs/gui";
import CreateEnvironment from "../utils/CreateEnvironment";
import GlitchPostprocess from "../objects/postprocesses/GlitchPostprocess";
import IrregularGalaxy from "../objects/IrregularGalaxy";
import SpiralGalaxy from "../objects/SpiralGalaxy";
import CoreParticles from "../objects/particles/coreParticles";
import GUI from "../objects/gui/GUI";
import { GalaxiesType, GlitchPostprocessType } from "../types";
import GalaxyCamera from "../objects/GalaxyCamera";

class MainScene extends Scene {
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

  constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
    super(engine, options);
    this.engine = engine;
    this.canvas = canvas;

    this.clearColor = new Color4();

    SceneLoader.OnPluginActivatedObservable.add(function (plugin) {
      if (plugin.name === "gltf" && plugin instanceof GLTFFileLoader) {
        plugin.animationStartMode = GLTFLoaderAnimationStartMode.NONE;
        plugin.compileMaterials = true;
        plugin.compileShadowGenerators = false;
      }
    });

    this.assetsManager = new AssetsManager(this);

    this.activeCameras = [];

    this.camera = new GalaxyCamera("camera", 0, 0, 10, new Vector3(0, 0, 0), this, this.canvas);
    this.camera.layerMask = MAIN_CAMERA_LAYER;
    this.activeCameras.push(this.camera);

    this.cameraGUI = new GalaxyCamera("cameraGUI", 0, 0, 10, new Vector3(0, 0, 0), this, this.canvas);
    this.cameraGUI.layerMask = GUI_CAMERA_LAYER;
    this.activeCameras.push(this.cameraGUI);

    CreateEnvironment(this);

    this.gl = new GlowLayer("glow", this);
    this.gl.intensity = 1.0;

    this.galaxiesArray = [];

    const gui = new GUI("gui");
    (gui.advancedTexture.layer as Layer).layerMask = GUI_CAMERA_LAYER;
    gui.onPointerUpObservable.add((parentGalaxy: GalaxiesType) => {
      if (this.activeGalaxy.name !== parentGalaxy.name) {
        const invisibleGalaxies = this.galaxiesArray.filter(galaxy => galaxy.name !== parentGalaxy.name);
        const activeIndex = this.galaxiesArray.indexOf(parentGalaxy);
        gui.SetActiveButton(activeIndex);
        gui.SetInactiveButton(Math.abs(activeIndex - 1));
        this.camera.onTurnOffObservable.addOnce(() => {
          invisibleGalaxies.forEach(galaxy => galaxy.coreTransformNode.setEnabled(false));
        });
        this.camera.onTurnOnObservable.addOnce(() => {
          parentGalaxy.coreTransformNode.setEnabled(true);
        });
        this.activeGalaxy = parentGalaxy;
        this.camera.SetTransitionAnimation(parentGalaxy);
        this.camera.attachPostProcess(this.glitchPostprocess);
        this.cameraGUI.SetTransitionAnimation(parentGalaxy);
        this.glitchPostprocess.glitchFactorAnimation.play(false);
      }
    });

    const coreSpiralGalaxyParticles = new CoreParticles(
      "coreSpiralGalaxyParticles",
      1,
      this,
      new Color4(0.7, 0.7, 0.7, 0.5),
    );
    coreSpiralGalaxyParticles.layerMask = MAIN_CAMERA_LAYER;
    coreSpiralGalaxyParticles.start();

    const lensFlareTextureTask = this.assetsManager.addTextureTask(
      "lensFlareTextureTask",
      "./assets/textures/lensFlare.png",
      false,
      false,
    );
    lensFlareTextureTask.onSuccess = task => {
      coreSpiralGalaxyParticles.setTexture(task.texture);
    };

    const irregularGalaxy = new IrregularGalaxy("Irregular Galaxy", this);
    this.galaxiesArray.push(irregularGalaxy);
    this.activeGalaxy = irregularGalaxy;
    gui.AddLabel(irregularGalaxy.name, irregularGalaxy, {
      width: 210,
      horizontalAlignment: Control.HORIZONTAL_ALIGNMENT_RIGHT,
      verticalAlignment: Control.VERTICAL_ALIGNMENT_TOP,
      left: -40,
      top: 40,
    });

    const spiralGalaxy = new SpiralGalaxy("Spiral Galaxy", this);
    this.galaxiesArray.push(spiralGalaxy);
    spiralGalaxy.coreTransformNode.position = new Vector3(0, -1000, 0);
    spiralGalaxy.coreTransformNode.setEnabled(false);
    gui.AddLabel(spiralGalaxy.name, spiralGalaxy, {
      width: 180,
      horizontalAlignment: Control.HORIZONTAL_ALIGNMENT_RIGHT,
      verticalAlignment: Control.VERTICAL_ALIGNMENT_BOTTOM,
      left: -40,
      top: -40,
    });
    coreSpiralGalaxyParticles.emitter = <AbstractMesh>spiralGalaxy.coreTransformNode;

    gui.SetActiveButton(0);
    gui.SetInactiveButton(1);

    const noiseTextureTask = this.assetsManager.addTextureTask(
      "noiseTextureTask",
      "./assets/noise/perlinNoise.png",
      false,
      false,
    );
    noiseTextureTask.onSuccess = task => {
      spiralGalaxy.SetNoiseTexture(task.texture);
    };

    const noiseTextureTask1 = this.assetsManager.addTextureTask(
      "noiseTextureTask",
      "./assets/noise/perlinNoise1.png",
      false,
      false,
    );
    noiseTextureTask1.onSuccess = task => {
      irregularGalaxy.setNoiseTexture(task.texture);
    };

    this.glitchPostprocess = new GlitchPostprocess(
      "glitchPostprocess",
      "./assets/shaders/glitch",
      ["time", "resolution", "glitchInterval", "glitchRate", "glitchFactor"],
      [],
      1.0,
      this.camera,
      this,
    );
    this.camera.detachPostProcess(this.glitchPostprocess);

    const rotateSpeedIrregularGalaxy = 0.00009;
    const rotateSpeedSpiralGalaxy = 0.00045;
    this.assetsManager.onFinish = () => {
      irregularGalaxy.coreTransformNode.getChildMeshes().forEach(v => (v.layerMask = MAIN_CAMERA_LAYER));
      spiralGalaxy.coreTransformNode.getChildMeshes().forEach(v => (v.layerMask = MAIN_CAMERA_LAYER));
      this.sky.layerMask = MAIN_CAMERA_LAYER;
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

export default MainScene;
