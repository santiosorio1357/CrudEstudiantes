const axios = require('axios');
const URL="http://localhost:8000/estudiantes"
describe('API endpoint /estudiantes', () => {
  // Prueba para crear un estudiante
  test('POST /estudiantes should create a new student', async () => {
    // Arrange
    const newStudent = { nombre: 'María', apellido: 'González', cedula: '87654321', carrera: 'Medicina' };
    // Act
    const response = await axios.post('http://localhost:8000/estudiantes', newStudent);
    const resultStudent = JSON.parse(response.config.data);
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(newStudent);
  });
});