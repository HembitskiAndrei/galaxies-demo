#ifdef GL_ES
precision highp float;
precision highp int;
#endif

varying vec2 vUV;

uniform float time;
uniform float alphaFactor;
uniform float speedFactor;
uniform sampler2D textureSpiral;
uniform sampler2D textureAlpha;
uniform sampler2D textureNoise;

uniform vec3 cameraPosition;

varying vec3 vPosition;
varying vec3 vNormal;

vec2 rotateUV(vec2 uv, float rotation)
{
  float mid = 0.5;
  return vec2(
    cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
    cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
  );
}

void main() {
  vec2 uv = vUV;
  float t = time * speedFactor;

  vec4 noiseColor = texture2D( textureNoise, vec2(uv.x - sin(t * 0.005) * 0.01, uv.y + cos(t * 0.0045) * 0.01) * 0.5 ) + 0.5;
  vec4 rotateColor = texture2D( textureSpiral, rotateUV(uv + noiseColor.rg, t * 0.0005) + noiseColor.rg) + 0.25;
  vec4 rotateColor1 = texture2D( textureSpiral, rotateUV(uv + rotateColor.rg * 0.5, t * 0.00025) + noiseColor.rg);

  vec4 totalColor = texture2D( textureSpiral, uv + rotateColor1.rg * 0.01 );
  vec4 maskColor = texture2D( textureSpiral, uv * 0.85 - noiseColor.rg + cos(sin(t * 0.001) * 0.5) );
  vec4 alphaColor = texture2D( textureAlpha, rotateUV(uv, -t * 0.00075) - noiseColor.rg );
  maskColor *= totalColor;
  totalColor += maskColor;
  rotateColor1 *= totalColor;
  totalColor += rotateColor1 * 0.05;
  totalColor *= (1.0-alphaColor) + 0.7;
  totalColor += (1.0-alphaColor) * 0.1;

  gl_FragColor = vec4(totalColor.rgb, max(totalColor.r, max(totalColor.g, totalColor.b)) * alphaFactor);
}
