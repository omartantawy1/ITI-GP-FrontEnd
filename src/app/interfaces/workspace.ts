import { BoardInterface as Board} from "./board-interface"

export interface Workspace {
        id: number,
        title: string,
        description: string,
        background_color: string,
        background_image: string,
        created_at: string,
        updated_at: string,
        boards: Array<Board>

}
