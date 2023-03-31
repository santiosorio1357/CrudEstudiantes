const app = require('../app');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const estudiante=require("../models/estudiante")
chai.use(chaiHttp);

describe('POST endpoint /estudiantes', () => {
  test('POST /estudiantes should create a new student', async () => {
    // Arrange
    const newStudent = { nombre: 'María', apellido: 'González', cedula: '87654321', carrera: 'Medicina' };
    const stub = sinon.stub(estudiante.prototype, "save").resolves({
      newStudent
    });
    // Act
    const response = await chai.request(app).post("/estudiantes").send(newStudent);
    delete response.body.data._id
    // Assert
    expect(response.status).toBe(200); 
    expect(response.body.data).toMatchObject(newStudent);
    stub.restore();
  });
});
/*
describe('GET endpoint /estudiantes', () => {
  test('GET /estudiantes/:id should return a student', async () => {
    // Arrange
    const expectedStudent = {  
      "nombre": "María",
      "apellido": "González",
      "cedula": "87654321",
      "carrera": "Medicina"
    };
    const id='87654321';
    axios.get.mockResolvedValueOnce({ status: 200, data: { data: [expectedStudent] } });
    // Act
    const response = await axios.get(`${URL}/${id}`);
    const resultStudent = response.data.data[0];
    // Assert
    expect(response.status).toBe(200);
    expect(resultStudent).toMatchObject(expectedStudent);
  });
});

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