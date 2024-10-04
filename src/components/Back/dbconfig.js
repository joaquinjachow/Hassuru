const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI no está definida en el archivo .env');
    }
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');
    await mongoose.connection.db.admin().command({ ping: 1 });
  } catch (error) {
    console.error('Error durante la conexión a MongoDB:', error);
  }
}

run().catch(console.error);