import { PhaseInterface } from "./phase-interface";

export interface CardInterface {
            id : number,
            title : string,
            description :string|null,
            due_date :string|null,
            status_icon :string|null,
            position :number|null,
            phase : number|PhaseInterface|any,
            groups : Array<any>|null,
}
