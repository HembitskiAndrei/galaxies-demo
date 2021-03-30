import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { MainScene } from "../scenes/MainScene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { IrregularGalaxyMaterial } from "./materials/IrregularGalaxyMaterial";

export class IrregularGalaxy {
  galaxyMesh: Mesh;
  readonly coreTransformNode: TransformNode;
  private readonly scene: MainScene;

  constructor(scene: MainScene) {
    this.scene = scene;
    this.coreTransformNode = new TransformNode("coreTransformNode", this.scene);
  }

  init() {
    const materialForGalaxy = new IrregularGalaxyMaterial("IrregularGalaxyMaterial", this.scene).init();

    const noiseTextureTask = this.scene.assetsManager.addTextureTask(
      "noiseTextureTask",
      "./assets/noise/perlinNoise.png",
      false,
      false,
    );
    noiseTextureTask.onSuccess = task => {
      materialForGalaxy.setTexture(task.texture);
    };

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
      // this.galaxyMesh = <Mesh>(
      //   task.loadedContainer.instantiateModelsToScene(name => `${name}-1`, false).rootNodes[0].getChildMeshes()[0]
      // );
      this.galaxyMesh.parent = this.coreTransformNode;

      const originalMat = <PBRMaterial>this.galaxyMesh.material;
      materialForGalaxy.albedoTexture = originalMat.albedoTexture;
      originalMat.albedoTexture.hasAlpha = true;
      materialForGalaxy.emissiveTexture = originalMat.emissiveTexture;
      this.galaxyMesh.material = materialForGalaxy;

      for (let i = 0; i < 2; i++) {
        const instanceBranch = this.galaxyMesh.createInstance(`${i}`);
        instanceBranch.position.y -= i * 10;
        instanceBranch.parent = this.coreTransformNode;
        instanceBranch.scaling = new Vector3(1.0, 1.0, 1.0).scale(1 + i * 0.2);
        instanceBranch.instancedBuffers.color = new Color4(1, 1, 1, 1 - i * 0.85);
      }
    };

    return this;
  }
}
