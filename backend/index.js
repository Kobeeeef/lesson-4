const cors = require('cors');
const express = require('express');
const { connectMongoose } = require('./connect');
const Message = require('./models/Message');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());


// Home dynamic route to get public or secret messages
app.get('/:secret', async (req, res) => {

    const results = await Message.readAll(req.params.secret);
    res.send(results);

    console.log("GET request received on home page");
});


// Post route to post a new message
app.post('/message', async (req, res) => {

    const newMessage = req.body;
    const results = await Message.createNew(newMessage);
    res.sendStatus(201);

    console.log("POST request received on message route")
    console.log(`New message created with id: ${results._id}`);
});


// Update route to update an existing message
app.patch('/message/:id', async (req, res) => {

    const messageUpdate = req.body;
    console.log(messageUpdate);
    const results = await Message.update(req.params.id, messageUpdate);
    console.log(results);
    res.sendStatus(200);

    console.log("PATCH request received on message route")
    console.log(`Message with id ${req.params.id} updated`);
});


// Delete route to delete an existing message
app.delete('/message/:id', async (req, res) => {

    const results = await Message.delete(req.params.id);
    res.sendStatus(200);

    console.log("DELETE request received on message route")
    console.log(`Message with id ${req.params.id} deleted`);
});


//* ********************* Launching the server **************** */

const start = async () => {
    try {
        await connectMongoose();
        app.listen(port, () => console.log(`Server running on port ${port}...`));
    }
    catch (err) {
        console.error(err);
    }
}

start();