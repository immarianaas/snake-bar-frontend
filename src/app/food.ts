import { NUM_FOOD, NUM_X, NUM_Y } from "./constants";
import { Grid } from "./grid";
import { Position } from "./position";

export class Food {
    private nfood: number= NUM_FOOD;
    // private currfood: number;
    private grid: Grid;

    private foodset: Position[];

    public constructor(grid: Grid, nfood?: number) {
        if (nfood || nfood && nfood < 0) this.nfood = nfood;
        // this.currfood = 0;
        this.grid = grid;

        this.foodset = [];

        this.initialSpawn();

    }

    private initialSpawn(): void {

        while (this.foodset.length < this.nfood) {
            const newfoodp : Position = this.getRandomPos();
            if (this.grid.addFood(newfoodp)) this.foodset.push(newfoodp);
        }
    }

    private getRandomPos(): Position {
        const y = Math.floor(Math.random() * (NUM_Y+1));
        const x = Math.floor(Math.random() * (NUM_X+1));
        return new Position(x,y, 'red');
    }


    public isFood(p: Position): any {
        // return this.foodset.has(p);
        /*
        return this.foodset.some(function(arrPos) {
            if (p.equals(arrPos)) return arrPos;
            else return false;
        });
        */
       var match : any = false;
       this.foodset.forEach( f => {
           if (f.equals(p)) match = f;
       })
       return match;
    }

    public ate(p: Position) : void {
        /*
        var i : number = 0;
        var found : number = -1;
        this.foodset.forEach( elem => {
            if (elem.equals(p)) {
                found = i;
                console.error('entrou')
            }
            console.log('hello')
            i++;
        });
        */ 

        this.foodset = this.foodset.filter(elem => !elem.equals(p));
        // delete this.foodset[found];
        console.error(this.foodset.length);
        // if (ind != -1) delete this.foodset[ind];

        while (this.foodset.length < this.nfood) {
            const newfoodp : Position = this.getRandomPos();
            if (this.grid.addFood(newfoodp)) this.foodset.push(newfoodp);
        }
    }
}