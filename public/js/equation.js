/*document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnCalculate").addEventListener("click", calculateEquation);
});*/
function calculateEquation() {

    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let c = parseFloat(document.getElementById("c").value);

    if (!isNaN(a) && !isNaN(b) && isNaN(c)) {
        //calcular valor de C
        let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        document.getElementById("result").innerText = "El valor de C es: " + c;
    } else if (!isNaN(a) && !isNaN(c) && isNaN(b)) {
        //calcular valor de b
        let b = Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2));
        document.getElementById("result").innerText = "El valor de B es: " + b;
    } else if (!isNaN(b) && !isNaN(c) && isNaN(a)) {
        //calcular valor de a
        let a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));
        document.getElementById("result").innerText = "El valor de A es: " + a;
    } else {
        document.getElementById("result").innerText = "Por favor, ingresar dos valores para resolver el tercero."
    }
}