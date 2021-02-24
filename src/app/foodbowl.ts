import { isNull } from "@angular/compiler/src/output/output_ast";
import { NUM_FOOD, NUM_X, NUM_Y } from "./constants";
import { Food } from "./food";
import { Grid } from "./grid";
import { Position } from "./position";

export class FoodBowl {
    private nfood: number = NUM_FOOD;
    private grid: Grid;
    private foodset: Food[];

    public constructor(grid: Grid, nfood?: number) {
        if (nfood || nfood && nfood < 0) this.nfood = nfood;
        this.grid = grid;
        this.foodset = [];
    }

    public fillBowl(max?: number) {
        const maxquantity = max && max >= 0 ? max : this.nfood;
        while (this.foodset.length <= maxquantity) {
            const newfoodp : Position = this.getRandomPos();
            if (this.grid.isFree(newfoodp)) {
                const f : Food = this.genRandomFood(newfoodp);
                this.foodset.push(f);
                this.grid.printFood(f);
            }
        }
    }

    public eatFood(pos: Position) : Food | null {
        var f : Food | null = null;
        this.foodset.forEach( food => {
            if (pos.equals(food.pos)) f = food;
        });
        if (!f) return null;
        this.foodset = this.foodset.filter( felem => f?.pos.equals(felem.pos) );
        return f;
    }

    private genRandomFood(p: Position): Food {
        return new Food(p, 'red', 1); // change later maybe
    }

    private getRandomPos(): Position {
        const y = Math.floor(Math.random() * (NUM_Y+1));
        const x = Math.floor(Math.random() * (NUM_X+1));
        return new Position(x,y);
    }

    


}