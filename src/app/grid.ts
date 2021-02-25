import { zip } from "rxjs";
import { HEIGHT, WIDTH, EDGE_SIZE } from "./constants";
import { Food } from "./food";
import { Position } from "./position";

export class Grid {

    private context!: CanvasRenderingContext2D;
    private edgesize: number = EDGE_SIZE;

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

    fillSquare(p: Position, colour?: string) : void {
        // to remove the arg 'colour'
        this.occupied.add(p);

        const col = colour ? colour : 'black';
        // if (!colour) colour = 'black';
        this.context.fillStyle = col;

        this.context.fillRect(p.X*this.edgesize, p.Y*this.edgesize, this.edgesize, this.edgesize);
        

        // console.log('grid fillSquare() : ' + p);
    }

    eraseSquare(p:Position) : void {
        this.occupied.delete(p);
        this.context.clearRect(p.X*this.edgesize, p.Y*this.edgesize, this.edgesize, this.edgesize);
        console.log('grid eraseSquare() : ' + this.occupied);
    }

    public isFree(p: Position): boolean {
        // todo: check this plz for i dont know if it works
        return !this.occupied.has(p);
    }

    public printFood(f: Food): boolean {
        // checked already tho...
        if (!this.isFree(f.pos)) return false;
        
        this.fillSquare(f.pos, f.colour); 
        // maybe change this so that food is a circle or smth..
        
        return true;
    }

    public printSnake(pos: Position[], colours: string[], pos_to_remove?: Position) : void {
        pos.forEach( (p, i) => {
            this.fillSquare(p, colours[i]);
        });
        if (pos_to_remove) this.eraseSquare(pos_to_remove);
    }

    public cleanEverything() {
        this.context.clearRect(0,0,WIDTH,HEIGHT);
    }


}