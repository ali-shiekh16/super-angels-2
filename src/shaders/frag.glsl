
uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec3 vColor;
varying float vVisible;

void main() {
	if ( floor(vVisible + 0.1) == 0.0 ) discard;

	vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
	vec4 textureColor = texture2D(uTexture, uv);


	gl_FragColor = vec4(vColor, textureColor.a);
}