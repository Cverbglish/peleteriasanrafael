/*const express = require("express");
const morgan = require ("morgan");
const database = require("./database");
const cors = require("cors")

//Configuración inicial
const app = express();
app.set("port",8080);
app.listen(app.get("port"));
console.log("Escuchando comunicaciones al puerto "+app.get("port"));

//Middlewares
app.use(cors({
  origin: ["http://127.0.0.1:5501","http://127.0.0.1:5500"]
}))
app.use(morgan("dev"))
app.use(express.json())


//Rutas
app.get("/productos", async (req,res) =>{
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * from inventario");
  res.json(result)
})*/

const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");

// Configuración inicial
const app = express();
const PORT = 8080; // Obtén el puerto del entorno o usa el puerto 8080 por defecto

// Middlewares
app.use(cors({
  origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500"]
}));
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.get("/productos", async (req, res) => {
  try {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * from inventario");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
