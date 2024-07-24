const ELEMENTO_TIEMPO = document.querySelector('.tiempo');
const ELEMENTO_PAIS_Y_CIUDAD = document.querySelector('.paisYciudad');
const ELEMENTO_INFORMACION_GENERAL = document.querySelector('.informacionGeneralTiempo');
const ELEMENTO_PREVISIONES = document.querySelector('.previsiones');

const APIKEY = 'c9ed4bca86b54f4788f125821241507';
const IMAGENES = [
  'img/imagen1.jpg',
  'img/imagen2.jpg',
  'img/imagen3.jpg',
  'img/imagen4.jpg'
];

let contador = 0;

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