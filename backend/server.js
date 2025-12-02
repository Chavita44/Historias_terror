const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// AGREGAR HISTORIA
// =====================
app.post("/agregar", async (req, res) => {
    try {
        const { titulo, contenido } = req.body;
        const nueva = await pool.query(
            "INSERT INTO historias (titulo, contenido) VALUES ($1, $2) RETURNING *",
            [titulo, contenido]
        );

        res.json(nueva.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================
// VER / BUSCAR HISTORIAS
// =====================
app.get("/historias", async (req, res) => {
    try {
        const { q } = req.query;

        let result;

        if (q) {
            result = await pool.query(
                "SELECT * FROM historias WHERE titulo ILIKE $1 OR contenido ILIKE $1 ORDER BY fecha DESC",
                [`%${q}%`]
            );
        } else {
            result = await pool.query(
                "SELECT * FROM historias ORDER BY fecha DESC"
            );
        }

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================
// ELIMINAR HISTORIA
// =====================
app.delete("/eliminar/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM historias WHERE id = $1", [id]);

        res.json({ mensaje: "Historia eliminada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
