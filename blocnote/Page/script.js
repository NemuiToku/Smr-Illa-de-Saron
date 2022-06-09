$(document).ready(() => {
    document.getElementById("title").value = ""
    document.getElementById("note").value = ""

    var url = "http://localhost:4002/tables/IDs"
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
    }).then((res) => res.json())
    .then(data => {

        for (i = 0; i < Object.keys(data.rows).length; i++){
            console.log(i)
            $('#sidebar').append(`<div id="card${[i]}"style="margin-top: 10px;" class='card'></div>`)  
        
        }    
        
    }
 )

  var url = "http://localhost:4002/tables/" 
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
    }).then((res) => res.json())
    .then(data => {
        for (i = 0; i < 100; i++){
            $('#card'+i).append(`
            <div class="row">
                <div id="cardtext" class="col-9 d-flex align-items-center">
                    <p style="
                    margin: 7 0 0 0px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 200px;"
                    >
                    Id: ${data.rows[i].id}</br>
                    Titulo: ${data.rows[i].title}</br>
                    Texto: ${data.rows[i].text} </br>
                    </p>
                </div>
                <div id="buttons" class="col btn-group-vertical">
                    <button id="${[i+1]}" onClick="load_click(this.id)" class="btn btn-primary btn-sm" type="button">
                        <span class="material-symbols-outlined">
                            upload_file
                        </span>
                    </button>
                    <button id="${[i+1]}" onClick="edit_click(this.id)" class="btn btn-primary btn-sm" type="button">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                    <button id="${[i+1]}" onClick="delete_click(this.id)"class="btn btn-primary btn-sm" type="button">
                        <span class="material-symbols-outlined">
                            delete_forever
                        </span>
                    </button>
                </div>
            </div>
            `)
        }
        
    })
   })

$("#new").click(() => {
    document.getElementById("title").value = ""
    document.getElementById("note").value = ""
    
});

$("#SaveSQL").click(() => {
    var data = ({
        "title": document.getElementById("title").value,
        "text":  document.getElementById("note").value
    })

    fetch("http://localhost:4002/tables", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },

    body: JSON.stringify(data)
})
.then(
    $("#alerts").append('<div class="alert alert-success alert-dismissible fade show m-2"><strong>Success!</strong> - Note saved correctly  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
)
var url = "http://localhost:4002/tables/IDs"
fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
      },
}).then((res) => res.json())
.then(data => {    
    var i = Object.keys(data.rows).length
        console.log(i)
        $('#sidebar').append(`<div id="card${[i]}"style="margin-top: 10px;" class='card'>
            Id:${i}</br>
            Titulo: ${document.getElementById('title').value}</br>
            Texto: ${document.getElementById('note').value} </br>
            </div>`)
    
}
)

        });

$("#LoadSQL").click(() =>{
    var ID = document.getElementById("noteID").value
    console.log(ID)
    var url = "http://localhost:4002/tables/" + ID  
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          }
})
.then((res) => res.json())
    .then((data) => {
        var titulo = data.row.title
        var texto = data.row.text

        document.getElementById("title").value = titulo
        document.getElementById("note").value = texto
    })
})

$("#DeleteSQL").click(() =>{
    var ID = document.getElementById("noteID").value
    console.log(ID)
    var url = "http://localhost:4002/tables/" + ID  
    fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          }
})
.then((res) => res.json())
.then((data) => {
        console.log(data)
})
.then(
    $("#alerts").append('<div class="alert alert-danger alert-dismissible fade show m-2"><strong>Success!</strong> - Note deleted correctly, please reload the page  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
)
})

$("#UpdateSQL").click(() =>{

    var data = ({
        "title": document.getElementById("title").value,
        "text":  document.getElementById("note").value,
        "id": document.getElementById("noteID").value
    })

    var url = "http://localhost:4002/tables/" 
    fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },

    body: JSON.stringify(data)
}).then(
    $("#alerts").append('<div class="alert alert-warning alert-dismissible fade show m-2"><strong>Success!</strong> - Note updated correctly  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
)
})


function load_click(clicked) {
    var ID = clicked
    console.log(ID)
    var url = "http://localhost:4002/tables/" + ID  
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
}}).then((res) => res.json())
.then((data) => {
    var titulo = data.row.title
    var texto = data.row.text

    document.getElementById("title").value = titulo
    document.getElementById("note").value = texto
})
}

function edit_click(clicked) {
var data = ({
    "title": document.getElementById("title").value,
    "text":  document.getElementById("note").value,
    "id": clicked
})

var url = "http://localhost:4002/tables/" 
fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
      },

body: JSON.stringify(data)
}).then(
$("#alerts").append('<div class="alert alert-warning alert-dismissible fade show m-2"><strong>Success!</strong> - Note updated correctly  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
)
}

function delete_click(clicked) {
    var ID = clicked
    console.log(ID)
    var url = "http://localhost:4002/tables/" + ID  
    fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          }
})
.then((res) => res.json())
.then((data) => {
        console.log(data)
})
.then(
    $("#alerts").append('<div class="alert alert-danger alert-dismissible fade show m-2"><strong>Success!</strong> - Note deleted correctly, please reload the page  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
)
}
