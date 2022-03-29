const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/handle',(request,response) => {
//code to perform particular action.
//To access POST variable use req.body()methods.
console.log(request.body);
});

app.get('/',function(req,res) {
    res.send('Hello world !');
})

app.listen(3030,() => {
    console.log("Started on PORT 3030");
})

app.post('/', (req,res) => {
    console.log("Got a post");
    console.log(req.body);
    res.send("hello")
})