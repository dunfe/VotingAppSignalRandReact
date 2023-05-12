import React, { useState, useEffect } from 'react';
import RadioInput from './RadioInput';
import axios from 'axios';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

interface QuizContainerProps {
    url: string;
}

interface Choice {
    name: string;
    votes: number;
}

interface Quiz {
    question: string;
    choices: Choice[];
}
  

const QuizContainer = (props: QuizContainerProps) => {
    const [currentQuiz, setCurrentQuiz] = useState<Quiz>({
        question: '',
        choices: []
    });
    const [userChoice, setUserChoice] = useState('');
    const [isDone, setIsDone] = useState(false);
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
                }).catch(error => {
                    console.log('Failed to connect', error);
                });
        }
    }, [connection]);

    useEffect(() => {
        const fetchData = () => {
            axios.get(props.url)
            .then(response => {
              const data = response.data;
              setCurrentQuiz({
                question: data.question,
                choices: data.choices
              });
              setUserChoice('');
              setIsDone(false);
            })
            .catch(error => {
              console.error(props.url, error.toString());
            });
        };

        fetchData();
    }, [props.url]);

    const selectedAnswer = (option: string) => {
        console.log(option);
        setUserChoice(option);
    };

    useEffect(() => {
        console.log(connection);
    }, [connection]);

    const handleSubmit = () => {
        var selectedChoice = userChoice;
        connection?.invoke('Send', selectedChoice).then(() => {
            console.log('Vote sent!');
            setIsDone(true);
        })
    };

    if (isDone === true) {
        return (
            <div className="quizContainer">
                <h1>Thank you for your vote.</h1>
            </div>
        );
    } else {
        var choices = currentQuiz.choices.map((choice, index) => {
            return (
                <RadioInput key={choice.name} disable={false} choice={choice.name} index={`${index}`} classType='' onChoiceSelect={selectedAnswer} />
            );
        });
        var button_name = "Submit";
        return (
            <div className="quizContainer">
                <h1>Quiz</h1>
                <p>{currentQuiz.question}</p>
                {choices}
                <button id="submit" className="btn btn-default" onClick={handleSubmit}>{button_name}</button>
            </div>
        );
    }
};

export default QuizContainer;
