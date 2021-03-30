import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { MainScene } from "../scenes/MainScene";
import { SpiralGalaxyMaterial } from "./materials/SpiralGalaxyMaterial";
import {Texture} from "@babylonjs/core";

export class SpiralGalaxy {
  name: string;
  galaxyMesh1: Mesh;
  galaxyMesh2: Mesh;
  galaxyMesh3: Mesh;
  galaxyMesh4: Mesh;
  readonly coreTransformNode: TransformNode;
  private readonly scene: MainScene;
  private materialForGalaxy1: SpiralGalaxyMaterial;
  private materialForGalaxy2: SpiralGalaxyMaterial;
  private materialForGalaxy3: SpiralGalaxyMaterial;
  private materialForGalaxy4: SpiralGalaxyMaterial;

  constructor(name: string, scene: MainScene) {
    this.name = name;
    this.scene = scene;
    this.coreTransformNode = new TransformNode("coreTransformNode", this.scene);
  }

  init() {
    this.materialForGalaxy1 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();
    this.materialForGalaxy2 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();
    this.materialForGalaxy3 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();
    this.materialForGalaxy4 = new SpiralGalaxyMaterial("SpiralGalaxyMaterial", this.scene).init();

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
      this.materialForGalaxy1.albedoTexture = originalMat1.albedoTexture;
      originalMat1.albedoTexture.hasAlpha = true;
      this.materialForGalaxy1.emissiveTexture = originalMat1.emissiveTexture;
      this.galaxyMesh1.material = this.materialForGalaxy1;
      const instanceBranch1 = this.galaxyMesh1.createInstance("1");
      instanceBranch1.position.y += deltaY;
      instanceBranch1.parent = this.coreTransformNode;

      this.galaxyMesh2 = <Mesh>task.loadedContainer.meshes[2];
      const originalMat2 = <PBRMaterial>this.galaxyMesh2.material;
      this.materialForGalaxy2.albedoTexture = originalMat2.albedoTexture;
      originalMat2.albedoTexture.hasAlpha = true;
      this.materialForGalaxy2.emissiveTexture = originalMat2.emissiveTexture;
      this.galaxyMesh2.material = this.materialForGalaxy2;
      const instanceBranch2 = this.galaxyMesh2.createInstance("2");
      instanceBranch2.position.y += deltaY;
      instanceBranch2.parent = this.coreTransformNode;

      this.galaxyMesh3 = <Mesh>task.loadedContainer.meshes[1];
      const originalMat3 = <PBRMaterial>this.galaxyMesh3.material;
      this.materialForGalaxy3.albedoTexture = originalMat3.albedoTexture;
      originalMat3.albedoTexture.hasAlpha = true;
      this.materialForGalaxy3.emissiveTexture = originalMat3.emissiveTexture;
      this.galaxyMesh3.material = this.materialForGalaxy3;
      const instanceBranch3 = this.galaxyMesh3.createInstance("3");
      instanceBranch3.position.y += deltaY;
      instanceBranch3.parent = this.coreTransformNode;

      this.galaxyMesh4 = <Mesh>task.loadedContainer.meshes[3];
      const originalMat4 = <PBRMaterial>this.galaxyMesh4.material;
      this.materialForGalaxy4.albedoTexture = originalMat4.albedoTexture;
      originalMat4.albedoTexture.hasAlpha = true;
      this.materialForGalaxy4.emissiveTexture = originalMat4.emissiveTexture;
      this.galaxyMesh4.material = this.materialForGalaxy4;
      const instanceBranch4 = this.galaxyMesh4.createInstance("4");
      instanceBranch4.position.y += deltaY;
      instanceBranch4.parent = this.coreTransformNode;
    };

    return this;
  }

  setNoiseTexture(texture: Texture) {
    this.materialForGalaxy1.setTexture(texture);
    this.materialForGalaxy2.setTexture(texture);
    this.materialForGalaxy3.setTexture(texture);
    this.materialForGalaxy4.setTexture(texture);
  }
}
