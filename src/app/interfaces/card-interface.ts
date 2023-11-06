import { CategoryInterface as Category } from "./category-interface";
import { CommentInterface as Comment } from "./comment-interface";
import { PhaseInterface as Phase } from "./phase-interface";

export interface CardInterface {
    id : number,
    title : string,
    description :string,
    due_date :string,
    status_icon :string,
    position :number,
    phase_id : number,
    groups : Array<any>,
    categories : Array<Category>,
    comments : Array<Comment>,
    attachments : Array<any>
}
