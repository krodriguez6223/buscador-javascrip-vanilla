//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//variable para mostrar todos los autos por defectos
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max-10;

//Generar un objeto con la bsuqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);//muestra los automoviles
    //llena selec de años
    llenarSelect();
});
//Eventos para los select de busqueda
marca.addEventListener('change', e =>{
    console.log(e.target.value)
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});
minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

//Funciones
function mostrarAutos(autos){
    
    limiparHTML();    ;
    autos.forEach( auto => {
        const { marca, modelo, year, precio, color, transmision, puertas } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = 
        `
            MARCA:${marca} - 
            MODELO:${modelo} -
            AÑO:${year} - 
            PRECIO:${precio} -
            PUERTAS - ${puertas} -
            COLOR: ${color} - 
            TRANSMISION: ${transmision}
        `;
        //inssertar en el HTML
       
        resultado.appendChild(autoHTML)
    })
}
//limpiar htlm
function limiparHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}
//Funcion para llenar el select con  los años
function llenarSelect(){
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // agrega las opciones de años al select

    }
}

//funcion para filtrar autos en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca )
                            .filter( filtrarYear )
                            .filter( filtrarMinimo )
                            .filter( filtrarMaximo )
                            .filter( filtrarPuertas )
                            .filter( filtrarTransmision )
                            .filter( filtrarColor );

    if(resultado.length){
        mostrarAutos(resultado);

    }else{
        noResultado();
    }   
    
}
//muestra mensaje cuando no encunetra coincidencias en la bsuqeda
function noResultado() {
    limiparHTML();
    const mensaje = document.createElement('p');
        mensaje.textContent = "no se encontraron resultados";
        resultado.appendChild(mensaje);
}
//fucntion para filtrar autos por año
function filtrarMarca(auto){
       const { marca } = datosBusqueda;
   
    if (marca) {
       return auto.marca === marca;
    }
    return auto;
}
//fucntion para filtrar autos por año
function filtrarYear(auto){
       const { year } = datosBusqueda;
   
    if (year) {
       return auto.year === year;
    }
    return auto;
}
//function filtrar minimo
function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if( minimo ){
        return auto.precio >= minimo
    }
    return auto;
}
//function filtrar maximo
function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo
    }
    return auto;
}
//function filtrar maximo
function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === puertas
    }
    return auto;
}
//function filtrar por transmision
function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision
    }
    return auto;
}
//function filtrar color
function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if( color ){
        return auto.color === color
    }
    return auto;
}
