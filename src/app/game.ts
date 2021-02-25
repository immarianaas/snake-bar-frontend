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

    public started: boolean;
    public gameover: boolean = false;
    public paused: boolean = false;

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
            this.gameover = true;
            this.started = false;
            this.pause();
        }

        const ate : boolean = this.snake.checkIfAte(this.foodbowl);
        if (ate) this.foodbowl.fillBowl();

        this.snake.checkIfGrow(rempos);
    }

    public start() {
        if (this.gameover) {
            this.reset();
            this.gameover = false;
        }
        if (!this.started) {
            this.foodbowl.fillBowl();
            this.started = true;
        }
        this.paused = false;
        this.sid = setInterval(() => { this.move_snake()}, 200);
    }

    public pause() {
        if (!this.sid) return;
        clearInterval(this.sid);
        if (!this.started) this.paused = false;
        else this.paused = true;
    }

    public reset() {

        this.grid.cleanEverything();
        this.started = false;
        this.snake = new Snake(this.grid, new Position(0,0), 'black');
        // ^ change this to allow more than one..

        this.foodbowl = new FoodBowl(this.grid);
        this.started=false;
        this.pause();
    }



}