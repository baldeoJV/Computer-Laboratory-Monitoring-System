// Import mysql2
import mysql from 'mysql2'
import dotenv from 'dotenv'
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

async function selectedReport(pcIds) {
  const q = `SELECT * FROM REPORTS WHERE computer_id IN (${[...pcIds].join(', ')})`
  // console.log(q)
  // console.log(pcIds)
  const [rows] = await pool.query(q)
  return rows
}

// get computer table/ specific computer information
export async function getRoomComputer(room, building_code){
  let [rows] = await pool.query(
    `SELECT * FROM computers WHERE room = ? AND building_code = ?`
    , [room, building_code])

  const pcIds = []
  rows.forEach(pcr => pcIds.push(pcr.computer_id))
  
  const eachReport = await selectedReport(pcIds)
  // console.log(eachReport)
  rows = rows.map(r => ({...r, report_count: eachReport.filter(c => c.computer_id === r.computer_id ).length }))
  // console.log(rows)
  
  return rows
}

// get non_consumable_components
export async function getNonConsumableComponent(component_id = ''){
  const [rows] = await pool.query(
    component_id ? `SELECT * FROM non_consumable_components as nonconsum JOIN components_reference as conref ON conref.reference_id = nonconsum.reference_id WHERE component_id = ?` :
    `SELECT * FROM non_consumable_components as nonconsum JOIN components_reference as conref ON conref.reference_id = nonconsum.reference_id`, [component_id])
  return component_id ? rows[0] : rows
}

// get consumable_components
export async function getConsumableComponent(component_id = '') {
  const [rows] = await pool.query(
    component_id ? `SELECT * FROM consumable_components as consum JOIN components_reference as conref ON conref.reference_id = consum.reference_id WHERE component_id = ?` :
    `SELECT * FROM consumable_components as consum JOIN components_reference as conref ON conref.reference_id = consum.reference_id`, [component_id])
  return component_id ? rows[0] : rows
}

// getcrm
async function getCrm(rows, table_name, isReportTable) {
  const uniqueReportsID = new Set()
  rows.forEach(r => uniqueReportsID.add(r.report_id))
  let [component_rows] = await pool.query(
    `SELECT * FROM ${table_name} WHERE report_id IN (${[...uniqueReportsID].join(', ')})`
  )
  // console.log(component_rows)
  let crm = new Map()

  // yes
  component_rows.forEach(cr => {
    crm.set(cr.report_id, { ...cr })

    // delete things
    delete crm.get(cr.report_id).report_id
    if (isReportTable) delete crm.get(cr.report_id).reported_components_id
    else delete crm.get(cr.report_id).archived_reported_components_id
  })
  return crm
}


// display reports
export async function getReport(report_id=''){
  const [rows] = await pool.query(
    report_id 
      ? `SELECT * FROM reports WHERE report_id = ?` 
      : `SELECT * FROM reports`, [report_id]
  )
  let crm = await getCrm(rows, "reported_components", true)

  // add
  const res = rows.map(rr => {return {...rr, components: {...crm.get(rr.report_id)} }})
  
  return report_id ? res[0] : res
}

export async function selectedReportAll(pcIds) {
  const [rows] = await pool.query(`SELECT COUNT(*) as total_report FROM REPORTS WHERE computer_id IN (${[...pcIds].join(', ')})`)
  return rows[0].total_report
}

  
// display archived reports
export async function getArchivedReport(report_id=''){
  const [rows] = await pool.query(
    report_id 
      ? `SELECT * FROM archived_reports WHERE report_id = ?` 
      : `SELECT * FROM archived_reports`, [report_id]
  )
  let crm = await getCrm(rows, "archived_reported_components", false)
    
  // add
  const res = rows.map(rr => {return {...rr, components: {...crm.get(rr.report_id)} }});;;;;
  // console.log("Start")
  // // console.log("GET ",crm.get(27))
  // console.log(res)
  return report_id ? res[0] : res
}



// display buildings (building_reference)
export async function getBuilding(building_code=''){
  const [rows] = await pool.query(
    building_code 
      ? `SELECT * FROM building_reference WHERE building_code = ?` 
      : `SELECT * FROM building_reference`, [building_code]
  )
  return building_code ? rows[0] : rows
}

// display number of reports based in their status
export async function getReportCount(){
  const [rows] = await pool.query(`SELECT count(*) as number_of_reports FROM reports`)
  return rows
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



//[UPDATE QUERY]