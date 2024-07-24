const ELEMENTO_LINKS = document.querySelector('.links');
const CONTENEDOR_NOMBRES = document.querySelector('.linkNameContainer');
const CONTENEDOR_LINKS = document.querySelector('.linkContainer');
const NOMBRE = document.getElementById('nombreDelLink');
const ENLACE = document.getElementById('linkEnCuestion');
const BOTON_BORRAR = document.querySelector('.borrLink');

const IMAGENES = [
  'img/imagen1.jpg',
  'img/imagen2.jpg',
  'img/imagen3.jpg',
  'img/imagen4.jpg'
];

let contador = 0;

const LINK_NAME_CONTENT = () => {
  let parrafoNombres = document.createElement('p');
  parrafoNombres.classList.add('nombres');
  parrafoNombres.textContent += NOMBRE.value;
  CONTENEDOR_NOMBRES.appendChild(parrafoNombres);
}

const LINK_CONTENT = () => {
  CONTENEDOR_LINKS.innerHTML += `<a href="${ENLACE.value}">${ENLACE.value}</a>`;
}

const GRABAR = () => { 
  let contenido_nombres = CONTENEDOR_NOMBRES.innerHTML;
  let contenido_links = CONTENEDOR_LINKS.innerHTML;
  localStorage.setItem('contenido_nombres', contenido_nombres);
  localStorage.setItem('contenido_links', contenido_links); 
} 

const CARGAR = () => { 
  let valorGuardado1 = localStorage.getItem('contenido_nombres'); 
  let valorGuardado2 = localStorage.getItem('contenido_links'); 
  if(valorGuardado1) { 
      CONTENEDOR_NOMBRES.innerHTML = valorGuardado1; 
  } 
  if(valorGuardado2) { 
      CONTENEDOR_LINKS.innerHTML = valorGuardado2; 
  }
}


BOTON_BORRAR.addEventListener('click', () => {
    const ELEMENTOS_NOMBRES = CONTENEDOR_NOMBRES.querySelectorAll('p');
    if (ELEMENTOS_NOMBRES.length > 0) {
        const ULTIMO_NOMBRE = ELEMENTOS_NOMBRES[ELEMENTOS_NOMBRES.length - 1];
        ULTIMO_NOMBRE.remove();
        GRABAR();
    }
    const ELEMENTOS_LINKS = CONTENEDOR_LINKS.querySelectorAll('a');
    if (ELEMENTOS_LINKS.length > 0) {
        const ULTIMO_LINK = ELEMENTOS_LINKS[ELEMENTOS_LINKS.length - 1];
        ULTIMO_LINK.remove();
        GRABAR();
    }
});

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

CARGAR();