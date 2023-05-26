import { mat4 } from 'gl-matrix'
import { Shader } from './shaders/shader';
import { Camera } from './camera';
import { VAO } from './vao';

class Scene {

    private gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    initDraw() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }

    drawScene(shader: Shader, camera: Camera, vao: VAO) {
        //Clear canvas
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
        for(let i = 0; i < 3; i++) {
            let x_coord = i * 150;
            const modelMatrix = mat4.create();
            mat4.translate(modelMatrix, modelMatrix, [x_coord, 0.0, 0.0]);
            mat4.scale(modelMatrix, modelMatrix, [0.5, 0.5, 0.5]);
        
            this.gl.useProgram(shader.program);
            vao.bind();
            this.gl.uniformMatrix4fv(shader.getUniformLocation("uModelMatrix"), false, modelMatrix);
            this.gl.uniformMatrix4fv(shader.getUniformLocation("uViewMatrix"), false, camera.getViewMatrix());
        
            this.gl.drawElements(this.gl.TRIANGLES, vao.getBufferSize(), this.gl.UNSIGNED_INT, 0);
        }
    }
}

export { Scene }