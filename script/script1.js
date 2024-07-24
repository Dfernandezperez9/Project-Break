const ELEMENTO_RELOJ = document.querySelector('.reloj');
const IMAGENES = [
  'img/imagen1.jpg',
  'img/imagen2.jpg',
  'img/imagen3.jpg',
  'img/imagen4.jpg'
];

let contador = 0;

const RELOJ = () => {
  const ACTUAL = new Date();
  const HORAS = ACTUAL.getHours().toString().padStart(2, '0');
  const MINUTOS = ACTUAL.getMinutes().toString().padStart(2, '0');
  const SEGUNDOS = ACTUAL.getSeconds().toString().padStart(2, '0');
  const FECHA = ACTUAL.toLocaleDateString();

  
  ELEMENTO_RELOJ.textContent = `${HORAS}:${MINUTOS}:${SEGUNDOS} - ${FECHA}`;
}

RELOJ();
setInterval(RELOJ, 1000);

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