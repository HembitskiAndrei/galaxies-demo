import { Tools } from "@babylonjs/core";
import { GalaxiesSceneType } from "../types";

const CreateEnvironment = (scene: GalaxiesSceneType) => {
  const environmentTask = scene.assetsManager.addCubeTextureTask("environmentTask", "./assets/sky/environment.env");
  environmentTask.onSuccess = task => {
    const hdrRotation = -180;
    task.texture.rotationY = Tools.ToRadians(hdrRotation);
    scene.environmentTexture = task.texture;
    scene.createDefaultSkybox(task.texture, true, 10000);
  };
};

export default CreateEnvironment;
