// Import mysql2
import mysql from 'mysql2'
import dotenv from'dotenv'
dotenv.config()

// Create a connection to the database

//const connection = mysql.createConnection({
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,         // XAMPP runs on localhost
  user: process.env.MYSQL_USER,         // user for XAMPP
  password: process.env.MYSQL_PASSWORD, // password for XAMPP
  database: process.env.MYSQL_DATABASE  // database name
}).promise()

//[READ QUERY]

// display the room table/ specific room information
export async function getRoom(room_id = ''){
  const [rows] = await pool.query(
    room_id ? `SELECT * FROM laboratories WHERE room_id = ?` :
    `SELECT * FROM laboratories`, [room_id])
  return room_id ? rows[0] : rows
}

// get computer table/ specific computer information
export async function getComputer(computer_id = ''){
  const [rows] = await pool.query(
    computer_id ? `SELECT * FROM computers WHERE computer_id = ?` :
    `SELECT * FROM computers`, [computer_id])
  return computer_id ? rows[0] : rows
}

// get computer table/ specific computer information
export async function getRoomComputer(room, building_code){
  const [rows] = await pool.query(
    `SELECT * FROM computers WHERE room = ? AND building_code = ?`
    , [room, building_code])
  return rows
}

// get non_consumable_components
export async function getNonConsumableComponent(component_id = ''){
  const [rows] = await pool.query(
    component_id ? `SELECT * FROM non_consumable_components WHERE component_id = ?` :
    `SELECT * FROM non_consumable_components`, [component_id])
  return component_id ? rows[0] : rows
}

// display reports
export async function getReport(report_id=''){
  const [rows] = await pool.query(
    report_id ? `SELECT * FROM reports WHERE report_id = ?` :
    `SELECT * FROM reports`, [report_id])
  return report_id ? rows[0] : rows
}


//[CREATE QUERY]

// create a room
export async function createRoom(room, building_code){
  const [result] = await pool.query(`
    INSERT INTO laboratories(room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issue, total_minor_issue, total_reports)
    VALUES (?, ?, 40, 40, 0, 0, 0, 0
    )`, [room, building_code])

  //check if successfully created a room
  const id = result.insertId
  return getRoom(id)
}

// create a computer
export async function createComputer(room, building_code, system_unit, monitor){
  const [result] = await pool.query(`
    INSERT INTO computers(room, building_code, system_unit, monitor, has_mouse, has_keyboard, has_internet, has_software, computer_status, condition_id)
    VALUES (?, ?, ?, ?, 1, 1, 1, 1, 1, 0)`,
    [room, building_code, system_unit, monitor])

  //check if successfully created a room
  const id = result.insertId
  return getComputer(id)
}

// create non consumable component
export async function createNonConsumableComponent(component_id, reference_id, location, specs){
  const [result] = await pool.query(`
    INSERT INTO non_consumable_components(component_id, reference_id, location, specs, flagged)
    VALUES (?, ?, ?, ?, 0)`, 
    [component_id, reference_id, location, specs])

  //returns the created component
  const id = component_id
  return getNonConsumableComponent(id)
}

// create report
export async function createReport(room, building_code, computer_id, components, report_comment, reported_condition, submittee){
  const [result] = await pool.query(`
    INSERT INTO reports(room, building_code, computer_id, components, report_comment, reported_condition, submittee)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [room, building_code, computer_id, components, report_comment, reported_condition, submittee])

  //check if successfully created a room
  const id = result.insertId
  return getReport(id)
}



//[UPDATE QUERY]