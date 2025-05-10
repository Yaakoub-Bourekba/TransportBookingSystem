// Get the client
// config/db.js
import mysql from 'mysql2/promise';
import {} from 'dotenv/config';

let connection;

const connectDB = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      passsword: '',
      database: process.env.DATABASE,
      port:process.env.DBPORT
    });
    console.log('✅ MySQL connected');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    process.exit(1);
  }
};

export { connectDB, connection };
