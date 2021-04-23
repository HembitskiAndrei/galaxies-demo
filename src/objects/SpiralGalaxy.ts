import { TransformNode, PBRMaterial, Texture } from "@babylonjs/core";
import { GalaxiesSceneType } from "../types";
import SpiralMaterial from "./materials/SpiralMaterial";

class SpiralGalaxy {
  name: string;
  readonly coreTransformNode: TransformNode;
  private readonly scene: GalaxiesSceneType;
  private readonly materialsForGalaxy: SpiralMaterial[];

  constructor(name: string, scene: GalaxiesSceneType) {
    this.name = name;
    this.scene = scene;
    this.coreTransformNode = new TransformNode("coreTransformNode", this.scene);
    this.coreTransformNode.addRotation(0, -Math.PI / 4, 0);

    this.materialsForGalaxy = [];
    for (let i = 0; i < 5; i++) {
      this.materialsForGalaxy.push(new SpiralMaterial("spiralMaterial", this.scene, "./assets/shaders/spiral"));
    }

    const meshTaskGalaxy = this.scene.assetsManager.addContainerTask(
      "galaxyTask",
      "",
      "./assets/meshes/",
      "galaxy1.glb",
    );
    meshTaskGalaxy.onSuccess = task => {
      const deltaY = 0;
      const meshes = task.loadedContainer
        .instantiateModelsToScene(name => `${name}-1`, false)
        .rootNodes[0].getChildMeshes();
      for (let i = 0; i < 5; i++) {
        const galaxyMesh = meshes[i];
        // galaxyMesh.setEnabled(false);
        galaxyMesh.position.y += deltaY;
        const originalMat = <PBRMaterial>galaxyMesh.material;
        const customMaterial = this.materialsForGalaxy[i];
        customMaterial.onBindObservable.add(() => {
          customMaterial.setTexture("textureAlpha", originalMat.albedoTexture);
          customMaterial.setTexture("textureSpiral", originalMat.emissiveTexture);
        });
        galaxyMesh.material = customMaterial;
        galaxyMesh.parent = this.coreTransformNode;
      }
      this.scene.gl.referenceMeshToUseItsOwnMaterial(meshes[4]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      meshes[4].material.setFloat("alphaFactor", 0.8);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      meshes[4].material.setFloat("speedFactor", -4.0);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      meshes[4].material.options.defines = ["#define FRESNEL"];
    };
  }

  SetNoiseTexture(texture: Texture) {
    this.materialsForGalaxy.forEach(material => {
      material.setTexture("textureNoise", texture);
    });
  }
}

export default SpiralGalaxy;
