import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Message from './components/Message';

import './App.css';
import LogoImage from './secret-messages-logo.png';

const apiGetAll = "http://localhost:3002/";
const getAllParams = {
    method: 'GET'
};

function App({ secrets }) {
    const [messages, showMessages] = useState([]);

    async function getMessages(isSecret) {
        try {
            let response = await fetch(apiGetAll + isSecret, getAllParams);
            let receivedMessages = await response.json();
            showMessages(receivedMessages);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMessages(secrets ? "true" : "false");
    }, [secrets]);

    return (
        <>
            <header>
                <nav id="branding">
                    <img id="logo" src={LogoImage} alt="Secret Messages App" />
                    <h1 id="title">Secret Messages</h1>
                </nav>
            </header>
            <div id="main">
                <section id="messages">
                    {
                        (secrets === true) ?
                            <Link to="/" id="show-secret" role="button">
                                Show public messages
                            </Link>
                            :
                            <Link to="/secret" id="show-secret" role="button">
                                Show secret messages
                            </Link>
                    }
                    <div className="messages-container">
                        {
                            messages.map(
                                (message) =>
                                    <Message
                                        key={`Message${message._id}`}
                                        _id={message._id}
                                        message={message.message}
                                        user={message.user}
                                        date={message.date}
                                    />
                            )
                        }
                    </div>
                </section>
            </div>
            <footer>
                <p>&copy; 2024 Secret Messages</p>
            </footer>
        </>
    );
}

export default App;
