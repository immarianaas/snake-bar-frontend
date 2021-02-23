import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Direct } from "protractor/built/driverProviders";
import { Direction, GameKey } from "./enums";
import { Grid } from "./grid";
import { Position } from "./position";

export class Snake {
    private pos: Position[];
    private dir: Direction;
    private grid: Grid;
    private maxlen: number; // max len
    private sid: any; // setIntervalId

    private tempdir: Direction;

    public constructor(grid: Grid, startpos: Position) {
        this.pos = [startpos];
        this.dir = Direction.NONE;
        this.tempdir = Direction.NONE;
        /* 
         * this _tempdir_ is essential to prevent users from
         * reversing completely the snake in one 'clock tick'
         */
        this.maxlen = 5;

        this.grid = grid;
        this.grid.fillSquare(startpos);

    }

    public start() : void {
        this.sid = setInterval(() => {this.move()}, 200);
    }

    public stop() : void {
        if (!this.sid) return;
        clearInterval(this.sid);
    }



    public changeDirection(newdir: Direction) : void {
        const vertical = [Direction.DOWN, Direction.UP];
        const horizontal = [Direction.LEFT, Direction.RIGHT];
        if ( vertical.includes(newdir) && vertical.includes(this.dir)) return;
        if ( horizontal.includes(newdir) && horizontal.includes(this.dir)) return;

        this.tempdir = newdir;
        console.log("snake changeDirection : " + newdir);
    }

    private move() : void {        
        // is going to move in the direction of _dir_
        // pos[0] is going to have the
        
        this.dir = this.tempdir;
        if (this.dir == Direction.NONE) return;

        const currpos = this.pos[0];
        const newpos = this.getNewPos(currpos);

        /* check if newpos is food */


        this.grid.fillSquare(newpos);

        // unshift puts things on the beginning of the array
        const currlen = this.pos.unshift(newpos);

        if (currlen>this.maxlen) {
            const postorem = this.pos.pop();
            
            if (postorem == undefined) { 
                console.log("help - snake move()");
                return;
            }

            this.grid.eraseSquare(postorem);
        }

        var col : boolean = this.checkCollision(newpos);
        if (col) this.stop();
        /* TODO: SOMETHING CUTE */


    }

    private checkCollision(head: Position) : boolean {
        // see if snake[0] appears anywhere else..
        console.log("snake checkCollision() : " + this.pos.lastIndexOf(this.pos[0]))

        //return this.pos.some(this.pos[0].equals);
        return this.pos.slice(1).some(function(arrPos) {
            return head.equals(arrPos);
        });

        
        // return this.pos.lastIndexOf(this.pos[0]) > 0;
    }


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