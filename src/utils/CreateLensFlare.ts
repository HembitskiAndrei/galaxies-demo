import "@babylonjs/core/LensFlares/lensFlareSystemSceneComponent";
import { LensFlareSystem } from "@babylonjs/core/LensFlares/lensFlareSystem";
import { LensFlare } from "@babylonjs/core/LensFlares/lensFlare";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { TransformNode } from "@babylonjs/core";
import { MainScene } from "../scenes/MainScene";

export const CreateLensFlare = (scene: MainScene, node: TransformNode) => {
  const lensFlareSystem = new LensFlareSystem("lensFlareSystem", node, scene);
  const flare00 = new LensFlare(0.2, 0.2, new Color3(1, 1, 1), "./assets/textures/lensFlare.png", lensFlareSystem);
  const flare01 = new LensFlare(
    1.0,
    1.0,
    new Color3(0.9, 0.9, 0.9),
    "./assets/textures/lensFlare1.png",
    lensFlareSystem,
  );
};
