import { AnimationGroup } from "@babylonjs/core";
import { GlitchPostprocessType } from "../types";
declare const glitchFactorAnimation: (object: GlitchPostprocessType, currentGlitchFactor: number, targetGlitchFactor: number, duration: number) => AnimationGroup;
export default glitchFactorAnimation;
