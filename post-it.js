var Board = function( selector ) {
  // Aqui denerá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $elem = $( selector );
  
  function initialize() {
    $elem.on('dblclick', function(e){

      var x = (e.pageX-190) + 'px';
      var y = e.pageY + 'px';
      var div = $('<div id="master" class="post-it"><div class="header"><div class="close"><strong>X</strong></div></div><div class="content" contenteditable="true" onclick="$(this).focus();" >...</div>').css({                 
            "left": x,
            "top": y
        });

      $(this).append(div);   
      PostIt();
    });
  };

  initialize();

};

var PostIt = function() {

      var $x = $( "strong" )  
      $x.on('click', function(e){
       e.preventDefault();
       $(this).parents('.post-it').remove();
      });

      $( ".post-it" ).draggable({
        stack: ".post-it"
      });
      $(".post-it").dblclick( function(e) {
        return false
      });

 // Aquí va el código relacionado con un post-it
};


$(function() {
  
  // Esta es la fucnión que correrá cuando este listo el DOM 
   
  $( '#new' ).on( 'click', function(e){
  
    var name = prompt("Please enter the board name");
    if(name.length != 0) {
      $( 'nav ul li' ).removeClass('active');
      $( 'div' ).removeClass('ui-front');
      $( 'body' ).append('<div id="' + name + '" class="board ui-front"> </div>');
      new Board( '.ui-front' );
      $( 'nav ul' ).append('<li class="active"><div>' + name + '</div></li>');

      $( 'li' ).on( 'click', function(e){
        if($(this).hasClass('active')){
          return false
        } else {
          $('.board').removeClass('ui-front');
          $( 'ul li' ).removeClass('active');
          $(this).addClass('active');
          var text = $(this).text();
          var brd = document.getElementById(text);
          $(brd).addClass('ui-front');
        } 
      }); 
    } else {
      alert("Please enter a valid name");
    }
  });
 
});

