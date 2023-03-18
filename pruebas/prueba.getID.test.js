const axios = require('axios');

const URL="http://localhost:8000/estudiantes"
describe('API endpoint /estudiantes', () => {
  
  // Prueba para obtener un estudiante por ID
  test('GET /estudiantes/:id deberìa retornar un estudiante', async () => {
    // Arrange
    const expectedStudent = {  
    "nombre": "María",
    "apellido": "González",
    "cedula": "87654321",
    "carrera": "Medicina" };
    // Act
    const response = await axios.get(URL+'/87654321');
    const resultStudent = response.data.data[0];
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });

 
});