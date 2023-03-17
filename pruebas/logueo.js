const axios = require('axios');
const prueba = async () => {
    const response = await axios.get('http://localhost:8000/estudiantes/87654321');
    const resultSchema = response.data.data;
    console.log(resultSchema)
}
prueba()
