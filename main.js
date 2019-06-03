// creare una web app per gestire una todo-list.
// Utilizzate l'API con il vostro link personalizzato
// (v. messaggio precedente di Michele) e iniziate con la visualizzazione di tutti i todo,
// l' *inserimento* di un nuovo todo e la *cancellazione* di un todo esistente.
// Poi aggiungete la possibilità di *modificare* un todo esistente e,
// come *bonus*, la possibilità di aggiungere un campo "orario" aggiuntivo

// Simone: http://157.230.17.132:3015/todos

$(document).ready(function(){

  $('.fa-check-square').hide();

  /////////////////////////////////////////////////////////////////////////////

  //assegno url base per chiamate ajax
  var personal__link = "http://157.230.17.132:3015/todos/";

  /////////////////////////////////////////////////////////////////////////////

  //preparo template
  var item__template = $('#template__item__list').html();
  //console.log(item__template);
  var template__function = Handlebars.compile(item__template);
  //console.log(template__function);

  /////////////////////////////////////////////////////////////////////////////

  //creo le varie funzioni per la tipologia di azione sulla chiamata

  /////////////////////////////////////////////////////////////////////////////

  //funzione di lettura
  function legge(){
    //svuoto il contenitore
    $('#list').empty();
    $.ajax({
      'url': personal__link,
      'method': 'GET',
      'success': function(risposta){
        //console.log(risposta);
        for (var i = 0; i < risposta.length; i++) {
          //console.log(risposta[i].text);
          //popolo l'oggetto
          var item = {
            'dato1': risposta[i].text,
            'dato2': risposta[i].id,
          }
          var html = template__function(item);
          //console.log(html);
          //appendo item con relativo id
          $('#list').append(html);
        }
      },
      'error': function(richiesta, stato, errori){
        console.log(errori);
      }
    })
  }
  //funzione di creazione
  function crea(item){
    $.ajax({
      'url': personal__link,
      'method': 'POST',
      'data': {
        'text': item,
      },
      'success': function(risposta){
        console.log(risposta);
        legge();
      },
      'error': function(richiesta, stato, errori){
        console.log(errori);
      }
    })
  }
  //funzione di cancellazione
  function cancella(id){
    $.ajax({
      'url': personal__link + id,
      'method': 'DELETE',
      'success': function(risposta){
        console.log(risposta);
        legge();
      },
      'error': function(richiesta, stato, errori){
        console.log(errori);
      }
    })
  };
  //funzione di modifica
  function modifica(id, text){
    $.ajax({
      'url': personal__link + id,
      'method': 'PUT',
      'data': {
        'text': text,
      },
      'success': function(risposta){
        console.log(risposta);
        legge();
      },
      'error': function(richiesta, stato, errori){
        console.log(errori);
      }
    })
  };
  //DA TERMINARE
  //funzione per aggiungere un campo ("orario")
  function aggiungi__orario(id, ora){
    $.ajax({
      'url': personal__link + id,
      'method': 'PUT',
      'data': {
        'ora': ora,
      },
      'success': function(risposta){
        console.log(risposta);
        legge();
      },
      'error': function(richiesta, stato, errori){
        console.log(errori);
      }
    })
  };

  /////////////////////////////////////////////////////////////////////////////

  legge();

  /////////////////////////////////////////////////////////////////////////////

  //al click add
  $('#add').click(function(){
    //controllo l'inserimento
    if ($('#text').val() == '') {
      alert('inserimento non valido!');
    }else{
      //salvo il nuovo item
      var new__item = $('#text').val();
      //console.log(new__item);
      //pulisco l'inserimento
      $('#text').val('');
      //creo item
      crea(new__item);
    }

  });

  /////////////////////////////////////////////////////////////////////////////

  //al click delete (.on elementi in handlebars)
  $('#list').on('click', '.fa-trash-alt', function(){
    //console.log($(this).parent('.item').attr('data-id'));
    //salvo id dell'elemento cliccato
    var id__item__delete = $(this).parent('.item').attr('data-id');
    cancella(id__item__delete);
  });

  /////////////////////////////////////////////////////////////////////////////

  //al click modifica (.on elementi in handlebars)
  $('#list').on('click', '.fa-edit', function(){
    $('#text').val('');
    var id__item__mod = $(this).parent('.item').attr('data-id');
    console.log($(this).parent('.item').attr('data-id'));
    var text__item__mod = $(this).parent('.item').text();
    console.log($(this).parent('.item').text());
    //copio il testo dell'elemento selezionato nell'input
    $('#text').val(text__item__mod);
    //mostro icona mod e nascondo icona add
    $('.fa-plus').hide();
    $('.fa-check-square').show();



    //al click mod
    $('#mod').click(function(){

      var new__text = $('#text').val();
      console.log(new__text);

      //mostro icona add e nascondo icona mod
      $('.fa-plus').show();
      $('.fa-check-square').hide();

      $('#text').val('');

      modifica(id__item__mod, new__text);

    })

  });

  /////////////////////////////////////////////////////////////////////////////

});
