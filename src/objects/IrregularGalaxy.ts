import { TransformNode, Mesh, PBRMaterial, Texture } from "@babylonjs/core";
import { GalaxiesSceneType } from "../types";
import IrregularMaterial from "./materials/IrregularMaterial";

class IrregularGalaxy {
  name: string;
  galaxyMesh: Mesh;
  readonly coreTransformNode: TransformNode;
  private readonly scene: GalaxiesSceneType;
  private readonly materialsForGalaxy: IrregularMaterial[];

  constructor(name: string, scene: GalaxiesSceneType) {
    this.name = name;
    this.scene = scene;
    this.coreTransformNode = new TransformNode("coreTransformNode", this.scene);

    this.materialsForGalaxy = [];
    for (let i = 0; i < 3; i++) {
      this.materialsForGalaxy.push(new IrregularMaterial("spiralMaterial", this.scene, "./assets/shaders/irregular"));
    }

    const meshTaskGalaxy = this.scene.assetsManager.addContainerTask(
      "galaxyTask",
      "",
      "./assets/meshes/",
      "galaxy.glb",
    );
    meshTaskGalaxy.onSuccess = task => {
      const deltaY = 0;
      const meshes = task.loadedContainer
        .instantiateModelsToScene(name => `${name}-1`, false)
        .rootNodes[0].getChildMeshes();
      for (let i = 0; i < 3; i++) {
        const galaxyMesh = meshes[i];
        // galaxyMesh.setEnabled(false);
        galaxyMesh.position.y += deltaY;
        const originalMat = <PBRMaterial>galaxyMesh.material;
        const customMaterial = this.materialsForGalaxy[i];
        customMaterial.onBindObservable.add(() => {
          customMaterial.setFloat("alphaFactor", 1.0);
          // customMaterial.setFloat("speedFactor", 0.5);
          customMaterial.setTexture("textureAlpha", originalMat.albedoTexture);
          customMaterial.setTexture("textureSpiral", originalMat.emissiveTexture);
        });
        galaxyMesh.material = customMaterial;
        galaxyMesh.parent = this.coreTransformNode;
      }
    };
  }

  setNoiseTexture(texture: Texture) {
    this.materialsForGalaxy.forEach(material => {
      material.setTexture("textureNoise", texture);
    });
  }
}

export default IrregularGalaxy;
