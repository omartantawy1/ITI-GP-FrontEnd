import { CardInterface as Card } from "./card-interface";

export interface PhaseInterface {
    id: number,
    title: string,
    position: number,
    created_at: string ,
    updated_at: string ,
    board_id: number,
    cards: Array<Card>
}
