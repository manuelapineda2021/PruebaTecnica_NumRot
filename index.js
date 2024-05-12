const express = require("express");
const sql = require("mssql");
const path = require("path");

const app = express();

//Almacenar registro de personas
let peoples = [];

//utilizar motor de vistas ejs
app.set("view engine", "ejs");
//configuración para servir archivos estáticos
app.use(express.static('public'));


//Configuración de la conexión con la base de datos.
const config = {
    server: 'DESKTOP-0BBKCU4',
    authentication: {
        type: 'default',
        options: {
            userName: "pruebatecnica",
            password: "Campanita123+-"
        }
    },
    options: {
        port: 1433,
        database: 'user_data',
        trustServerCertificate: true
    }
}

//Conectar a la base de datos
sql.connect(config).then(() => {
    console.log('Conexión exitosa con la base de datos');
}).catch(err => {
    console.log('error de conexión con la base de datos', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mostrar página registro
app.get("/", function (req, res) {
    res.render("register");
});

//obtener datos del formulario
app.post("/register", (req, res) => {
    const data = req.body; //obtener datos

    //guardar datos
    let document = data.document;
    let firstName = data.firstName;
    let middleName = data.middleName;
    let firstSurName = data.firstName;
    let secondLastName = data.secondLastName;
    let phone = data.phone;
    let email = data.email;
    let address = data.address;
    let age = data.age;
    let generated = data.generated;

    let search = "SELECT * FROM users WHERE document = " + document + "";

    new sql.Request().query(search).then(result => {
        if (result.length > 0) {
            console.log("No se puede registrar. Usuario ya existente");
        } else {
            let register = "INSERT INTO users (document, first_name, middle_name, first_surname, second_lastname, phone, email, address, age, gender) VALUES ('" + document + "', '" + firstName + "', '" + middleName + "', '" + firstSurName + "', '" + secondLastName + "', '" + phone + "', '" + email + "', '" + address + "', '" + age + "','" + generated + "')";

            new sql.Request().query(register).then(result => {
                console.log('Datos almacenados correctamente');
                res.json(result.recordset);
            }).catch(err => {
                console.error('Error al ejecutar la consulta', err);
            });
        }
    }).catch(err =>{
        console.error('Error', err)
    })
});

//Ruta consultar el nombre completo de todas las personas
app.get('/consult-names', (req,res) =>{
    //console.log('consultando nombres completos');
    const fullNames = peoples.map(people => `${people.firstName} ${people.middleName ? people.middleName + '' : ''}${people.firstSurName} ${people.secondLastName ? people.secondLastName: ''}`);
    res.send(fullNames);
});

//Ruta consultar cuántas mujeres hay
app.get('/number-women', (req,res) =>{
    const womens = peoples.filter(people => people.generated === 'Femenino');
    res.send({amount: womens.length});
});

//Ruta consultar cuántos hombres hay
app.get('/number-man', (req,res) =>{
    const man = peoples.filter(people => people.generated == 'Masculino');
    res.send({amount: man.length});
})

//Ruta consultar nombre completo persona con mayor edad
app.get('/older-age', (req,res) =>{
    const olderAge = peoples.reduce((prev, current) => (prev.age > current.age) ? prev : current);
    res.send(`${olderAge.firstName}  ${olderAge.middleName ? olderAge.middleName + '' : ''}${olderAge.firstSurName} ${olderAge.secondLastName ? olderAge.secondLastName: ''}`);
});

//Ruta consultar promedio de edad
app.get('/average-age', (req,res) =>{
    const totalAge = peoples.reduce((prev, current) => prev + current.age, 0);
    const average = totalAge / peoples.length;
    res.send({average: average});
});

//Creación servidor local
app.listen(3030, function () {
    console.log("Servidor creado http://localhost:3030")
});