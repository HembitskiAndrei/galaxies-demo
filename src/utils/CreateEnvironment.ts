import { Tools } from "@babylonjs/core/Misc/tools";
import { MainScene } from "../scenes/MainScene";

export const CreateEnvironment = (scene: MainScene) => {
  const environmentTask = scene.assetsManager.addCubeTextureTask("environmentTask", "./assets/sky/environment.env");
  environmentTask.onSuccess = task => {
    const hdrRotation = -30;
    task.texture.rotationY = Tools.ToRadians(hdrRotation);
    scene.environmentTexture = task.texture;
    scene.createDefaultSkybox(task.texture, true, 10000);
  };
};
