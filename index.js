const { error } = require("console");
const express = require("express");
const sql = require("mssql");
const { type } = require("os");

const app = express();

//Configuración de la conexión con la base de datos.
const config = {
    server: 'localhost',
    database: 'user_data',
    authentication:{
        type: 'ntlm',
        options: {
            trustedConnection: true
        }
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};


//Middleware para manejar errores de conexión con la base de datos
const dbErrorHandler = (err) => {
    console.log('error de conexión con la base de datos', err);
};


//Conectar a la base de datos
sql.connect(config).then(() => {
    console.log('Conexión exitosa con la base de datos');
}).catch(dbErrorHandler);

//utilizar motor de vistas ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mostrar página registro
app.get("/", function (req, res) {
    res.render("register");
});

//obtener datos del formulario
app.post("/validate", function (req, res) {
    const data = req.body;

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

    let register = "INSERT INTO users (document, first_name, middle_name, first_surname, second_lastname, phone, email, address, age, gender) VALUES ('" + document + "', '" + firstName + "', '" + middleName + "', '" + firstSurName + "', '" + secondLastName + "', '" + phone + "', '" + email + "', '" + address + "', '" + age + "','" + generated + "')";

    new sql.Request().query(register).then(result => {
        console.log('Datos almacenados correctamente');
        res.json(result.recordset);
    }).catch(err => {
        console.error('Error al ejecutar la consulta', err);
    });
});


//Creación servidor local
app.listen(3030, function () {
    console.log("Servidor creado http://localhost:3030")
});