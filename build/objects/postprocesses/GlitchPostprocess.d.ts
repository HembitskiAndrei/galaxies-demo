import { AnimationGroup, PostProcess, PostProcessOptions, Camera } from "@babylonjs/core";
import { GalaxiesSceneType } from "../../types";
declare class GlitchPostprocess extends PostProcess {
    glitchFactor: number;
    glitchFactorAnimation: AnimationGroup;
    constructor(name: string, fragmentUrl: string, parameters: string[], samplers: string[], options: number | PostProcessOptions, camera: Camera, scene: GalaxiesSceneType);
}
export default GlitchPostprocess;
