import { PBRCustomMaterial } from "@babylonjs/materials";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Material } from "@babylonjs/core/Materials/material";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { MainScene } from "../../scenes/MainScene";
import { Texture } from "@babylonjs/core";

export class SpiralGalaxyMaterial extends PBRCustomMaterial {
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
        varying vec2 customUV;
        `);
    this.Vertex_Before_PositionUpdated(`
        customUV = uv;
        vec4 emissiveColor = texture2D( emissiveSampler, uv );
        vec4 noiseColor = texture2D( noise, uv + time * 0.000075 ) * 20.0;
        vNoiseColor = noiseColor;
        positionUpdated.y += noiseColor.r - emissiveColor.r * 0.75;
      `);
    this.Fragment_Definitions(`
        varying vec4 vNoiseColor;
        varying vec2 customUV;
        vec2 rotateUV(vec2 uv, float rotation)
        {
            float mid = 0.5;
            return vec2(
                cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
                cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
            );
        }
      `);
    this.Fragment_Before_FragColor(`
          float colorFactor = 0.25;
          vec4 rotateColor = texture2D( emissiveSampler, rotateUV(customUV, time * 0.001));
          vec4 rotateColor1 = texture2D( emissiveSampler, rotateUV(customUV * 0.95, time * 0.0005));
          finalColor.rgb += rotateColor.rgb * 0.75;
          finalColor.rgb -= rotateColor1.rgb * rotateColor1.rgb * 1.25;
          vec4 myEmissiveColor = texture2D( emissiveSampler, vEmissiveUV + uvOffset + vNoiseColor.rr * 0.25);
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
