import { CardInterface as Card } from "./card-interface";

export interface PhaseInterface {
    id: number;
    title: string;
    position: number;
    board: number|any|null;
    updated_at: string |null;
    created_at: string |null;
    cards: Array<Card>|null;
}