const app = require('../app');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const estudiante=require("../models/estudiante")
chai.use(chaiHttp);

describe('POST endpoint /estudiantes', () => {
  test('POST /estudiantes should create a new student', async () => {
    // Arrange
    const newStudent = new estudiante ({ 
      nombre: 'María', 
      apellido: 'González', 
      cedula: '87654321', 
      carrera: 'Medicina' });
    const stub = sinon.stub(estudiante.prototype, "save").resolves({
      newStudent
    });
    // Act
    const response = await chai.request(app).post("/estudiantes").send(newStudent);
    // Assert
    expect(response.status).toBe(200); 
    expect(response.body.data.nombre).toEqual(newStudent.nombre);
    expect(response.body.data.apellido).toEqual(newStudent.apellido);
    expect(response.body.data.cedula).toEqual(newStudent.cedula);
    expect(response.body.data.carrera).toEqual(newStudent.carrera);
    stub.restore();
  });
});

describe('GET endpoint /estudiantes', () => {
  test('GET /estudiantes/:id should return a student', async () => {
    // Arrange
    const expectedStudent = new estudiante({  
      "nombre": "María",
      "apellido": "González",
      "cedula": "87654321",
      "carrera": "Medicina"
    });
    const id='87654321';
    const stub = sinon.stub(estudiante, "find").resolves({expectedStudent});
    // Act
    const response = await chai.request(app).get(`/estudiantes/$${id}`);
    const resultStudent = response.body.data["expectedStudent"];
  
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent.nombre).toEqual(expectedStudent.nombre);
    expect(resultStudent.apellido).toEqual(expectedStudent.apellido);
    expect(resultStudent.cedula).toEqual(expectedStudent.cedula);
    expect(resultStudent.carrera).toEqual(expectedStudent.carrera);
    stub.restore();
  });
});
/*
describe('GET endpoint /estudiantes', () => {
  test('GET /estudiantes should return all students', async () => {
    // Arrange
    const expectedSchema = {
      "nombre": "string",
      "apellido": "string",
      "cedula": "string",
      "carrera": "string"
    };
    const allStudents = [
      { nombre: 'John', apellido: 'Doe', cedula: '12345678', carrera: 'Medicina' },
      { nombre: 'Jane', apellido: 'Doe', cedula: '87654321', carrera: 'Sistemas' }
    ];
    axios.get.mockResolvedValueOnce({ status: 200, data: { data: allStudents } });
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

describe('PUT endpoint /estudiantes', () => {
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

    const mockedResponse = { data: expectedStudent, status: 200 };
    axios.put = jest.fn().mockResolvedValue(mockedResponse);

    // Act
    const id='87654321'
    const response = await axios.put(`${URL}/${id}`, updatedStudent);
    const resultStudent = response.data;

    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });
});

describe('DELETE endpoint /estudiantes', () => {
  test('DELETE /estudiantes/:id should delete a student', async () => {
    // Arrange
    const id = '87654321';
    const mockResponse = { status: 200 };
    axios.delete = jest.fn().mockResolvedValue(mockResponse);
    // Act
    const response = await axios.delete(`${URL}/${id}`);
    // Assert
    expect(response.status).toBe(200);
  });
  
});*/