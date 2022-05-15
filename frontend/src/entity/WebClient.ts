import {Client} from "@stomp/stompjs";

export interface WebClient {
    connected: boolean,
    client: Client
}
