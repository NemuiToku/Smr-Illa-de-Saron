$(document).ready(() => {
    document.getElementById("title").value = ""
    document.getElementById("note").value = ""

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
    $("#alerts").append('<div class="alert alert-danger alert-dismissible fade show m-2"><strong>Success!</strong> - Note deleted correctly  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
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
})
})