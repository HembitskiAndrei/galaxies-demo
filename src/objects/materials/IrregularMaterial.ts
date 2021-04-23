import { ShaderMaterial, Scene, Engine } from "@babylonjs/core";

class IrregularMaterial extends ShaderMaterial {
  constructor(name: string, scene: Scene, shaderPath: any) {
    super(name, scene, shaderPath, {
      needAlphaBlending: true,
      needAlphaTesting: true,
      attributes: ["position", "uv", "normal"],
      uniforms: ["time", "world", "view", "projection", "worldView", "worldViewProjection", "cameraPosition"],
      samplers: ["textureSpiral", "textureNoise", "textureAlpha"],
    });
    this.backFaceCulling = false;
    this.setFloat("time", 0);
    this.setFloat("alphaFactor", 0.4);
    this.setFloat("speedFactor", 1.0);
    this.alphaMode = Engine.ALPHA_ADD;
    let time = 0.0;
    this.onBindObservable.add(() => {
      time += this.getScene().getAnimationRatio();
      this.setFloat("time", time);
    });
  }
}

export default IrregularMaterial;
