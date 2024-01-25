import mongoose from 'mongoose';

const connection = {}; 

async function dbConnect() {
    try {
      if (connection.isConnected) {
        // console.log("Уже подключены к базе данных");
        return;
      }
      const db = await mongoose.connect(process.env.MONGO_URI);
      connection.isConnected = db.connections[0].readyState;
      // console.log("Подключение к базе данных успешно");
    } catch (error) {
      console.error("Ошибка подключения к базе данных:", error);
    }
}

export default dbConnect;
