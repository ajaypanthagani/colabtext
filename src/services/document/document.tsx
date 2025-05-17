import { Descendant } from "slate";
import { writeToWebSocket } from "../websocket/websocket";

export const saveDoc = (data: Descendant[]) => {
    writeToWebSocket(JSON.stringify(data))
}
