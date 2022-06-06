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
.then(data => JSON.parse(data),
    document.getElementById("title").value = data.title,
    document.getElementById("note").value = data.text
)
})