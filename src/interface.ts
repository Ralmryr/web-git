interface ProgramInfo {
    program: WebGLProgram,
    attribLocations: {
        vertexPosition: number,
    },
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation | null,
        modelMatrix: WebGLUniformLocation | null,
        viewMatrix: WebGLUniformLocation | null,
    }
}

interface Buffers {
    position: WebGLBuffer,
    indices: WebGLBuffer,
    vertex: WebGLVertexArrayObject,
}

interface VaoParameters {
    location: number,
    size: number,
    stride: number,
    normalized: boolean,
    type: WebGL2RenderingContext["FLOAT"] | WebGL2RenderingContext["UNSIGNED_INT"],
    offset: number,
}