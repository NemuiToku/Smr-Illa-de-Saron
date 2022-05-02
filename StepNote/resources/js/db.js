
//var connection = new JsStore.Connection(new Worker('jsstore.worker.js'));
var connection = new JsStore.Connection();

// CREAR Y CONECTARSE A LA DB
function createDB(){
    var Notes = {
        name: 'Notes',
        columns: {
         id:{ primaryKey: true, autoIncrement: true },
         titulo:  { notNull: true, dataType: "string" },
         texto:  { notNull: true, dataType: "string" }
        }
    };
    var database = {
        name: 'StepNote',
        tables: [Notes]
    }

    async function checkdb(){    readDB();
        //console.log(document.getElementById('sqlupload').value)
        await connection.initDb(database);
    }
    checkdb();
    if(checkdb === true){
        console.log("Base de Datos Creada");
        // here you can prefill database with some data
    }
    else {
        console.log("Base de Datos Online");
    }
}
createDB();
connection.openDb('StepNote');

// GUARDAR EN LA DB
async function DbSave(){

    let title = document.getElementById('titleholder').value;
    let textcontent = document.getElementById('texto').value;

    var value = {
        titulo: title,
        texto: textcontent
    }
    
    var insertCount = await connection.insert({
        into: 'Notes',
        values: [value]
    });
    
    console.log(`${insertCount} rows inserted`);

};

// LISTAR NOTAS EN LA DB
async function listDB(){
var results = await connection.select({
    from: 'Notes',
});


alert(JSON.stringify(results));
console.log(results)
}

// LEER NOTAS EN LA DB
async function readDB(){
var idread = document.getElementById('sqlupload').valueAsNumber
var results = await connection.select({
    from: 'Notes',
    where: {
        'id':idread
    }
});

let resultado = JSON.stringify(results);
let obj = JSON.parse(resultado);
document.getElementById('titleholder').value = obj[0].titulo
document.getElementById('texto').value = obj[0].texto   
}