const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5')
const Joi = require ('@hapi/joi')
const jwt = require ('jsonwebtoken');
const seed = 'prueba'

const schema = Joi.object({
    username: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
    })



const users = app =>{

var db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

    db.run('CREATE TABLE IF NOT EXISTS usuarios( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    username TEXT NOT NULL UNIQUE,\
    email TEXT NOT NULL UNIQUE,\
    password TEXT NOT NULL\
    )')
    }
});

app.get("/api/usuarios", verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData ) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json ({
                message: 'Verified',
                authData,
            })
        }
    })
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({rows});
      });
});

app.get("/api/usuarios/:id", (req, res, next) => {
    var sql = "SELECT * FROM usuarios WHERE id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.patch("/api/usuarios/:id", (req, res, next) => {
    var data = {
        email: req.body.email,
        password : req.body.password,
        username : req.body.username
    }
    db.run(
        `UPDATE usuarios set 
          email = COALESCE(?,email), 
          password = COALESCE(?,password),
          username = COALESCE(?,username)
           WHERE id = ?`,
           [data.email, data.password, data.username, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/usuarios/:id", (req, res, next) => {
    db.run(
        'DELETE FROM usuarios WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

app.post("/api/usuarios/register", async (req, res, next) => {

    //VALIDACIÓN DE USUARIO
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

        var data = {
            email: req.body.email,
            password : md5(seed + req.body.password),
            username : req.body.username
        }
        var sql ='INSERT INTO usuarios (username, email, password) VALUES (?,?,?)'
        var params =[data.username, data.email, data.password]
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        });
    })
    
app.post("/api/usuarios/login", (req, res) => {

      
        //VALIDACIÓN DE USUARIO
        const { error } = schema.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        jwt.sign({ user: user }, "secretkey", (err, token) => {
            res.json ({
                token,
            });
        });
      });
      
      function verifyToken(req, res, next) {
          const bearerHeader = req.headers['authorization'];
          if (typeof bearerHeader !== 'undefined') {
              const bearerToken = bearerHeader.split(' ')[1]
              req.token = bearerToken
              next()
                } else {
                  res.sendStatus(403)
              } 
      }
};

module.exports = users;