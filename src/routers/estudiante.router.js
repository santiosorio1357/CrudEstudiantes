const express = require('express');
const { getDocuments, insertDocument, deleteDocumentById, updateDocumentById, getDocumentsWithFilter }=require('../controllers/mongo')
const router = express.Router();
// Obtener todos los estudiantes
router.get('/estudiantes', async (req, res) => {
    const datos=await getDocuments("estudiantes");
    res.send({
        data:datos,
        message:"successfully",
        status:200
    })
});

// Crear un nuevo estudiante
router.post('/estudiantes', async (req, res) => {
    const nuevoEstudiante = req.body;
    const response=await insertDocument("estudiantes",nuevoEstudiante)
    res.send({
        info:response,
        data:nuevoEstudiante,
        message:"successfully",
        status:200
    })
});

// Obtener un estudiante por su ID
router.get('/estudiantes/:id', async (req, res) => {
    const cedula = req.params.id
    const response=await getDocumentsWithFilter("estudiantes",{cedula})
    res.send({
        data:response,
        message:"successfully",
        status:200
    })
});
 
// Actualizar un estudiante por su ID
router.put('/estudiantes/:id', async (req, res) => {
    const id=req.params.id
    const data=req.body
    const response=await updateDocumentById("estudiantes",{id,data})
    res.send({
        data:response,
        message:"successfully",
        status:200
    })
});

// Eliminar un estudiante por su ID
router.delete('/estudiantes/:id', async(req, res) => {
    let cedula = req.params.id  
    const response=await deleteDocumentById("estudiantes",cedula)
    res.send({
        data:response,
        message:"successfully",
        status:200
    })
});
module.exports={router}