import { IrregularGalaxy } from "./objects/IrregularGalaxy";
import { SpiralGalaxy } from "./objects/SpiralGalaxy";
import { EllipticalGalaxy } from "./objects/EllipticalGalaxy";

export type Galaxies = EllipticalGalaxy | SpiralGalaxy | IrregularGalaxy;
export interface GalaxyMaterialConfig {
  Vertex_Definitions: string
  Vertex_Before_PositionUpdated: string;
  Fragment_Definitions: string;
  Fragment_Before_FragColor: string;
}
