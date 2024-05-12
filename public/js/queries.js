function consultFullNames() {
    fetch('/consult-names').then(response => response.json()).then(data => {
        document.getElementById('fullNames').innerHTML = data.join('<br>');
    }).catch(err => console.error('Error al consultar nombres:', err));
}

function consultNumberWomen() {
    fetch('/number-women').then(response => response.json()).then(data =>{
        document.getElementById('numberWomen').innerHTML = 'Cantidad de mujeres:' + data.amount;
    }).catch(err => console.error('Error al consultar cantidad de mujeres', err));
}

function consultNumberMan() {
    fetch('/number-man').then(response => response.json()).then(data =>{
        document.getElementById('numberMan').innerHTML = 'Cantidad de hombres:' + data.amount;
    }).catch(err => console.error('Error al consultar cantidad de hombres', err));

}

function consultOlderAge() {
    fetch('/older-age').then(response => response.text()).then(data=>{
        document.getElementById('olderAge').innerHTML = 'Persona con mayor edad: ' + data;
    }).catch(err => console.error('Error al consultar la persona con mayor edad', err))
}

function consultAverageAge() {
    fetch('/average-age').then(response => response.json()).then(data => {
        document.getElementById('averageAge').innerHTML = 'Promedio de edad: ' + data.average;
    }).catch(err => console.error('Error al consultar el promedio de edad', err))
}