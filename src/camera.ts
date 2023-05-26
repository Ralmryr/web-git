import { ReadonlyVec3, mat4 } from "gl-matrix";
import * as constants from './constants';

class Camera {
    private viewMatrix: mat4;
    private frustrum: [number, number];
    private coords: [number, number];
    private currentZoom: number;
    
    private readonly BASE_FRUSTRUM: [number, number] = [400, 300];
    private readonly CANVAS_SIZE: [number, number] = [constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT];

    constructor() {
        this.frustrum = this.BASE_FRUSTRUM;
        this.coords = [0, 0];
        this.viewMatrix = mat4.create();
        mat4.scale(this.viewMatrix, this.viewMatrix, [2/this.frustrum[0], 2/this.frustrum[1], 0.0]);
        this.currentZoom = 1;
    }

    // Because we scale first, all translations are related to the world space
    moveTo(x: number, y: number) {
        const translationVector: ReadonlyVec3 = [this.coords[0] - x, this.coords[1] - y, 0.0];
        mat4.translate(this.viewMatrix, this.viewMatrix, translationVector);
        this.coords = [x, y];
    }

    moveBy(dx: number, dy: number) {
        const ratio = this.frustrum[0] / this.CANVAS_SIZE[0];
        dx *= ratio;
        dy *= ratio;
        mat4.translate(this.viewMatrix, this.viewMatrix, [-dx, -dy, 0.0]);
        this.coords = [this.coords[0] + dx, this.coords[1] + dy];
    }

    zoom(amount: number) {
        const prev_coords = this.coords;
        this.currentZoom += amount;
        if(this.currentZoom <= 0.1) {
            this.currentZoom = 0.1;
        }
        this.frustrum = [this.BASE_FRUSTRUM[0] / this.currentZoom, this.BASE_FRUSTRUM[1] / this.currentZoom];
        this.viewMatrix = mat4.create();
        mat4.scale(this.viewMatrix, this.viewMatrix, [2/this.frustrum[0], 2/this.frustrum[1], 0.0]);
        this.coords = [0, 0];
        this.moveTo(prev_coords[0], prev_coords[1]);
    }

    getViewMatrix(): mat4 {
        return this.viewMatrix;
    }
}

export { Camera };