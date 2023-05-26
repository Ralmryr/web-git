class Square {
    private topLeftX: number;
    private topLeftY: number;
    private width: number;
    private height: number;
    private buffer: Array<number>;
    private indices: Array<number>;

    constructor(topLeftX: number, topLeftY: number, width: number, height: number) {
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;
        this.width = width;
        this.height = height;

        this.buffer = [];
        this.updateBuffer();

        this.indices = [
            0, 1, 2, // Top left triangle
            0, 2, 3, // Bottom right triangle
        ];
    }

    getBuffer(): Array<number> {
        return this.buffer;
    }

    getIndices(): Array<number> {
        return this.indices;
    }

    private updateBuffer() {
        this.buffer = [
            this.topLeftX + this.width, this.topLeftY, // Top right
            this.topLeftX, this.topLeftY, // Top left
            this.topLeftX, this.topLeftY - this.height, // Bottom left
            this.topLeftX + this.width, this.topLeftY - this.height, // Bottom right
        ];
    }
}

export { Square }