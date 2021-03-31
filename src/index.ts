import "@babylonjs/core/Loading/loadingScreen";
import { Engine } from "@babylonjs/core/Engines/engine";
// import { DracoCompression } from "@babylonjs/core/Meshes/Compression/dracoCompression";
import { CreateCanvas } from "./utils/CreateCanvas";
import { MainScene } from "./scenes/MainScene";

window.addEventListener("DOMContentLoaded", function () {
  if (Engine.isSupported()) {
    const canvas = CreateCanvas();
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }, true);

    const mainScene = new MainScene(engine, canvas);

    // DracoCompression.Configuration = {
    //   decoder: {
    //     wasmUrl:
    //       document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/")) +
    //       "/src/draco/draco_wasm_wrapper_gltf.js",
    //     wasmBinaryUrl:
    //       document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/")) +
    //       "/src/draco/draco_decoder_gltf.wasm",
    //     fallbackUrl:
    //       document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/")) +
    //       "/src/draco/draco_decoder_gltf.js",
    //   },
    // };

  } else {
    window.alert("Browser not supported");
  }
});
