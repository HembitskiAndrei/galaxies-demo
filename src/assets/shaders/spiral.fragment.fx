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

  vec4 noiseColor = texture2D( textureNoise, rotateUV(uv, -t * 0.0005));
  vec4 rotateColor = texture2D( textureSpiral, rotateUV(uv, -t * 0.0005) + noiseColor.rg) * noiseColor.r;
  vec4 rotateColor1 = texture2D( textureSpiral, rotateUV(uv, -t * 0.00075) + noiseColor.rg) * noiseColor.r;
  vec4 rotateColor2 = texture2D( textureSpiral, rotateUV(uv, -t * 0.001) - noiseColor.rg) * rotateColor1.r;

  vec4 totalColor = texture2D( textureSpiral, uv - rotateColor1.rg * 0.001 );
  vec4 maskColor = texture2D( textureSpiral, uv * 0.85 - noiseColor.rg + cos(sin(t * 0.001) * 0.5) );
  vec4 alphaColor = texture2D( textureAlpha, rotateUV(uv, -t * 0.00075) - noiseColor.rg );
  maskColor *= totalColor;
  totalColor += maskColor;
  rotateColor *= totalColor;
  totalColor -= rotateColor;
  totalColor *= (1.0-alphaColor) + 0.7;

  float fresnelTerm = 1.0;
  #ifdef FRESNEL
    vec3 viewDirectionW = normalize(vec3(cameraPosition.x, vPosition.y, cameraPosition.z) - vPosition);
    fresnelTerm = dot(viewDirectionW, vNormal);
    vec3 normalizedCameraPosition = normalize(cameraPosition);
    fresnelTerm = mix(1.0, clamp(pow(fresnelTerm, 2.0), 0., 1.), length(vec2(normalizedCameraPosition.xz)));
    totalColor *= totalColor;
    totalColor *= 4.0;
    totalColor *= (1.0-alphaColor) + 0.8;
  #endif

  gl_FragColor = vec4(totalColor.rgb, max(totalColor.r, max(totalColor.g, totalColor.b)) * alphaFactor) * fresnelTerm;
//  gl_FragColor = alphaColor;
}
