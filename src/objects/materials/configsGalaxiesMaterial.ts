export const CONFIG_ELIPTICAL_GALAXY_MATERIAL = {
  Vertex_Definitions: `
        uniform sampler2D emissiveSampler;
        varying vec4 vNoiseColor;
        varying vec2 customUV;
        `,
  Vertex_Before_PositionUpdated: `
        customUV = uv;
        vec4 emissiveColor = texture2D( emissiveSampler, uv );
        vec4 noiseColor = texture2D( noise, uv + time * 0.000075 ) * 20.0;
        vNoiseColor = noiseColor;
      `,
  Fragment_Definitions: `
        varying vec4 vNoiseColor;
        varying vec2 customUV;
        vec2 rotateUV(vec2 uv, float rotation)
        {
            float mid = 0.5;
            return vec2(
                cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
                cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
            );
        }
      `,
  Fragment_Before_FragColor: `
          float colorFactor = 0.15;
          vec4 rotateColor = texture2D( emissiveSampler, rotateUV(customUV, time * 0.00025));
          vec4 rotateColor1 = texture2D( emissiveSampler, rotateUV(customUV * 0.95, time * 0.0000125));
          finalColor.rgb += rotateColor.rgb * 1.75;
          finalColor.rgb -= rotateColor1.rgb * rotateColor1.rgb * 1.25;
          vec4 myEmissiveColor = texture2D( emissiveSampler, vEmissiveUV + uvOffset + vNoiseColor.rr * 0.1);
          finalColor.rgb += myEmissiveColor.rgb * finalColor.a * colorFactor;
          finalColor.a += max(myEmissiveColor.r, max(myEmissiveColor.g, myEmissiveColor.b)) * finalColor.a * colorFactor;
          finalColor.rgb *= vec3(0.5, 0.45, 0.3);
      `,
};

export const CONFIG_IRREGULAR_GALAXY_MATERIAL = {
  Vertex_Definitions: `
        uniform sampler2D emissiveSampler;
        varying vec4 vNoiseColor;
        `,
  Vertex_Before_PositionUpdated: `
        vec4 emissiveColor = texture2D( emissiveSampler, uv );
        vec4 noiseColor = texture2D( noise, uv + time * 0.000075 ) * 20.0;
        vNoiseColor = noiseColor;
        positionUpdated.y += noiseColor.r - emissiveColor.r * 0.75;
      `,
  Fragment_Definitions: `
        varying vec4 vNoiseColor;
      `,
  Fragment_Before_FragColor: `
          float colorFactor = 0.15;
          vec4 myEmissiveColor = texture2D( emissiveSampler, vEmissiveUV + uvOffset + vNoiseColor.rr * 0.25);
          vec4 myEmissiveColor1 = texture2D( emissiveSampler, vEmissiveUV + uvOffset - myEmissiveColor.rg);
          finalColor += myEmissiveColor1 * finalColor.a * colorFactor;
          finalColor.rgb += myEmissiveColor.rgb * finalColor.a * colorFactor;
          finalColor.a += max(myEmissiveColor.r, max(myEmissiveColor.g, myEmissiveColor.b)) * finalColor.a * colorFactor;
      `,
};

export const CONFIG_SPIRAL_GALAXY_MATERIAL = {
  Vertex_Definitions: `
        uniform sampler2D emissiveSampler;
        varying vec4 vNoiseColor;
        varying vec2 customUV;
        `,
  Vertex_Before_PositionUpdated: `
        customUV = uv;
        vec4 emissiveColor = texture2D( emissiveSampler, uv );
        vec4 noiseColor = texture2D( noise, uv + time * 0.000075 ) * 20.0;
        vNoiseColor = noiseColor;
        positionUpdated.y += noiseColor.r - emissiveColor.r * 0.75;
      `,
  Fragment_Definitions: `
        varying vec4 vNoiseColor;
        varying vec2 customUV;
        vec2 rotateUV(vec2 uv, float rotation)
        {
            float mid = 0.5;
            return vec2(
                cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
                cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
            );
        }
      `,
  Fragment_Before_FragColor: `
          float colorFactor = 0.25;
          vec4 rotateColor = texture2D( emissiveSampler, rotateUV(customUV, time * 0.001));
          vec4 rotateColor1 = texture2D( emissiveSampler, rotateUV(customUV * 0.95, time * 0.0005));
          finalColor.rgb += rotateColor.rgb * 0.75;
          finalColor.rgb -= rotateColor1.rgb * rotateColor1.rgb * 1.25;
          vec4 myEmissiveColor = texture2D( emissiveSampler, vEmissiveUV + uvOffset + vNoiseColor.rr * 0.25);
          finalColor.rgb += myEmissiveColor.rgb * finalColor.a * colorFactor;
          finalColor.a += max(myEmissiveColor.r, max(myEmissiveColor.g, myEmissiveColor.b)) * finalColor.a * colorFactor;
      `,
};
