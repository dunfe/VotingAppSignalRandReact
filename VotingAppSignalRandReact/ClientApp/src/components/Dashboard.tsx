import React, { useState, useEffect } from 'react';
import D3PieChart from './D3PieChart';
import axios from 'axios';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

interface DashboardAppProps {
    url: string;
}

interface DataItem {
    name: string;
    count: number;
}

const DashboardApp: React.FC<DashboardAppProps> = ({ url }) => {
    const [data, setData] = useState<DataItem[]>([]);
    const [connection, setConnection] = useState<HubConnection>();

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl("https://localhost:7112/votingHub")
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
                    connection.on('ReceiveMessage', (choice: string) => {
                        const data = JSON.parse(choice);
                        console.log(typeof data);
                        console.log(data);

                        setData(data);
                    });
                }).catch(error => {
                    console.log('Failed to connect', error);
                });
        }
    }, [connection]);

    useEffect(() => {
        console.log(data);
    }, [data])

    useEffect(() => {
        axios.get(url)
            .then(function (response) {
                setData(response.data.choices);
            })
            .catch(function (error) {
                console.error(url, error.toString());
            });
    }, [url]);

    return (
        <div className="dashboardapp">
            <D3PieChart data={data} title="Fruits" />
        </div>
    );
};

export default DashboardApp;
