import { NUM_FOOD, NUM_X, NUM_Y } from "./constants";
import { Grid } from "./grid";
import { Position } from "./position";

export class Food {
    public pos: Position;
    public colour: string;
    public points: number;

    public constructor(pos: Position, colour: string, points: number) {
        this.pos = pos;
        this.colour = colour;
        this.points = points;
    }

}