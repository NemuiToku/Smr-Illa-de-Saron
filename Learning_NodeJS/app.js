const express   = require('express')
const cors      = require('cors')
const port      = 3002;
const app       = express();
const users     = require('./routes/usuarios')
const bodyParser  = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*' 
}));

users(app);

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});