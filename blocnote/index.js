const express   = require('express')
const cors      = require('cors')
const port      = 4002;
const app       = express();
const DBapi     = require('./nodesrv/app')
const bodyParser  = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*' 
}));

DBapi(app);

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});