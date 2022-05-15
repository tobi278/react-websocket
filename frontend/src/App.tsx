import React from 'react';
import './App.css';
import SocketConnect from "./components/socket-connect/SocketConnect";
import {WebClient} from "./entity/WebClient";
import {Client} from "@stomp/stompjs";

function App() {

    const client = {
        connected: false,
        client: new Client()
    } as WebClient;

    return <div>Hey!
        <SocketConnect webClient={client} />
    </div>
}

export default App;
