const mongoose = require('mongoose');
require('dotenv').config();
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Conectado a MongoDB");
      } catch (error) {
        console.error("Error durante la conexión a MongoDB:", error);
      } finally {
        await mongoose.disconnect();
        console.log("Conexión a MongoDB cerrada.");
      }
    }
run().catch(console.dir);