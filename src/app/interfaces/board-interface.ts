import { PhaseInterface as Phase } from "./phase-interface";
import { UserInterface } from "./user-interface";

export interface BoardInterface {

    id: number,
    title: string,
    description: string,
    view: string,
    created_at: string ,
    updated_at: string ,
    phases: Array<Phase>,
    workspace_id: number,
    background_color:string,
    user:Array<UserInterface>,

}
