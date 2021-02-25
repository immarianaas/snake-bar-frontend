import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Square } from './square';
import { Canvas } from '../canvas';
import { Direction, GameKey } from '../enums';
import { Position } from '../position';
import { Grid } from '../grid';
import { Snake } from '../snake';
import { Direct } from 'protractor/built/driverProviders';
import { Food } from '../food';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {

  @ViewChild('canv', {static: true})
  canv!: ElementRef<HTMLCanvasElement>;
  
  canvas!: Canvas;
  grid!: Grid;

  public  snake!: Snake;
  private food!: Food;

  
  //private ctx!: CanvasRenderingContext2D;

  constructor() {}
  
  ngOnInit(): void {
    /*
    const c = this.canv.nativeElement.getContext('2d');
    if (!c || !(c instanceof CanvasRenderingContext2D)) throw new Error('canvas context error');
    this.ctx = c;
    */
   this.setup();
  }

  setup() : void {
    this.canvas = new Canvas(this.canv.nativeElement);
    this.grid = new Grid(this.canv.nativeElement);
 
    this.food = new Food(new Position(-1,-1), 'ds', 10);
    this.snake = new Snake(this.grid, new Position(0,0), 'black');
 
  }


  i: number = 1
  animate(): void {
 
   this.i += 10;
   this.grid.fillSquare(new Position(this.i, this.i));
   
  }

  private drawSmth(p: Position, color: string): void {
    this.canvas.draw_rect(p.X, p.Y, 10, 10, color);
  }

  pos: Position = new Position(0, 0);
  step: number = 10;

  animateDirection(e: number) : void {
    var d: Direction = Direction.NONE;

    switch (e) {
      case GameKey.DOWN:
        d = Direction.DOWN; break;
      case GameKey.UP:
        d = Direction.UP; break;
      case GameKey.LEFT:
        d = Direction.LEFT; break;
      case GameKey.RIGHT:
        d = Direction.RIGHT; break;
    
      default:
        console.log("invalid key");
    }
    this.snake.changeDirection(d);
    
  }

  public running: boolean = false;
  public pause: boolean = false;
  public isGameover: boolean = false;

  start(): void {
    this.canv.nativeElement.focus();

    if (this.running) return;

    if (!this.pause) this.setup();
    // this.snake.start();
    this.running = true;
    this.isGameover=false;

    this.write();


  }


  stop(): void {
    this.running = false;
    this.pause = true;
    // this.snake.stop();
  }

  restart(): void {
    this.running = false;
    this.pause = false;
    this.start();

  }

  public gameover(): void {
    this.running = false;
    this.pause = false;
    this.isGameover = true;
  }

  public write() : void {
    const ctx = this.canv.nativeElement.getContext("2d");
    if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
        throw new Error('Error getting 2D context!!');
    }
    ctx.font = '60px serif';
    ctx.strokeText('Game Over', 10, 50);
    
  }
  log(): void { console.log('help'); }
}


