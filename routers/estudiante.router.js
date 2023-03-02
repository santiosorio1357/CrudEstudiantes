const express = require('express');
const { getDocuments, insertDocument, deleteDocumentById, updateDocumentById, getDocumentsWithFilter }=require('../controllers/mongo')
const router = express.Router();
// Obtener todos los estudiantes
router.get('/estudiantes', async (req, res) => {
    const datos=await getDocuments("estudiantes");
    res.json(datos);
});

// Crear un nuevo estudiante
router.post('/estudiantes', async (req, res) => {
    const nuevoEstudiante = req.body;
    const response=await insertDocument("estudiantes",nuevoEstudiante)
    res.json(response)
});

// Obtener un estudiante por su ID
router.get('/estudiantes/:id', async (req, res) => {
    const cedula = req.params.id

    const response=await getDocumentsWithFilter("estudiantes",{cedula})
    res.json(response)
});

// Actualizar un estudiante por su ID
router.put('/estudiantes/:id', async (req, res) => {
    const id=req.params.id
    const data=req.body
    const response=await updateDocumentById("estudiantes",{id,data})
    res.json(response)
});

// Eliminar un estudiante por su ID
router.delete('/estudiantes/:id', async(req, res) => {
    const cedula = req.params.id

    const response=await deleteDocumentById("estudiantes",cedula)
    res.json(response)
});
module.exports={router}