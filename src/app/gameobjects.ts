import { Position } from './position';
// import { Snake }

export interface IDrawable {
        //position: Position
        draw(): void
}

export interface IPlayerObject extends IDrawable {

}

export interface IGameObject extends IDrawable {
    // handle_collision(object: Snake): void
}