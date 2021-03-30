import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { MainScene } from "../scenes/MainScene";
import { SpiralGalaxyMaterial } from "./materials/SpiralGalaxyMaterial";

export class SpiralGalaxy {
  galaxyMesh1: Mesh;
  galaxyMesh2: Mesh;
  galaxyMesh3: Mesh;
  galaxyMesh4: Mesh;
  readonly coreTransformNode: TransformNode;
  private readonly scene: MainScene;

  constructor(scene: MainScene) {
    this.scene = scene;
    this.coreTransformNode = new TransformNode("coreTransformNode", this.scene);
  }

  init() {
    const materialForGalaxy1 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();
    const materialForGalaxy2 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();
    const materialForGalaxy3 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();
    const materialForGalaxy4 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();

    const noiseTextureTask = this.scene.assetsManager.addTextureTask(
      "noiseTextureTask",
      "./assets/noise/perlinNoise.png",
      false,
      false,
    );
    noiseTextureTask.onSuccess = task => {
      materialForGalaxy1.setTexture(task.texture);
      materialForGalaxy2.setTexture(task.texture);
      materialForGalaxy3.setTexture(task.texture);
      materialForGalaxy4.setTexture(task.texture);
    };

    const meshTaskGalaxy = this.scene.assetsManager.addContainerTask(
      "galaxyTask",
      "",
      "./assets/meshes/",
      "galaxy1.glb",
    );
    meshTaskGalaxy.onSuccess = task => {
      const deltaY = 0;

      this.galaxyMesh1 = <Mesh>task.loadedContainer.meshes[4];
      const originalMat1 = <PBRMaterial>this.galaxyMesh1.material;
      materialForGalaxy1.albedoTexture = originalMat1.albedoTexture;
      originalMat1.albedoTexture.hasAlpha = true;
      materialForGalaxy1.emissiveTexture = originalMat1.emissiveTexture;
      this.galaxyMesh1.material = materialForGalaxy1;
      const instanceBranch1 = this.galaxyMesh1.createInstance("1");
      instanceBranch1.position.y += deltaY;
      instanceBranch1.parent = this.coreTransformNode;

      this.galaxyMesh2 = <Mesh>task.loadedContainer.meshes[2];
      const originalMat2 = <PBRMaterial>this.galaxyMesh2.material;
      materialForGalaxy2.albedoTexture = originalMat2.albedoTexture;
      originalMat2.albedoTexture.hasAlpha = true;
      materialForGalaxy2.emissiveTexture = originalMat2.emissiveTexture;
      this.galaxyMesh2.material = materialForGalaxy2;
      const instanceBranch2 = this.galaxyMesh2.createInstance("2");
      instanceBranch2.position.y += deltaY;
      instanceBranch2.parent = this.coreTransformNode;

      this.galaxyMesh3 = <Mesh>task.loadedContainer.meshes[1];
      const originalMat3 = <PBRMaterial>this.galaxyMesh3.material;
      materialForGalaxy3.albedoTexture = originalMat3.albedoTexture;
      originalMat3.albedoTexture.hasAlpha = true;
      materialForGalaxy3.emissiveTexture = originalMat3.emissiveTexture;
      this.galaxyMesh3.material = materialForGalaxy3;
      const instanceBranch3 = this.galaxyMesh3.createInstance("3");
      instanceBranch3.position.y += deltaY;
      instanceBranch3.parent = this.coreTransformNode;

      this.galaxyMesh4 = <Mesh>task.loadedContainer.meshes[3];
      const originalMat4 = <PBRMaterial>this.galaxyMesh4.material;
      materialForGalaxy4.albedoTexture = originalMat4.albedoTexture;
      originalMat4.albedoTexture.hasAlpha = true;
      materialForGalaxy4.emissiveTexture = originalMat4.emissiveTexture;
      this.galaxyMesh4.material = materialForGalaxy4;
      const instanceBranch4 = this.galaxyMesh4.createInstance("4");
      instanceBranch4.position.y += deltaY;
      instanceBranch4.parent = this.coreTransformNode;
    };

    return this;
  }
}
