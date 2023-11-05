import { PhaseInterface as Phase } from "./phase-interface";

export interface CardInterface {
            id : number,
            title : string,
            description :string|null,
            due_date :string|null,
            status_icon :string|null,
            position :number|null,
            phase_id : number|null,
            groups : Array<any>|null,
            phase: Phase
}
