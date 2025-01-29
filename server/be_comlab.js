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

// display buildings (building_reference)
export async function getBuilding(building_code=''){
  const [rows] = await pool.query(
    building_code ? `SELECT * FROM building_reference WHERE building_code = ?` :
    `SELECT * FROM building_reference`, [building_code])
  return building_code ? rows[0] : rows
}

// display number of reports based in their status
export async function getReportCount(){
  const [rows] = await pool.query(`SELECT count(*) as number_of_reports FROM reports`)
  return rows
}

// display account/s
export async function getAdmin(admin_id=''){
  //password column is not included
  const [rows] = await pool.query(
    admin_id ? `SELECT admin_id, first_name, last_name FROM admin WHERE admin_id = ?` :
    `SELECT admin_id, first_name, last_name FROM admin`, [admin_id])
  return admin_id ? rows[0] : rows
}

// display component condition
export async function getComponentCondition(computer_id){
  const [rows] = await pool.query(
    computer_id ? `SELECT * FROM components_condition WHERE computer_id = ?` :
    `SELECT * FROM components_condition`, [computer_id])
  return computer_id ? rows[0] : rows
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

  // update the non consumable components location


  return getComputer(result.insertId)  //remove the 'id' if you want to return all computers
}

// create component condition
export async function createComponentCondition(computer_id){
  const [result] = await pool.query(`
     INSERT INTO components_condition(computer_id, system_unit_condition, monitor_condition, mouse_condition, keyboard_condition, network_condition, software_condition)
      VALUES (?, 0, 0, 0, 0, 0, 0)`,
      [computer_id])

  return getComponentCondition(computer_id) //remove the 'computer_id' if you want to return all component conditions
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

// create building
export async function createBuilding(building_code, building_name){
  const [result] = await pool.query(`
    INSERT INTO building_reference(building_code, building_name) 
    VALUES (? ,?)`,
    [building_code, building_name])

  //check if successfully created a room
  const id = building_code
  return getBuilding(id)
}

// create account
export async function createAdmin(admin_id, password, first_name, last_name){
  const [result] = await pool.query(`
    INSERT INTO admin(admin_id, password, first_name, last_name) 
    VALUES (?, ?, ?, ?)`,
    [admin_id, password, first_name, last_name])

  //check if successfully created a room
  return getAdmin(admin_id)
}




//[UPDATE QUERY]

// update room (call this when any updates are made e.g. adding a computer, updating a computer, etc.)
export async function updateRoom(){
  
  //get the list of rooms
  const [room_list] = await pool.query(`
    SELECT DISTINCT CONCAT(room, building_code) AS rooms
    FROM computers`)

  //loop through the list of rooms and update each room
  for (let i = 0; i < room_list.length; i++) {
    const room = room_list[i].rooms

    // split the room and building_code
    const room_number = room.slice(0, 3)
    const building_code = room.slice(3)

    //count the total_pc, total_active_pc, total_inactive_pc [COMPUTER TABLE]
    const [room_data] = await pool.query(`
      SELECT 
        room,
        building_code,
        COUNT(*) AS total_pc,
        COUNT(CASE WHEN computer_status = 1 THEN 1 END) AS total_active_pc,
        COUNT(CASE WHEN computer_status = 0 THEN 1 END) AS total_inactive_pc,
        COUNT(CASE WHEN condition_id = 2 THEN 1 END) AS total_major_issue,
        COUNT(CASE WHEN condition_id = 1 THEN 1 END) AS total_minor_issue
      FROM computers
      WHERE room = ? AND building_code = ?`, [room_number, building_code])

    /*count the total_reports [REPORT TABLE]
       ... code here
    */

    console.log(room_data[0].total_pc)

    //update the room
    const [result] = await pool.query(`
      UPDATE laboratories SET total_pc = ?, total_active_pc = ?, total_inactive_pc = ?, total_major_issue = ?, total_minor_issue = ?, total_reports = ?
      WHERE room = ? AND building_code = ?`,
      [room_data[0].total_pc, room_data[0].total_active_pc, room_data[0].total_inactive_pc, room_data[0].total_major_issue, room_data[0].total_minor_issue, 0, room_number, building_code])

    //add the room to the list
    console.log("new room")
  }

  return getRoom()  // to be changed
}

// update non consumable component (this occurs when a computer is added or removed)
export async function updateNonConsumableComponent(location, system_unit, monitor){
  const [update_non_consum] = await pool.query(`
    UPDATE non_consumable_components
    SET location = ? WHERE component_id = ? OR component_id = ?`,
    [location, system_unit, monitor])

  return getNonConsumableComponent()
}