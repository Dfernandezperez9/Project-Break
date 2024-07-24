const ELEMENTO_RELOJ = document.querySelector('.reloj');
const ELEMENTO_TIEMPO = document.querySelector('.tiempo');
const ELEMENTO_PAIS_Y_CIUDAD = document.querySelector('.paisYciudad');
const ELEMENTO_INFORMACION_GENERAL = document.querySelector('.informacionGeneralTiempo');
const ELEMENTO_PREVISIONES = document.querySelector('.previsiones');
const ELEMENTO_PASSWORD = document.querySelector('.password');
const INPUT_LIMITE = document.getElementById('inputLimite');
const CONTENEDOR_PASSWORD = document.querySelector('.passContainer');
const ELEMENTO_LINKS = document.querySelector('.links');
const BOTON = document.querySelector('.passGenerator');
const CONTENEDOR_NOMBRES = document.querySelector('.linkNameContainer');
const CONTENEDOR_LINKS = document.querySelector('.linkContainer');
const NOMBRE = document.getElementById('nombreDelLink');
const ENLACE = document.getElementById('linkEnCuestion');
const BOTON_BORRAR = document.querySelector('.borrLink');

const APIKEY = 'c9ed4bca86b54f4788f125821241507';
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


const OBTENER_DATOS_CLIMA = async () => {
    try {
        const RESPUESTA = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=Asturias,Spain&days=1&aqi=no&alerts=no`);
        const DATA = await RESPUESTA.json();
        console.log(DATA)

        const PAIS = DATA.location.country;
        const CIUDAD = DATA.location.name;
        const TIEMPO_ACTUAL = DATA.current.condition.text;
        const TEMPERATURA_CELSIUS = DATA.current.temp_c;
        const PRECIPITACIONES = DATA.current.precip_mm;
        const HUMEDAD = DATA.current.humidity;
        const VIENTO = DATA.current.wind_kph;
        const PREVISIONES = DATA.forecast.forecastday[0].hour.slice(0, 12);

        console.log(PREVISIONES);

        const PLANTILLA = `Actualmente el clima es ${TIEMPO_ACTUAL}, con una temperatura de ${TEMPERATURA_CELSIUS} grados. Las precipitaciones son de ${PRECIPITACIONES}mm, la humedad es de ${HUMEDAD}% y la velocidad del viento es de ${VIENTO} km/h.`;
        const PLANTILLA_PREVISIONES = `${PREVISIONES[0].time} // ${PREVISIONES[1].time} // ${PREVISIONES[2].time} // ${PREVISIONES[3].time} // ${PREVISIONES[4].time} // ${PREVISIONES[5].time} // ${PREVISIONES[6].time} // ${PREVISIONES[7].time} // ${PREVISIONES[8].time} // ${PREVISIONES[9].time} // ${PREVISIONES[10].time} // ${PREVISIONES[11].time}`
        const PLANTILLA_PREVISIONES2 = `${PREVISIONES[0].temp_c}grados ${PREVISIONES[1].temp_c}grados ${PREVISIONES[2].temp_c}grados ${PREVISIONES[3].temp_c}grados ${PREVISIONES[4].temp_c}grados ${PREVISIONES[5].temp_c}grados ${PREVISIONES[6].temp_c}grados ${PREVISIONES[7].temp_c}grados ${PREVISIONES[8].temp_c}grados ${PREVISIONES[9].temp_c}grados ${PREVISIONES[10].temp_c}grados ${PREVISIONES[11].temp_c}grados`

        ELEMENTO_PAIS_Y_CIUDAD.textContent = `En ${CIUDAD}, ${PAIS}.`;
        ELEMENTO_INFORMACION_GENERAL.textContent = PLANTILLA;

        let parrafo1 = document.createElement('p');
        parrafo1.classList.add('previsionesParrafo1');
        let parrafo2 = document.createElement('p');
        parrafo2.classList.add('previsionesParrafo2');
        parrafo1.textContent = PLANTILLA_PREVISIONES;
        parrafo2.textContent = PLANTILLA_PREVISIONES2;
        ELEMENTO_PREVISIONES.appendChild(parrafo1);
        ELEMENTO_PREVISIONES.appendChild(parrafo2);

    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
    }
};

OBTENER_DATOS_CLIMA();

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