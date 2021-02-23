import { NUM_FOOD, NUM_X, NUM_Y } from "./constants";
import { Grid } from "./grid";
import { Position } from "./position";

export class Food {
    private nfood: number= NUM_FOOD;
    // private currfood: number;
    private grid: Grid;

    private foodset: Set<Position>;

    public constructor(grid: Grid, nfood?: number) {
        if (nfood || nfood && nfood < 0) this.nfood = nfood;
        // this.currfood = 0;
        this.grid = grid;

        this.foodset = new Set<Position>();

        this.initialSpawn();

    }

    private initialSpawn(): void {

        while (this.foodset.size < this.nfood) {
            const newfoodp : Position = this.getRandomPos();
            if (this.grid.addFood(newfoodp)) this.foodset.add(newfoodp);
        }
    }

    private getRandomPos(): Position {
        const y = Math.floor(Math.random() * (NUM_Y+1));
        const x = Math.floor(Math.random() * (NUM_X+1));
        return new Position(x,y);
    }

}