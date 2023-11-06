import { CardInterface as Card } from "./card-interface";

export interface CategoryInterface {
    id:number,
    name:string,
    color:string,
    cards:Array<Card>,
    created_at: string,
    updated_at: string 
}
