import { Direction } from "./enums";
import { Food } from "./food";
import { FoodBowl } from "./foodbowl";
import { GameServiceService } from "./game-service.service";
import { Grid } from "./grid";
import { Position } from "./position";
import { Snake } from "./snake";

export class OnlineGame {

    private grid: Grid;
    private foodbowl: FoodBowl;
    private snakes: { [id : number] : Snake; } = {};

    private mysnake !: Snake;
    private myid!: number;

    private sid: any;

    public started: boolean;
    public gameover: boolean = false;
    public paused: boolean = false;

    public room_no : number = 222;

    private gs : GameServiceService;

    constructor(el: HTMLCanvasElement, gs : GameServiceService) {
        this.grid = new Grid(el);
        // this.mysnake = new Snake(this.grid, new Position(0,0), 'black');
        // ^ change this to allow more than one..

        this.foodbowl = new FoodBowl(this.grid);
        this.started = false;

        this.gs = gs;
    }

    public changeDirection(dir: Direction) {
        const msg = {
            'type': 'move', 
            'snake' : this.mysnake, 
            'snake_id' : this.myid, 
            'newdir' : dir,
            'room_no' : this.room_no
        };
        this.gs.messages.next(msg);
        this.mysnake.changeDirection(dir);
    }

    // chama o move
    private move_snake(): void {
        const rempos : Position | null = this.mysnake.move();
        if (!rempos) return;
        const gameover = this.mysnake.checkIfGameOver();
        if (gameover) { // do smth
            this.gameover = true;
            this.started = false;
            // this.pause();
        }

        const ate : boolean = this.mysnake.checkIfAte(this.foodbowl);
        if (ate) this.foodbowl.fillBowl();

        this.mysnake.checkIfGrow(rempos);
    }

    public getFoodEaten() : number {
        return this.mysnake.foodeaten;
    }
    public getLength() : number {
        return this.mysnake.len;
    }


    public joinOnline(data : any) {
        // data = { snake_id, room = {[food], [snakes]} }
        this.myid = data['snake_id']

        this.mysnake = new Snake(this.grid, new Position(0,0), 'black');
        this.snakes[this.myid] = this.mysnake;

        this.foodbowl.addFood(data.room.food);
        this.sid = setInterval(() => { this.move_snake()}, 200);

    }



}