class VAO {
    private gl: WebGL2RenderingContext;
    private VAO: WebGLVertexArrayObject | null;
    private positionBuffer: WebGLBuffer | null;
    private indexBuffer: WebGLBuffer | null;
    private indexBufferSize: number;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.VAO = this.gl.createVertexArray();
        this.positionBuffer = this.gl.createBuffer();
        this.indexBuffer = this.gl.createBuffer();
        this.indexBufferSize = 0;
    }

    bind() {
        this.gl.bindVertexArray(this.VAO);
    }

    fillVBO(data: number[]) {
        // Bind necessary buffers
        this.gl.bindVertexArray(this.VAO);
        // Fill the VBO
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        // Unbind for cleaning
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    fillEBO(data: number[]) {
        this.indexBufferSize += data.length;
        // Bind necessary buffers
        this.gl.bindVertexArray(this.VAO);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        // Fill the EBO
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int32Array(data), this.gl.STATIC_DRAW);
        // Don't unbind the EBO here
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    setParams(posParams: VaoParameters) {
        // Bind necessary buffers
        this.gl.bindVertexArray(this.VAO);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        // Apply parameters to the vertex attribute
        this.gl.vertexAttribPointer(
            posParams.location,
            posParams.size,
            posParams.type,
            posParams.normalized,
            posParams.stride,
            posParams.offset,
        );
        this.gl.enableVertexAttribArray(posParams.location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    getBufferSize(): number {
        return this.indexBufferSize;
    }
}

export { VAO };