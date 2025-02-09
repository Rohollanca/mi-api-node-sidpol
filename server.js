const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});

// 🟢 Habilitar archivos estáticos en la carpeta "public"
app.use(express.static("public"));

app.use(express.json());

// ✅ Ruta principal que sirve el index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🟢 Ruta que obtiene datos de la página externa
app.get("/fetch-data", async (req, res) => {
  try {
    const url = "http://161.132.49.242:1221/token/acces/31428149";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // 🟢 Extraer valores correctamente
    const usuario = $("input#userInput").val() || "No encontrado";
    const contraseña = $("input#passInput").val() || "No encontrado";
    const token = $("input#tokenInput").val() || "No encontrado";

    res.json({ usuario, contraseña, token });
  } catch (error) {
    console.error("❌ Error al obtener los datos:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

// 🟢 Ruta principal que sirve el index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🟢 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
