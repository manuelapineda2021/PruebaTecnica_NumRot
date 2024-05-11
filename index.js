const express = require("express");
const sql = require("mssql");
const path = require("path");

const app = express();


//utilizar motor de vistas ejs
app.set("view engine", "ejs");
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
app.post("/register", function (req, res) {
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

//Creación servidor local
app.listen(3030, function () {
    console.log("Servidor creado http://localhost:3030")
});