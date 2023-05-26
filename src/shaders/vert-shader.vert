attribute vec2 aVertexPosition;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;

void main() {
    // This is a comment
    gl_Position = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 0.0, 1.0);
}