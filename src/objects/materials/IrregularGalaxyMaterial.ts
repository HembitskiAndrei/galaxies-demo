import { PBRCustomMaterial } from "@babylonjs/materials";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Material } from "@babylonjs/core/Materials/material";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { MainScene } from "../../scenes/MainScene";
import { Texture } from "@babylonjs/core";

export class IrregularGalaxyMaterial extends PBRCustomMaterial {
  constructor(name: string, scene: MainScene) {
    super(name, scene);
  }

  init() {
    this.backFaceCulling = false;
    this.alphaMode = Engine.ALPHA_ADD;
    this.transparencyMode = Material.MATERIAL_ALPHABLEND;
    this.useAlphaFromAlbedoTexture = true;
    this.roughness = 1;
    this.metallic = 1;
    this.emissiveColor = new Color3(1, 1, 1);
    this.AddUniform("time", "float", null);
    this.AddUniform("noise", "sampler2D", null);
    this.Vertex_Definitions(`
        uniform sampler2D emissiveSampler;
        varying vec4 vNoiseColor;
        `);
    this.Vertex_Before_PositionUpdated(`
        vec4 emissiveColor = texture2D( emissiveSampler, uv );
        vec4 noiseColor = texture2D( noise, uv + time * 0.000075 ) * 20.0;
        vNoiseColor = noiseColor;
        positionUpdated.y += noiseColor.r - emissiveColor.r * 0.75;
      `);
    this.Fragment_Definitions(`
        varying vec4 vNoiseColor;
      `);
    this.Fragment_Before_FragColor(`
          float colorFactor = 0.15;
          vec4 myEmissiveColor = texture2D( emissiveSampler, vEmissiveUV + uvOffset + vNoiseColor.rr * 0.25);
          vec4 myEmissiveColor1 = texture2D( emissiveSampler, vEmissiveUV + uvOffset - myEmissiveColor.rg);
          finalColor += myEmissiveColor1 * finalColor.a * colorFactor;
          finalColor.rgb += myEmissiveColor.rgb * finalColor.a * colorFactor;
          finalColor.a += max(myEmissiveColor.r, max(myEmissiveColor.g, myEmissiveColor.b)) * finalColor.a * colorFactor;
      `);
    return this;
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
