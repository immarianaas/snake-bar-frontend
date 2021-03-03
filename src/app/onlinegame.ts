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
    // private snakes: { [id : number] : Snake; } = {};
    private snakes: Map<number, Snake> = new Map();

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
        // this.snakes[this.myid] = new Snake(this.grid, new Position(0,0), 'black');
        // ^ change this to allow more than one..

        this.foodbowl = new FoodBowl(this.grid);
        this.started = false;

        this.gs = gs;
    }

    public changeDirection(dir: Direction) {
        /*
        const msg = {
            'type': 'move', 
            'snake' : this.snakes.get(this.myid), 
            'snake_id' : this.myid, 
            'newdir' : dir,
            'room_no' : this.room_no
        };
        */
       const msg = {
        'type': 'poll_answer', 
        'snake' : this.snakes.get(this.myid), 
        'snake_id' : this.myid, 
    };
       this.gs.messages.next(msg);

        this.snakes.get(this.myid)?.changeDirection(dir);
        console.log(this.snakes.get(this.myid)?.tempdir);
    }

    // chama o move
    private move_snake(sn : Snake): void {
        // console.log(sn);
        const rempos : Position | null = sn.move();
        if (!rempos) return;
        console.log('hey2');

        const gameover = sn.checkIfGameOver();
        if (gameover) { // do smth
            this.gameover = true;
            this.started = false;
            // this.pause();
        }

        const ate : boolean = sn.checkIfAte(this.foodbowl);
        if (ate) this.foodbowl.fillBowl();

        sn.checkIfGrow(rempos);
    }

    public move_all() : void {
        this.snakes.forEach( elem => { 
            this.move_snake(elem);
            //console.log(elem);
        });
        console.log('size: ' , this.snakes.size);
    }

    /*
    public getFoodEaten() : number {
        return this.snakes[this.myid].foodeaten;
    }
    public getLength() : number {
        return this.snakes.get(this.myid).len;
    }*/


    public joinOnline(data : any) {
        // data = { snake_id, room = {[food], [snakes]} }
        if (this.myid) return;
        this.myid = data['snake_id']

        const mysnake = new Snake(this.grid, new Position(0,0), 'black');
        // this.snakes[this.myid] = this.snakes[this.myid];
        this.snakes.set(this.myid, mysnake);

        this.foodbowl.addFood(data.room.food);
        this.sid = setInterval(() => { this.move_all()}, 200);

    }

    public answerPoll() : void {
        const msg = {
            'type': 'poll_answer', 
            'snake' : this.snakes.get(this.myid), 
            'snake_id' : this.myid, 
        };
        this.gs.messages.next(msg);
        console.error('answer poll : ', this.snakes.get(this.myid) );
        console.error('answer poll : ', this.snakes.get(this.myid)?.tempdir );
    }

    public update(msg : any) : void {
        console.log('msg id: ' , msg.id, '\nmyid: ', this.myid, '\n === ? ', msg.id === this.myid)
        if (msg.id === this.myid) return;
        console.log('msg: ', msg)
        const sn : Snake = new Snake(this.grid);
        sn.set_snake(msg.snake);

        this.snakes.set(msg.id, sn);
        // if (msg.id === this.myid) this.snakes.set(this.myid, sn);

        console.error('HWRE', sn)
        console.error(sn instanceof Snake);


    }


}