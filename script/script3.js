const ELEMENTO_PASSWORD = document.querySelector('.password');
const INPUT_LIMITE = document.getElementById('inputLimite');
const CONTENEDOR_PASSWORD = document.querySelector('.passContainer');
const BOTON = document.querySelector('.passGenerator');

const IMAGENES = [
  'img/imagen1.jpg',
  'img/imagen2.jpg',
  'img/imagen3.jpg',
  'img/imagen4.jpg'
];

let contador = 0;

const GENERADOR_PASSWORD = () => {
  const CARACTERES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  const LARGO = INPUT_LIMITE.value
  let password = '';

  for (let i = 0; i < LARGO; i++) {
    const INDICE = Math.floor(Math.random() * CARACTERES.length);
    password += CARACTERES.charAt(INDICE);
  }

  CONTENEDOR_PASSWORD.textContent = password;
}

BOTON.addEventListener('click', GENERADOR_PASSWORD);

const CAMBIAR_FONDO = () => {
  const BODY = document.body;
  BODY.style.backgroundImage = `url(${IMAGENES[contador]})`;
  contador = (contador + 1) % IMAGENES.length;
  if(contador === 4) {
    contador = 0;
  }
}

CAMBIAR_FONDO();
setInterval(CAMBIAR_FONDO, 8000);