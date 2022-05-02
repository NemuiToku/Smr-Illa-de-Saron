$( document ).change(function(){
  console.log('document change')
  var dbcheck = document.getElementById('sqlupload').value == 0
  if (dbcheck === true) {
    clearFile();
  }
})

// Borrar el Texto al Inicio de la Aplicación
$( document ).ready(function() {
  console.log('document ready')
    $('titleholder').val('');
    $('textarea').val('');
    document.getElementById('sqlupload').value = ''

    $('#logo').click(function(){
      if ($(window).width() <= 890) {
      $('div#topbuttons').slideToggle(1000);
      }
    });
    
    $(window).resize(function(){
    if ($(window).width() >=891 ) {
      $('div#topbuttons').slideDown(0)
    } 
  })
});


// Habilitar Tabuladores en el textarea
const textarea = document.getElementById('texto')
textarea.addEventListener('keydown', (e) => {
  if (e.keyCode === 9) {
    e.preventDefault()

    textarea.setRangeText(
      '  ',
      textarea.selectionStart,
      textarea.selectionStart,
      'end'
    )
  }
})

// Permitir el Borrado del Bloc
function clearFile(){
    $('titleholder').val('');
    $('textarea').val('');
    
};

// Contador de Caracteres
function countChars(obj){
  document.getElementById("CharCount").innerHTML = obj.value.length+' Caracteres';
};

// Guardar el Archivo
function guardararchivo(){
    var title = document.getElementById('titleholder').value
    var textcontent = document.getElementById('texto').value

    var file = new File([textcontent], {type: "text/plain;charset=utf-8"});
    saveAs(file, title+'.txt');
    };

// Cargar Archivos desde Local
function readFile(input) {
  let file = input.files[0]; 
  let fileReader = new FileReader(); 
  fileReader.readAsText(file); 
  fileReader.onload = function() {
    $('textarea').val(fileReader.result);
    var title = `${file.name}`
    var cutext = title.replace(/\.[^/.]+$/, "")
    document.getElementById('titleholder').value = cutext
  }; 
  fileReader.onerror = function() {
    alert(fileReader.error);
  };
}

