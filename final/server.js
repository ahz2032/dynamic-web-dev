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

app.get("/all-messages", (req, res) => {
    res.json([...messages].reverse()
    );
});

app.listen(10, () => {
    console.log("Server running on http://localhost:10")
});