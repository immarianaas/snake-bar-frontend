import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Direct } from "protractor/built/driverProviders";
import { DrawingComponent } from "./drawing/drawing.component";
import { Direction, GameKey } from "./enums";
import { Food } from "./food";
import { FoodBowl } from "./foodbowl";
import { Grid } from "./grid";
import { Position } from "./position";

export class Snake {
    private pos: Position[];
    private colours: string[];


    private dir: Direction;
    private grid: Grid;
    public len: number; // max len
    private sid: any; // setIntervalId

    private tempdir: Direction;

    private digesting: Food[];

    public foodeaten : number = 0;

    public constructor(grid: Grid, startpos: Position, colour: string) {
        this.pos = [startpos];
        this.colours = [colour];

        this.dir = Direction.NONE;
        this.tempdir = Direction.NONE;
        /* 
         * this _tempdir_ is essential to prevent users from
         * reversing completely the snake in one 'clock tick'
         */
        this.len = 5;

        this.grid = grid;
        this.grid.fillSquare(startpos, colour);

        this.digesting = [];
    }

    /* // this will go to "game"
    public start() : void {
        this.sid = setInterval(() => {this.move()}, 200);
    }

    public stop() : void {
        if (!this.sid) return;
        clearInterval(this.sid);
    }
    */

    public changeDirection(newdir: Direction) : void {
        const vertical = [Direction.DOWN, Direction.UP];
        const horizontal = [Direction.LEFT, Direction.RIGHT];
        if ( vertical.includes(newdir) && vertical.includes(this.dir)) return;
        if ( horizontal.includes(newdir) && horizontal.includes(this.dir)) return;

        this.tempdir = newdir;
        console.log("snake changeDirection : " + newdir);
    }

    
    public move() : Position | null {        
        // is going to move in the direction of _dir_
        // pos[0] is going to have the
        
        this.dir = this.tempdir;
        if (this.dir == Direction.NONE) return null;

        
        const currpos = this.pos[0];
        let newpos = this.getNewPos(currpos);


        // this.grid.fillSquare(newpos);


        // unshift puts things on the beginning of the array
        const currlen = this.pos.unshift(newpos);

        
        // happens in the begining
        if (currlen<=this.len) {
            this.colours.push(this.colours[0]);
            // console.error('something not right - snake move()');
            this.grid.printSnake(this.pos, this.colours);
            return null;
        }
        

        const postorem = this.pos.pop();
        
        if (postorem == undefined) { 
            console.log("help - snake move()");
            return null;
        }
        /*
        if (this.digesting[0] && this.digesting[0].equals(postorem)) {
            // time to grow
            const food_to_be_rem = this.digesting.shift();
            if (!food_to_be_rem) console.error('error removing food from digested');
            else this.pos.push(food_to_be_rem);
            this.len++;
        } else 
        */
        this.grid.printSnake(this.pos, this.colours, postorem);

           // this.grid.eraseSquare(postorem);
        // }
        return postorem;
    }

    public checkIfGameOver(): boolean {
        const head = this.pos[0];
        return this.pos.slice(1).some(function(arrPos) {
            return head.equals(arrPos);
        });   
    }

    public checkIfAte(fb: FoodBowl) : boolean {
        const newpos = this.pos[0];
        const food : Food | null = fb.eatFood(newpos);
        if (!food) return false;
        this.digesting.push(food);
        this.foodeaten++;
        return true;
        /*
        const f = this.food.isFood(head)
        if (!f) return false;
        this.digesting.push(f);
        this.foodeaten++;
        this.food.ate(f);
        return f;
        */
    }

    public checkIfGrow(removed_pos: Position) : boolean {
        let food : Food | null = null;
        this.digesting.forEach(f => {
            if (f.pos.equals(removed_pos)) food = f;
        });

        if (!food) return false;
        this.digesting.push(food);
        this.foodeaten++;
        return true;
    }
    

    
/*
    private checkCollision(head: Position) : boolean {
        // see if snake[0] appears anywhere else..
        // console.log("snake checkCollision() : " + this.pos.lastIndexOf(this.pos[0]))

        //return this.pos.some(this.pos[0].equals);
        return this.pos.slice(1).some(function(arrPos) {
            return head.equals(arrPos);
        });
        // return this.pos.lastIndexOf(this.pos[0]) > 0;
    }

    */


    private getNewPos(p: Position): Position {
        const ans = p.copy();

        switch (this.dir) {
            case Direction.DOWN:
                ans.setY(ans.Y+1); break;
            case Direction.LEFT:
                ans.setX(ans.X-1); break;
            case Direction.UP:
                ans.setY(ans.Y-1); break;
            case Direction.RIGHT:
                ans.setX(ans.X+1); break;
            default:
                break;
        }
        
        return ans;
    }
}