import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { MainScene } from "../scenes/MainScene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { GalaxyMaterial } from "./materials/GalaxyMaterial";
import { CONFIG_IRREGULAR_GALAXY_MATERIAL } from "./materials/configsGalaxiesMaterial";

export class IrregularGalaxy {
  name: string;
  galaxyMesh: Mesh;
  readonly coreTransformNode: TransformNode;
  private readonly scene: MainScene;
  private readonly materialForGalaxy: GalaxyMaterial;

  constructor(name: string, scene: MainScene) {
    this.name = name;
    this.scene = scene;
    this.coreTransformNode = new TransformNode("coreTransformNode", this.scene);

    this.materialForGalaxy = new GalaxyMaterial("IrregularGalaxyMaterial", this.scene, CONFIG_IRREGULAR_GALAXY_MATERIAL);

    const meshTaskGalaxy = this.scene.assetsManager.addContainerTask(
      "galaxyTask",
      "",
      "./assets/meshes/",
      "galaxy.glb",
    );
    meshTaskGalaxy.onSuccess = task => {
      this.galaxyMesh = <Mesh>task.loadedContainer.meshes[1];
      this.galaxyMesh.registerInstancedBuffer("color", 4);
      this.galaxyMesh.instancedBuffers.color = new Color4(1, 1, 1, 1);
      this.galaxyMesh.hasVertexAlpha = true;
      this.galaxyMesh.parent = this.coreTransformNode;

      const originalMat = <PBRMaterial>this.galaxyMesh.material;
      this.materialForGalaxy.albedoTexture = originalMat.albedoTexture;
      originalMat.albedoTexture.hasAlpha = true;
      this.materialForGalaxy.emissiveTexture = originalMat.emissiveTexture;
      this.galaxyMesh.material = this.materialForGalaxy;

      for (let i = 0; i < 2; i++) {
        const instanceBranch = this.galaxyMesh.createInstance(`${i}`);
        instanceBranch.position.y -= i * 10;
        instanceBranch.parent = this.coreTransformNode;
        instanceBranch.scaling = new Vector3(1.0, 1.0, 1.0).scale(1 + i * 0.2);
        instanceBranch.instancedBuffers.color = new Color4(1, 1, 1, 1 - i * 0.85);
      }
    };
  }

  setNoiseTexture(texture: Texture) {
    this.materialForGalaxy.setTexture(texture);
  }
}
