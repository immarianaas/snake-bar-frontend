import { runInThisContext } from "node:vm";
import { HEIGHT, WIDTH } from "./constants";
import { Position } from "./position";

export class Grid {

    private context!: CanvasRenderingContext2D;
    private edgesize: number = 10;

    private occupied : Set<Position>;

    // private num_x: number;
    // private num_y: number;

    public constructor(el: HTMLCanvasElement) {
        el.height = HEIGHT;
        el.width = WIDTH; // place other place if more adequate

        // this.num_x = el.width / this.edgesize;
        // this.num_y = el.height / this.edgesize;

        this.occupied = new Set<Position>();

        const ctx = el.getContext("2d");
        if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('Error getting 2D context!!');
        }
        this.context = ctx;
    }

    fillSquare(p: Position) : void {
        // to remove the arg 'colour'
        this.occupied.add(p);

        const colour = !p.colour ? 'black' : p.colour;
        // if (!colour) colour = 'black';
        this.context.fillStyle = colour;

        this.context.fillRect(p.X*this.edgesize, p.Y*this.edgesize, this.edgesize, this.edgesize);
        

        // console.log('grid fillSquare() : ' + p);
    }

    eraseSquare(p:Position) : void {
        this.occupied.delete(p);
        this.context.clearRect(p.X*this.edgesize, p.Y*this.edgesize, this.edgesize, this.edgesize);
        console.log('grid eraseSquare() : ' + this.occupied);
    }

    private isFree(p: Position): boolean {
        return !this.occupied.has(p);
    }

    public addFood(p: Position): boolean {
        if (!this.isFree(p)) return false;
        
        this.fillSquare(p);
        return true;
    }


}