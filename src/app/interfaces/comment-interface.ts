import { CardInterface as Card } from "./card-interface";
import { UserInterface as User} from "./user-interface";

export interface CommentInterface {
    id:number,
    content:string,
    created_at :string,
    updated_at :string,
    user: User,
    card_id: number
}
