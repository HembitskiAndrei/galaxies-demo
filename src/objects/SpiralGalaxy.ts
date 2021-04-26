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

    const meshesCount = 5;
    this.materialsForGalaxy = Array.from(
      { length: meshesCount },
      (item, index) => new SpiralMaterial(`spiralMaterial-${index}`, this.scene, "./assets/shaders/spiral"),
    );

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
      meshes.forEach((mesh, index) => {
        const galaxyMesh = meshes[index];
        galaxyMesh.position.y += deltaY;
        const originalMat = <PBRMaterial>galaxyMesh.material;
        const customMaterial = this.materialsForGalaxy[index];
        customMaterial.onBindObservable.add(() => {
          customMaterial.setTexture("textureAlpha", originalMat.albedoTexture);
          customMaterial.setTexture("textureSpiral", originalMat.emissiveTexture);
        });
        galaxyMesh.material = customMaterial;
        galaxyMesh.parent = this.coreTransformNode;
      });
      this.scene.gl.referenceMeshToUseItsOwnMaterial(meshes[4]);
      (meshes[4].material as SpiralMaterial).setFloat("alphaFactor", 0.8);
      (meshes[4].material as SpiralMaterial).setFloat("speedFactor", -4.0);
      (meshes[4].material as SpiralMaterial).options.defines = ["#define FRESNEL"];
    };
  }

  SetNoiseTexture(texture: Texture) {
    this.materialsForGalaxy.forEach(material => {
      material.setTexture("textureNoise", texture);
    });
  }
}

export default SpiralGalaxy;
