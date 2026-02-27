const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const parser = bodyParser.urlencoded({ extended: true });
app.use(parser);

app.use(express.static('public'));

app.use(express.json()); // json files for wishes
// change to url stuff

let messages = [];

app.get("/test", (request, response) => {
response.send("my server is live!");
 });

app.post("/sign", (req, res) => {
    console.log(req.body)

    const newWish = {
        id: Date.now(), 
        guest: req.body.name,
        post: req.body.wish
    };
    messages.push(newWish);
    res.json(newWish);  
    console.log("New wish added:", newWish);
    
});

    // DEMO APP.POST
    // messages.push({
    //     guest: request.body.guestname,
    //     post: request.body.message,
    // })
    // //we always need to send data at the end of every request
    // //app.post, app.get 
    // response.send("thanks you for signing!");
    // });

app.get("/all-messages", (req, res) => {
    res.json(messages);
});

//DELETE WISH
app.delete("/take/:id", (req, res) => {
    const id = parseInt(req.params.id);
    messages = messages.filter(m => m.id !== id);
    res.json({ message: "Wish taken from the well." });
});

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000")
});
