import { NUM_X, NUM_Y } from "./constants";

export class Position {
    X: number = 0;
    Y: number = 0;
    colour?: string;

    constructor(x: number, y: number, c?: string) {
        this.setX(x);
        this.setY(y);
        this.colour = c;
    }

    public setX(x: number) {
        this.X = x % NUM_X;
        if (this.X<0) this.X = NUM_X + this.X;
    }

    public setY(y: number) {
        this.Y = y % NUM_Y;
        if (this.Y<0) this.Y = NUM_Y + this.Y;
    }

    public setColour(c: string) {
        this.colour = c;
    }
    
    static copy(pos:Position) {
        return new Position(pos.X, pos.Y);
    }

    public copy() {
        return new Position(this.X, this.Y);
    }

    public toString(): string {
        return "("+this.X+", "+ this.Y + ")";
    }

    public equals(p: Position) {
        return p.X === this.X && p.Y === this.Y;
    }

}

