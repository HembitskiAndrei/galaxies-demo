import { PBRCustomMaterial } from "@babylonjs/materials";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Material } from "@babylonjs/core/Materials/material";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { MainScene } from "../../scenes/MainScene";
import { Texture } from "@babylonjs/core";
import { GalaxyMaterialConfig } from "../../types";

export class GalaxyMaterial extends PBRCustomMaterial {
  constructor(name: string, scene: MainScene, config: GalaxyMaterialConfig) {
    super(name, scene);
    this.backFaceCulling = false;
    this.alphaMode = Engine.ALPHA_ADD;
    this.transparencyMode = Material.MATERIAL_ALPHABLEND;
    this.useAlphaFromAlbedoTexture = true;
    this.roughness = 1;
    this.metallic = 1;
    this.emissiveColor = new Color3(1, 1, 1);
    this.AddUniform("time", "float", null);
    this.AddUniform("noise", "sampler2D", null);
    this.Vertex_Definitions(config.Vertex_Definitions);
    this.Vertex_Before_PositionUpdated(config.Vertex_Before_PositionUpdated);
    this.Fragment_Definitions(config.Fragment_Definitions);
    this.Fragment_Before_FragColor(config.Fragment_Before_FragColor);
  }

  setTexture(texture: Texture) {
    let time = 0;
    this.onBind = () => {
      time += this.getScene().getAnimationRatio();
      this.onBindObservable.add(() => {
        this.getEffect().setTexture("noise", texture);
        this.getEffect().setFloat("time", time);
      });
    };
  }
}
