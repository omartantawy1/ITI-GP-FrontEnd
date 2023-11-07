import { PhaseInterface as Phase } from "./phase-interface";

export interface BoardInterface {

    id: number,
    title: string,
    description: string,
    view: string,
    created_at: string ,
    updated_at: string ,
    phases: Array<Phase>,
    workspace_id: number

}
