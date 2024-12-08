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

//display a specific table
export async function getTable(table){

  const [rows] = await pool.query(`SELECT * FROM ${table}`)
  return rows

}

//ROOM TABLE RELATED QUERY

//[READ] display the room table/ specific room information
export async function getRoom(room_id = ''){
  //should be executed when both parameters are provided or none are provided
    const [rows] = await pool.query(
      room_id ? `SELECT room_id, CONCAT(room, building_code) AS room_code, total_pc, total_active_pc, total_inactive_pc, total_major_issue, total_minor_issue, total_reports FROM laboratories WHERE room_id = ?` :
        `SELECT room_id, CONCAT(room, building_code) AS room_code, total_pc, total_active_pc, total_inactive_pc, total_major_issue, total_minor_issue, total_reports FROM laboratories`, [room_id])
    return room_id ? rows[0] : rows

}

//[CREATE] create a room
export async function createRoom(room, building_code){
  const result = await pool.query(`
    INSERT INTO laboratories(room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issue, total_minor_issue, total_reports)
    VALUES (?, ?, 40, 40, 0, 0, 0, 0
    )`, [room, building_code])
  return getRoom(room, building_code) //check if it successfully inserted the values in the db
}


//CONSOLE.LOG PART (FOR TESTING) > > > > > >

// const room = await getRoom(4)
// console.log(room)

// function insertSample(){
// // Insert data into the table
// const insertQuery = `INSERT INTO non_consumable_components (component_id, reference_id, location, specs, flagged) VALUES (?, ?, ?, ?, ?)`;
// const values = ['MON-001', null, 'location 1', '23/24-inch screen in 16:9 format: resolution of 1920 x 1080 pixels', 0];
// values[1] = values[0].startsWith('SYU') ? 1 : values[0].startsWith('MON') ? 2 : null //tentative

// pool.query(insertQuery, values, (err, results) => {
//   if (err) {
//     console.error('Error inserting data:', err.message);
//     return;
//   }
//   console.log('Data inserted successfully:', results);
// });
// }

// // insertSample()
// // sampleQuery()

// // // Close the connection
// // connection.end();