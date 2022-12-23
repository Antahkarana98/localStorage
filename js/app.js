//variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//eventos
eventListeners();

function eventListeners(){
  formulario.addEventListener('submit', agregarTweet);

  // Contenido cargado
  document.addEventListener('DOMContentLoaded',() => {
      tweets = JSON.parse(localStorage.getItem('tweets')) || [];
      tweetHTML();
  });

}

//funciones

function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector('#tweet').value;

  if(tweet === ''){
    mostrarError('El tweet no se puede enviar vacio');
    return;
  }

  //agregando los tweets al arreglo

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  tweets = [...tweets, tweetObj];

  //creanar el html de los tweets

  tweetHTML();

  //resetear el formulario una vez se crea
  formulario.reset();
}

function mostrarError(error) {
  const alerta = document.createElement('p');
  const contenido = document.querySelector('#contenido');

  //agregando contenido
  alerta.textContent = error;
  alerta.classList.add('error');

  // insertar el contenido
  contenido.appendChild(alerta);

  //que se elimine despues de 2seg
  setTimeout(() => {
    alerta.remove();
  }, 2000);
}

function tweetHTML(){

  limpiarHTML();

  if(tweets.length > 0 ) {
    limpiarHTML();
    tweets.forEach( tweet =>  {
         // crear boton de eliminar
      const botonBorrar = document.createElement('a');
      botonBorrar.classList.add('borrar-tweet');
      botonBorrar.textContent = 'X';

      botonBorrar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // Crear elemento y añadirle el contenido a la lista
      const li = document.createElement('li');

      // Añade el texto
      li.textContent = tweet.tweet;

      // añade el botón de borrar al tweet
      li.appendChild(botonBorrar);

      // añade el tweet a la lista
      listaTweets.appendChild(li);
    //guardarlos en el local storage
    });
  }
  sincronizarStorage();
}

function sincronizarStorage(){
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id);
  tweetHTML();
}

function limpiarHTML(id) {
  while(listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
