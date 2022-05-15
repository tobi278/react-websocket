import React from 'react';
import './SocketConnect.css';
import {Client} from "@stomp/stompjs";
import {WebClient} from "../../entity/WebClient";

type SocketConnectProps = { webClient: WebClient }
const SocketConnect = (props: SocketConnectProps) => {

    const connect = () => {
        props.webClient.client = new Client({
            brokerURL: 'ws://localhost:8080/chat',
            connectHeaders: {},
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        props.webClient.client.onConnect = function (frame) {
            props.webClient.connected = true;
            console.log('Connected: ' + frame);
            props.webClient.client.subscribe('/topic/messages', function (messageOutput) {
                console.log(JSON.parse(messageOutput.body));
            });
        };

        props.webClient.client.onStompError = function (frame) {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        props.webClient.client.activate();
    };

    return <div>
        <input type="text" id="from" placeholder="Choose a nickname"/>
        <button id="connect" onClick={() => connect()}>Connect</button>
    </div>;

}

export default SocketConnect;
