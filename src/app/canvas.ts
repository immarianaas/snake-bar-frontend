export class Canvas {
    public static width: number = 640;
    public static height: number = 400;
    public context!: CanvasRenderingContext2D;

    public constructor(el: HTMLCanvasElement) {
        el.height= Canvas.height;
        el.width = Canvas.width;
        const ctx = el.getContext("2d");
        if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('Error getting 2D context!!');
        }
        this.context = ctx;
    }

    public fill(color: string) {
        this.context.beginPath();
        this.context.rect(0, 0, Canvas.width, Canvas.height);
        this.context.fillStyle = color;
        this.context.fill();
    }

    public fill_rect(x: number, y: number, w: number, h: number, color: string) {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.fillRect(x,y,w,h);
    }

    public draw_rect(x: number, y: number, w: number, h: number, color: string) {
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.strokeStyle = color;
        this.context.rect(x,y,w,h);
        this.context.stroke();
    }
}