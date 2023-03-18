const axios = require('axios');
const URL = "http://localhost:8000/estudiantes"
describe('API endpoint /estudiantes', () => {
  // Prueba para actualizar un estudiante
  test('PUT /estudiantes/:id should update a student', async () => {
    // Arrange
    const updatedStudent = { nombre: 'María', apellido: 'González', cedula: '87654321', carrera: 'sistemas' };
    const expectedStudent = {
      "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
      },
      "message": "successfully",
      "status": 200
    };
    // Act
    const response = await axios.put('http://localhost:8000/estudiantes/87654321', updatedStudent);
    const resultStudent = response.data;
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });
});