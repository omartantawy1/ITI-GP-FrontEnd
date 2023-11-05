import { BoardInterface as Board} from "./board-interface";
import { CardInterface as Card } from "./card-interface";

export interface PhaseInterface {
    id: number;
    title: string;
    position: number;
    updated_at: string |null;
    created_at: string |null;
    board: Board;
    cards: Array<Card>|null;
}
