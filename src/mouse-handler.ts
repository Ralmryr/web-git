class MouseHandler {
    private canvas: HTMLCanvasElement;
    private isMouseDown: boolean;
    private prevMouse: [number, number];
    private delta: [number, number];

    private onDrag: (delta: [number, number]) => any;
    private onScroll: (delta: number) => any;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.isMouseDown = false;
        this.prevMouse = [0, 0];
        this.delta = [0, 0];

        // To prevent losing the "this" context when passing it to onmousedown
        this.canvas.onmousedown = (event: MouseEvent) => this.onMouseDown(event);
        this.canvas.onmouseup = (event: MouseEvent) => this.onMouseUp(event);
        this.canvas.onwheel = (event: WheelEvent) => this.onMouseScroll(event);

        this.onDrag = (_: [number, number]): any => {
            console.log("The function onDrag has not been set yet");
            return;
        }
        this.onScroll = (_: number): any => {
            console.log("The function onScroll has not been set yet");
            return;
        }
    }

    private onMouseDown(event: MouseEvent) {
        this.isMouseDown = true;
        this.prevMouse = [event.offsetX, event.offsetY];
    }

    private onMouseUp(_: MouseEvent) {
        this.isMouseDown = false;
        this.delta = [0, 0];
    }

    private onMouseScroll(event: WheelEvent) {
        this.onScroll(event.deltaY);
    }

    private onMouseMove(event: MouseEvent) {
        if(this.isMouseDown) {
            this.delta = [event.offsetX - this.prevMouse[0], event.offsetY - this.prevMouse[1]];
            this.onDrag(this.delta);
            this.prevMouse = [event.offsetX, event.offsetY];
        } else {
            this.delta = [0, 0];
        }
    }

    setOnDrag(callback: (delta: [number, number]) => any) {
        this.onDrag = callback;
        this.canvas.onmousemove = (event: MouseEvent) => this.onMouseMove(event);
    }

    setOnScroll(callback: (delta: number) => any) {
        this.onScroll = callback;
        this.canvas.onwheel = (event: WheelEvent) => this.onMouseScroll(event);
    }
}

export { MouseHandler }