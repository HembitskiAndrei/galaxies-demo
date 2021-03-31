import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { MainScene } from "../scenes/MainScene";
import { GalaxyMaterial } from "./materials/GalaxyMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { CONFIG_ELIPTICAL_GALAXY_MATERIAL } from "./materials/configsGalaxiesMaterial";

export class EllipticalGalaxy {
  name: string;
  private readonly materialsForGalaxy: GalaxyMaterial[];
  readonly coreTransformNode: TransformNode;
  private readonly scene: MainScene;

  constructor(name: string, scene: MainScene) {
    this.name = name;
    this.scene = scene;
    this.coreTransformNode = new TransformNode("coreTransformNode", this.scene);

    this.materialsForGalaxy = [];
    for(let i = 0; i < 3; i++) {
      this.materialsForGalaxy.push(new GalaxyMaterial(`EllipticalGalaxyMaterial-${i}`, this.scene, CONFIG_ELIPTICAL_GALAXY_MATERIAL));
    }

    const meshTaskGalaxy = this.scene.assetsManager.addContainerTask(
      "galaxyTask",
      "",
      "./assets/meshes/",
      "galaxy2.glb",
    );
    meshTaskGalaxy.onSuccess = task => {
      const deltaY = 3;

      for(let i = 1; i < task.loadedContainer.meshes.length; i++) {
        const galaxyMesh = <Mesh>task.loadedContainer.meshes[i];
        const originalMat = <PBRMaterial>galaxyMesh.material;
        const customMaterial =  this.materialsForGalaxy[i - 1];
        customMaterial.albedoTexture = originalMat.albedoTexture;
        customMaterial.emissiveTexture = originalMat.emissiveTexture;
        galaxyMesh.material = customMaterial;
        const instanceBranch = galaxyMesh.createInstance(`${i}`);
        instanceBranch.position.y += deltaY;
        instanceBranch.parent = this.coreTransformNode;
      }
    };
  }

  setNoiseTexture(texture: Texture) {
    this.materialsForGalaxy.forEach(material => {
      material.setTexture(texture);
    })
  }
}
