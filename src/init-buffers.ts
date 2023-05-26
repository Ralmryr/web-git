import { Square } from "./square";
import { Shader } from "./shaders/shader";
import { VAO } from "./vao";

function initVAO(gl: WebGL2RenderingContext, shader: Shader): VAO | null {
    const vao = new VAO(gl);
    const square = new Square(-100, 100, 200, 200);
    
    const vertexLocation = gl.getAttribLocation(shader.program, "aVertexPosition");
    if(vertexLocation == -1) {
        console.log("Can't find vertex location");
        return null;
    };

    const posParams: VaoParameters = {
        location: vertexLocation,
        size: 2,
        stride: 0,
        normalized: false,
        type: gl.FLOAT,
        offset: 0,
    };

    vao.fillVBO(square.getBuffer());
    vao.fillEBO(square.getIndices());
    vao.setParams(posParams);

    return vao;
}

export { initVAO };