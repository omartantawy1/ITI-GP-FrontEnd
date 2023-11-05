import { PhaseInterface as Phase } from "./phase-interface";

export interface BoardInterface {

    id: number|any |null;
    title: string;
    description: string;
    view: string;
    workspace:any|null;
    phases:Phase;
    updated_at: string |null;
    created_at: string |null;

}
