import { Direction } from "./enums";
import { Food } from "./food";
import { FoodBowl } from "./foodbowl";
import { Grid } from "./grid";
import { Position } from "./position";
import { Snake } from "./snake";

export class Game {

    private grid: Grid;
    private foodbowl: FoodBowl;
    private snake: Snake;

    private sid: any;

    private started: boolean;

    constructor(el: HTMLCanvasElement) {
        this.grid = new Grid(el);
        this.snake = new Snake(this.grid, new Position(0,0), 'black');
        // ^ change this to allow more than one..

        this.foodbowl = new FoodBowl(this.grid);
        this.started = false;
    }

    public changeDirection(dir: Direction) {
        this.snake.changeDirection(dir);
    }

    // chama o move
    private move_snake(): void {
        const rempos : Position | null = this.snake.move();
        if (!rempos) return;
        const gameover = this.snake.checkIfGameOver();
        if (gameover) { // do smth
            this.pause();
        }

        const ate : boolean = this.snake.checkIfAte(this.foodbowl);
        if (ate) this.foodbowl.fillBowl();

        this.snake.checkIfGrow(rempos);
    }

    public start() {
        if (!this.started) {
            this.foodbowl.fillBowl();
        this.started = true;

        }
        this.sid = setInterval(() => { this.move_snake()}, 200);
    }

    public pause() {
        if (!this.sid) return;
        clearInterval(this.sid);
    }



}