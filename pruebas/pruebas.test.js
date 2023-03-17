const axios = require('axios');
const URL="http://localhost:8000/estudiantes"
describe('API endpoint /estudiantes', () => {
  // Prueba para obtener todos los estudiantes
  test('GET /estudiantes should return all students', async () => {
    // Arrange
    const expectedSchema = {
    "nombre": "María",
    "apellido": "González",
    "cedula": "87654321",
    "carrera": "Medicina"};

    // Act
    const response = await axios.get('http://localhost:8000/estudiantes');
    const resultSchema = response.data.data[0];
    console.log(resultSchema)
    // Assert
    expect(response.status).toBe(200);
    expect(resultSchema).toMatchObject(expectedSchema);
  });

  // Prueba para obtener un estudiante por ID
  test('GET /estudiantes/:id should return a student', async () => {
    // Arrange
    const expectedStudent = { 
      
    "nombre": "María",
    "apellido": "González",
    "cedula": "87654321",
    "carrera": "Medicina" };

    // Act
    const response = await axios.get('http://localhost:8000/estudiantes/87654321');
    const resultStudent = response.data.data[0];

    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });

  // Prueba para crear un estudiante
  test('POST /estudiantes should create a new student', async () => {
    // Arrange
    const newStudent = { nombre: 'María', apellido: 'González', cedula: '87654321', carrera: 'Medicina' };
    const expectedObject={
      "data": {
          "acknowledged": true,
          "insertedId": 
      },
      "message": "successfully",
      "status": 200
  }
    // Act
    const response = await axios.post('http://localhost:8000/estudiantes', newStudent);
    const resultStudent = response.data;

    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(newStudent);
  });

  // Prueba para actualizar un estudiante
  test('PUT /estudiantes/:id should update a student', async () => {
    // Arrange
    const updatedStudent = { nombre: 'María', apellido: 'González', cedula: '87654321', carrera: 'Odontología' };
    const expectedStudent = { nombre: 'María', apellido: 'González', cedula: '87654321', carrera: 'Odontología' };

    // Act
    const response = await axios.put('http://localhost:8000/estudiantes/1', updatedStudent);
    const resultStudent = response.data;

    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });

  // Prueba para eliminar un estudiante
  test('DELETE /estudiantes/:id should delete a student', async () => {
    // Arrange
    const id = 1;

    // Act
    const response = await axios.delete(`http://localhost:8000/estudiantes/${id}`);

    // Assert
    expect(response.status).toBe(200);
  });
});