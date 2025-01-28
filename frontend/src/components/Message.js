import React from 'react';
import './Message.css';

function Message(props) {
    return (
        <div className="message" id={props._id}>
            <h4>{props.message}</h4>
            <div className="meta">
                <p>{props.user} &nbsp; {props.date}</p>
            </div>
        </div>
    );
}

export default Message;
