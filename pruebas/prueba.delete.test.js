const axios = require('axios');
const URL="http://localhost:8000/estudiantes"
describe('API endpoint /estudiantes', () => {
  // Prueba para eliminar un estudiante
  test('DELETE /estudiantes/:id should delete a student', async () => {
    // Arrange
    const id = "87654321";
    // Act
    const response = await axios.delete(`http://localhost:8000/estudiantes/${id}`);
    // Assert
    expect(response.status).toBe(200);
    
  });
});