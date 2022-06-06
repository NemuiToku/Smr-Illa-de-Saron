const sqlite3 = require('sqlite3').verbose();
const DBApi = async app =>{
    
    var db = new sqlite3.Database('./database.sqlite', (err) => {
        if (err) {
            console.error("Error opening database " + err.message);
        } else {
        db.run('CREATE TABLE IF NOT EXISTS notes( \
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
        title TEXT NOT NULL,\
        text TEXT NOT NULL\
        )')
        }
    });

    app.get("/tables", (req, res, err) => {
                db.all("SELECT * FROM notes", [], (err, rows) => {
                    if (err) {
                      res.status(400).json({"error":err.message});
                      return;
                    }
                    res.status(200).json({rows});
                  });
        });

    app.get("/tables/:id", async (req, res, next) => {
        var sql = "SELECT * FROM notes WHERE id = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                row
            })
          });
    });

    app.post("/tables", async (req, res, next) => {

            var data = {
                title: req.body.title,
                text: req.body.text
            }

            var sql ='INSERT INTO notes (title, text) VALUES (?,?)'
            var params =[data.title, data.text]
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

        app.delete("/tables/:id", async (req, res, next) => {
            db.run(
                'DELETE FROM notes WHERE id = ?',
                req.params.id,
                function (err, result) {
                    if (err){
                        res.status(400).json({"error": res.message})
                        return;
                    }
                    res.json({"message":"deleted", changes: this.changes})
            });
        })

        app.patch("/api/tables/:id", async (req, res, next) => {
            var data = {
                title: req.body.title,
                text : req.body.text
            }
            
            db.run(
                `UPDATE usuarios set 
                  title = COALESCE(?,title), 
                  text = COALESCE(?,text),
                   WHERE id = ?`,
                   [data.title, data.text, req.body.id],

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
};




module.exports = DBApi;