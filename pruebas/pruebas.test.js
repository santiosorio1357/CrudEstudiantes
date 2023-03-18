const axios = require('axios');
const URL="http://localhost:8000/estudiantes"
describe('API endpoint /estudiantes', () => {
  test('POST /estudiantes should create a new student', async () => {
    // Arrange
    const newStudent = { nombre: 'María', apellido: 'González', cedula: '87654321', carrera: 'Medicina' };
    // Act
    const response = await axios.post(URL, newStudent);
    const resultStudent = JSON.parse(response.config.data);
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(newStudent);
  });
  test('GET /estudiantes/:id deberìa retornar un estudiante', async () => {
    // Arrange
    const expectedStudent = {  
    "nombre": "María",
    "apellido": "González",
    "cedula": "87654321",
    "carrera": "Medicina" };
    // Act
    const id='87654321'
    const response = await axios.get(`${URL}/${id}`);
    const resultStudent = response.data.data[0];
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });
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
    const id='87654321'
    const response = await axios.put(`${URL}/${id}`, updatedStudent);
    const resultStudent = response.data;
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });
  test('DELETE /estudiantes/:id should delete a student', async () => {
    // Arrange
    const id = "87654321";
    // Act
    const response = await axios.delete(`${URL}/${id}`);
    // Assert
    expect(response.status).toBe(200);
    
  });
});