// Import mysql2
import mysql from 'mysql2'
import dotenv from'dotenv'
dotenv.config()

// Create a connection to the database

//const connection = mysql.createConnection({
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST, // XAMPP runs on localhost
  user: process.env.MYSQL_USER,      // user for XAMPP
  password: process.env.MYSQL_PASSWORD,      // password for XAMPP
  database: process.env.MYSQL_DATABASE // database name
}).promise()

//[READ] display the room table/ specific room information
export async function getRoom(room_id = ''){
  const [rows] = await pool.query(
    room_id ? `SELECT * FROM laboratories WHERE room_id = ?` :
    `SELECT * FROM laboratories`, [room_id])
  return room_id ? rows[0] : rows
}

//[CREATE] create a room
export async function createRoom(room, building_code){
  const [result] = await pool.query(`
    INSERT INTO laboratories(room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issue, total_minor_issue, total_reports)
    VALUES (?, ?, 40, 40, 0, 0, 0, 0
    )`, [room, building_code])

  //check if successfully created a room
  const id = result.insertId
  return getRoom(id)
}

