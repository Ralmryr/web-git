import { Shader } from './shaders/shader';
import { Scene } from './scene';
import { initVAO } from './init-buffers';
import { Camera } from './camera';
import { MouseHandler } from './mouse-handler';

import vSource from './shaders/vert-shader.vert?raw';
import fSource from './shaders/frag-shader.frag?raw';

import * as constants from './constants';

import 'https://greggman.github.io/webgl-lint/webgl-lint.js';

main();

async function main() {
    const canvas = document.querySelector("#glcanvas") as HTMLCanvasElement;
    canvas.width = constants.CANVAS_WIDTH;
    canvas.height = constants.CANVAS_HEIGHT;

    // Initialize the GL context
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL2. Your browser or machine may not support it.");
        return;
    }

    // Create shader
    const shader = await Shader.create(gl, vSource, fSource);
    if (shader == null) {
        return;
    }
    
    const vao = initVAO(gl, shader);
    if (vao == null) {
        return;
    }

    // Initialize scenes
    const scene = new Scene(gl);
    const camera = new Camera();
    scene.initDraw();

    // Initialize mouse handler
    const mouse = new MouseHandler(canvas);
    const onDrag = (delta: [number, number]) => {
        camera.moveBy(-delta[0], delta[1]);
    }
    const onScroll = (delta: number) => {
        const zoomIncrement = 0.1;
        if(delta > 0) {
            camera.zoom(-zoomIncrement);
        } else {
            camera.zoom(zoomIncrement);
        }
    }
    mouse.setOnDrag(onDrag);
    mouse.setOnScroll(onScroll);

    // Varibales to compute FPS
    let prevTime = 0;
    let currTime = 0;
    let elapsed = 0;
    let drawCounter = 0;

    // Main loop
    const animate = () => {
        scene.drawScene(shader, camera, vao);
        
        // Compute FPS
        currTime = performance.now();
        elapsed = currTime - prevTime;
        prevTime = currTime;
        window.requestAnimationFrame(animate);

        drawCounter += 1;
        if(drawCounter%30 == 0) {
            document.getElementById("fpsCounter")!.innerHTML = (Math.round(1000/elapsed)).toString();
        }
    }
    animate();
}