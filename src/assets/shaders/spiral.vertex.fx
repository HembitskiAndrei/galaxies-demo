#ifdef GL_ES
precision highp float;
#endif

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec2 uv2;

// Uniforms
uniform mat4 world;
uniform mat4 worldViewProjection;

// Varying

varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUV = uv;
  vPosition = vec3(world * vec4(position, 1.0));
  vNormal = normalize(vec3(world * vec4(normal, 0.0)));
  gl_Position = worldViewProjection * vec4(position, 1.0);
}
