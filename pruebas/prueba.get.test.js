const axios = require('axios');
const URL="http://localhost:8000/estudiantes"
describe('API endpoint /estudiantes', () => {
  // Prueba para obtener todos los estudiantes
  test('GET /estudiantes should return all students', async () => {
    // Arrange
    const expectedSchema = {
    "nombre": "string",
    "apellido": "string",
    "cedula": "string",
    "carrera": "string"};
    // Act
    const response = await axios.get(URL);
    const resultSchema = response.data.data;
    // Assert
    expect(response.status).toBe(200);
    resultSchema.forEach(Data => {
      expect(typeof Data.nombre).toBe(expectedSchema.nombre);
      expect(typeof Data.apellido).toBe(expectedSchema.apellido);
      expect(typeof Data.cedula).toBe(expectedSchema.cedula);
      expect(typeof Data.carrera).toBe(expectedSchema.carrera);
    });
  });
});