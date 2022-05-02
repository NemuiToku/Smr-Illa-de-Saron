const sqlite3 = require('sqlite3').verbose();
const users = app =>{
var db          = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

    db.run('CREATE TABLE IF NOT EXISTS usuarios( \
    user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    last_name NVARCHAR(20),\
    first_name NVARCHAR(20) NOT NULL,\
    username TEXT NOT NULL,\
    email TEXT NOT NULL UNIQUE,\
    password TEXT NOT NULL\
    )')
    }
});

app.get("/api/usuarios", (req, res, next) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({rows});
      });
});

app.get("/api/usuarios/:id", (req, res, next) => {
    var sql = "SELECT * FROM usuarios WHERE user_id = ?"
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

app.post("/api/usuarios/", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No especificaste una contraseña");
    }
    if (!req.body.email){
        errors.push("No especificaste un Correo");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password : req.body.password,
        username : req.body.username
    }
    var sql ='INSERT INTO usuarios (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)'
    var params =[data.first_name, data.last_name, data.username, data.email, data.password]
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

app.patch("/api/usuarios/:id", (req, res, next) => {
    var data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password : req.body.password,
        username : req.body.username
    }
    db.run(
        `UPDATE usuarios set 
          first_name = COALESCE(?,first_name), 
          last_name = COALESCE(?,last_name), 
          email = COALESCE(?,email), 
          password = COALESCE(?,password),
          username = COALESCE(?,username)
           WHERE user_id = ?`,
           [data.first_name, data.last_name, data.email, data.password, data.username, req.params.id],
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
        'DELETE FROM usuarios WHERE user_id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})
}

module.exports = users;