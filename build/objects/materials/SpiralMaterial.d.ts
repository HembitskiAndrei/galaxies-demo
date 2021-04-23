import { ShaderMaterial, Scene } from "@babylonjs/core";
declare class SpiralMaterial extends ShaderMaterial {
    constructor(name: string, scene: Scene, shaderPath: any, FRESNEL?: boolean);
}
export default SpiralMaterial;
