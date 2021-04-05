import { IrregularGalaxy } from "./objects/IrregularGalaxy";
import { SpiralGalaxy } from "./objects/SpiralGalaxy";
import { EllipticalGalaxy } from "./objects/EllipticalGalaxy";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import {TransformNode} from "@babylonjs/core/Meshes/transformNode";
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh";

export type Galaxies = EllipticalGalaxy | SpiralGalaxy | IrregularGalaxy;
export interface IGalaxyMaterialConfig {
  Vertex_Definitions: string
  Vertex_Before_PositionUpdated: string;
  Fragment_Definitions: string;
  Fragment_Before_FragColor: string;
}

export interface ISolarLabelsConfig {
  textSolarLabel: string;
  textArmLabel: string;
  planeSolarLabel: Mesh;
  solarSystem: TransformNode,
  planeTargetSolarSystem: Mesh,
  planeArmLabel: AbstractMesh
}
