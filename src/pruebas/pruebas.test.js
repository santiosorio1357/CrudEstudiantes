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

describe('GET endpoint /estudiantes', () => {
  test('GET /estudiantes should return all students', async () => {
    // Arrange
    const expectedStudent = new estudiante({  
      "nombre": "string",
      "apellido": "string",
      "cedula": "string",
      "carrera": "string"
    });
    
    const stub = sinon.stub(estudiante, "find").resolves({expectedStudent});
    // Act
    const response = await chai.request(app).get(`/estudiantes`);
    const resultStudent = response.body.data["expectedStudent"];
  
    // Assert
    expect(response.status).toBe(200);
    expect(typeof resultStudent.nombre).toEqual(expectedStudent.nombre);
    expect(typeof resultStudent.apellido).toEqual(expectedStudent.apellido);
    expect(typeof resultStudent.cedula).toEqual(expectedStudent.cedula);
    expect(typeof resultStudent.carrera).toEqual(expectedStudent.carrera);
    stub.restore();
  });
   

  
});

describe('PUT endpoint /estudiantes', () => {
  test("Obtiene un id para modificar un estudiante", async () => {
    const estudianteUpdated = new estudiante({nombre: "emanuel", apellido: "rico", cedula: "1196547", carrera: "sistemas" });
    const stub = sinon.stub(estudiante, "replaceOne").resolves({
       nombre: estudianteUpdated.nombre, apellido: estudianteUpdated.apellido, cedula: estudianteUpdated.cedula, carrera: "Ingenieria Industrial",
    });
    const response = await chai.request(app).put(`/estudiantes/${estudianteUpdated.cedula}`).send({ carrera: "Ingenieria Industrial" });
    expect(response.statusCode).toBe(200);
    expect(response.ok).toBe(true);
    stub.resolves();
 });
});

describe('DELETE endpoint /estudiantes', () => {
  test('DELETE /estudiantes/:id should delete a student', async () => {
    // Arrange
    const newStudent = new estudiante ({ 
      nombre: 'María', 
      apellido: 'González', 
      cedula: '87654321', 
      carrera: 'Medicina' });
    const stub = sinon.stub(estudiante.prototype, "save").resolves(newStudent);
    const eliminarStub = sinon.stub(estudiante, "deleteMany").resolves(newStudent);

    const response = await chai.request(app).delete(`/estudiantes/${newStudent.cedula}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.ok).toBe(true);
    stub.resolves();
    eliminarStub.resolves();
  });
  
});