import { mat4 } from "gl-matrix";

class Shader {
    program: WebGLProgram;
    gl: WebGL2RenderingContext;
    uniforms: Map<string, WebGLUniformLocation>;
    attribs: Map<string, number>;

    constructor(program: WebGLProgram, gl: WebGL2RenderingContext) {
        this.program = program;
        this.gl = gl;
        this.uniforms = new Map<string, WebGLUniformLocation>();
        this.attribs = new Map<string, number>();
    }

    static async create(gl: WebGL2RenderingContext, vSource: string, fSource: string): Promise<Shader | null> {
        // Load shader files
        const tempProgram = initShaderProgram(gl, vSource, fSource);

        if (typeof tempProgram === "string") {
            console.log(tempProgram); // Means there is an error
            return null;
        } else {
            return new Shader(tempProgram, gl);
        }
    }

    use(): void {
        this.gl.useProgram(this.program);
    }

    registerAttrib(attribName: string) {
        if (this.attribs.has(attribName)) {
            return;
        }
        this.gl.getAttribLocation(this.program, attribName);
    }

    getAttribLocation(attribName: string): number | null {
        let attribLocation = this.attribs.get(attribName);

        if (attribLocation == undefined) {
            attribLocation = this.gl.getAttribLocation(this.program, attribName);
            if (attribLocation == -1) {
                console.log("ERROR: The requested attribute ", attribName, " is not valid");
                return null;
            } else {
                this.attribs.set(attribName, attribLocation);
                return attribLocation;
            }
        }
        else {
            return attribLocation;
        }
    }

    registerUniform(uniformName: string) {
        if (this.uniforms.has(uniformName)) {
            return;
        }
        this.gl.getUniformLocation(this.program, uniformName);
    }

    getUniformLocation(uniformName: string): WebGLUniformLocation | null {
        let uniformLocation = this.uniforms.get(uniformName);

        if (uniformLocation == undefined) {
            const uniformResult = this.gl.getUniformLocation(this.program, uniformName);
            if (uniformResult == null) {
                console.log("ERROR: The requested uniform ", uniformName, " is not valid");
                return null;
            } else {
                uniformLocation = uniformResult;
                this.uniforms.set(uniformName, uniformLocation);
                return uniformLocation;
            }
        }
        else {
            return uniformLocation;
        }
    }

    setUniform(uniformName: string, value: number | mat4) {
        const uniformLocation = this.getUniformLocation(uniformName);
        if(uniformLocation == null) {
            return null;
        }

        switch (typeof(value)) {
            case "number":
                this.gl.uniform1f(uniformLocation, value);
                break;
            
            case "object":
                this.gl.uniform4fv(uniformLocation, value);
                break;
        
            default:
                console.log("Type not supported");
                break;
        }
    }
}

function initShaderProgram(gl: WebGL2RenderingContext, vSource: string, fSource: string): WebGLProgram | string {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
    if (vertexShader == null) {
        return "Error while loading vertex shader";
    }

    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);
    if (fragmentShader == null) {
        return "Error while loading fragment shader";
    }

    const shaderProgram = gl.createProgram();
    if (shaderProgram == null) {
        return "Error while loading shader program";
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        const err =
            "Error while linking the shader program : " +
            gl.getProgramInfoLog(shaderProgram);
        gl.deleteProgram(shaderProgram);
        return err;
    }

    return shaderProgram;
}

function loadShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (shader == null) {
        return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

export { Shader };
