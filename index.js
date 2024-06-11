const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");

// Configuración inicial
const app = express();
const PORT = process.env.PORT || 8080;; // Obtén el puerto del entorno o usa el puerto 8080 por defecto

// Middlewares
app.use(cors({
  origin: 'https://peleteriasanrafael.vercel.app'
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
