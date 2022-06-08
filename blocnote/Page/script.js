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
            Id:${data.rows[i].id}</br>
            Titulo: ${data.rows[i].title}</br>
            Texto: ${data.rows[i].text} </br>
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