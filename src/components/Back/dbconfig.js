const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
  try {
    const uri = process.env.MONGODB_URI;

    // Verificar si el URI está definido
    if (!uri) {
      throw new Error('MONGODB_URI no está definida en el archivo .env');
    }

    // Conectar a MongoDB
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');

    // Hacer alguna operación, por ejemplo, ping a la base de datos
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Ping exitoso a MongoDB');

    // Aquí podrías realizar operaciones con la base de datos
    // ...

  } catch (error) {
    console.error('Error durante la conexión a MongoDB:', error);
  }
}

// Ejecutar la función sin desconectar inmediatamente
run().catch(console.error);