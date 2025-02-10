// Import mysql2
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// Create a connection to the database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,         // XAMPP runs on localhost
  user: process.env.MYSQL_USER,         // user for XAMPP
  password: process.env.MYSQL_PASSWORD, // password for XAMPP
  database: process.env.MYSQL_DATABASE  // database name
}).promise()

//[READ QUERY]

// LOGIN (RAINNAND)
export async function verifyAdminId(adminId) {
  const [rows] = await pool.query('SELECT * FROM admin WHERE admin_id = ?', [adminId]);
  return rows;
}

// display the room table/ specific room information
export async function getRoom(room_id = ''){
  const [rows] = await pool.query(
    room_id ? `SELECT * FROM laboratories WHERE room_id = ?` :
    `SELECT * FROM laboratories ORDER BY building_code ASC, room`, [room_id])
  return room_id ? rows[0] : rows
}

// get computer table/ specific computer information
export async function getComputer(computer_id = ''){
  let query = `SELECT computers.computer_id, laboratories.room, laboratories.building_code, 
    computers.system_unit, computers.monitor, computers.has_mouse, computers.has_keyboard, 
    computers.has_internet, computers.has_software, computers.computer_status, computers.condition_id
  FROM computers INNER JOIN laboratories ON computers.room_id = laboratories.room_id`;

  const [rows] = await pool.query(
    computer_id ? query += ` WHERE computer_id = ?` :
    query, [computer_id])
  return computer_id ? rows[0] : rows
}

async function selectedReport(pcIds) {
  // the (sql) error occus when the pcIds is empty (probably because room doesn't have any computer)
  const q = `SELECT * FROM REPORTS WHERE computer_id IN (${[...pcIds].join(', ')})`
  const [rows] = await pool.query(q)
  return rows
}

// RAINNAND 
// get computer table/ specific computer information
export async function getRoomComputer(room, building_code){
  let query = `SELECT computers.computer_id, laboratories.room, laboratories.building_code, 
    computers.system_unit, computers.monitor, computers.has_mouse, computers.has_keyboard, 
    computers.has_internet, computers.has_software, computers.computer_status, computers.condition_id
  FROM computers INNER JOIN laboratories ON computers.room_id = laboratories.room_id`;

  let [rows] = await pool.query(
    query += ` WHERE laboratories.room = ? AND laboratories.building_code = ?`
    , [room, building_code])

  const pcIds = []
  rows.forEach(pcr => pcIds.push(pcr.computer_id))
  
  const eachReport = pcIds.length > 0 ? await selectedReport(pcIds) : []
  rows = rows.map(r => ({...r, report_count: eachReport.filter(c => c.computer_id === r.computer_id ).length }))

  return rows
}

// get non_consumable_components
export async function getNonConsumableComponent(component_id = ''){
  const [rows] = await pool.query(
    component_id ? `SELECT * FROM non_consumable_components as nonconsum JOIN components_reference as conref ON conref.reference_id = nonconsum.reference_id WHERE component_id = ?` :
    `SELECT * FROM non_consumable_components as nonconsum JOIN components_reference as conref ON conref.reference_id = nonconsum.reference_id ORDER BY nonconsum.flagged DESC`, [component_id])
  return component_id ? rows[0] : rows
}

// get consumable_components
export async function getConsumableComponent(component_id = '') {
  const [rows] = await pool.query(
    component_id ? `SELECT * FROM consumable_components as consum JOIN components_reference as conref ON conref.reference_id = consum.reference_id WHERE component_id = ?` :
    `SELECT * FROM consumable_components as consum JOIN components_reference as conref ON conref.reference_id = consum.reference_id`, [component_id])
  return component_id ? rows[0] : rows
}

// RAINNAND
// getcrm
async function getCrm(rows, table_name, isReportTable) {
  const uniqueReportsID = new Set()
  rows.forEach(r => uniqueReportsID.add(r.report_id))
  let [component_rows] = await pool.query(
    `SELECT * FROM ${table_name} WHERE report_id IN (${[...uniqueReportsID].join(', ')})`
  )
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

// RAINNAND
// display reports
export async function getReport(report_id=''){
  
  const [rows] = await pool.query(
    report_id 
      ? `SELECT * FROM reports WHERE report_id = ?` 
      : `SELECT * FROM reports ORDER BY report_id DESC`, [report_id]
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

// RAINNAND
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
  
  // [GET COMPONENTS FOR CREATING A COMPUTER]
  
  // get rooms list
  async function getRoomsArray(){
    const [rooms] = await pool.query(`SELECT CONCAT(room, building_code) AS rooms FROM laboratories`)
  return rooms.map(room => room.rooms)
}

//get avaliable system unit
export async function getAvailableSystemUnit(){
  const rooms_list = await getRoomsArray()

  // if roomArray is empty, return all available components
  if (rooms_list.length === 0) {
    const [monitors] = await pool.query(`SELECT component_id FROM non_consumable_components WHERE flagged = 0 AND reference_id = 1`) // 1 is the reference_id for system units
    return monitors
  }

  // if roomArray is not empty, return all available components except the ones in the rooms and flagged
  const placeholders = rooms_list.map(() => 'location NOT LIKE ?').join(' AND ');
  const monitor_query = `SELECT component_id FROM non_consumable_components WHERE ${placeholders}
   AND flagged = 0 AND reference_id = 1`; // 1 is the reference_id for system units

   const [monitors] = await pool.query(monitor_query, rooms_list)

   return monitors.map(monitor => monitor.component_id); // converted to array of component_id
  }

  //get avaliable monitors
export async function getAvailableMonitor(){
  const rooms_list = await getRoomsArray()
  
  // if rooms_list is empty, return all available components
  if (rooms_list.length === 0) {
    const [monitors] = await pool.query(`SELECT component_id FROM non_consumable_components WHERE flagged = 0 AND reference_id = 2`) // 2 is the reference_id for monitors
    return monitors
  }
  
  const placeholders = rooms_list.map(() => 'location NOT LIKE ?').join(' AND ');
  const monitor_query = `SELECT component_id FROM non_consumable_components WHERE ${placeholders}
   AND flagged = 0 AND reference_id = 2`; // 2 is the reference_id for monitors

   const [monitors] = await pool.query(monitor_query, rooms_list)

   return monitors.map(monitor => monitor.component_id); // converted to array of component_id
  }
  
// get available consumable components
export async function getAvailableConsumableComponents(){
    const [consumable_components] = await pool.query(`
    SELECT components_reference.component_name, consumable_components.stock_count
    FROM consumable_components 
    JOIN components_reference ON consumable_components.reference_id = components_reference.reference_id
    WHERE stock_count > 0`)
  
  const result = {}
  consumable_components.forEach(component => {
    result[component.component_name] = component.stock_count
  })
  
  return result
}

export async function getAllReportId(computer_id){
  const [rows] = await pool.query(`SELECT report_id FROM reports WHERE computer_id = ?`, [computer_id])
  return rows
}

//[CREATE QUERY]

// create a room
export async function createRoom(room, building_code){
  // get all existing rooms
  const room_concat = `${room}${building_code}`
  const [rooms] = await pool.query(`SELECT CONCAT(room, building_code) AS rooms FROM laboratories`)
  
  if (rooms.some(r => r.rooms === room_concat)) {
    throw new Error(``); 
  }
  
  const [result] = await pool.query(`
    INSERT INTO laboratories(room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issue, total_minor_issue, total_reports)
    VALUES (?, ?, 0, 0, 0, 0, 0, 0
    )`, [room, building_code])

  await updateRoomData()
}

// create a computer (to be edited since waiting for the front end to be done)
export async function createComputer(room, building_code, system_unit, monitor){
  // First, heck if any consumable component has stock_count of 0
  const [consumableComponents] = await pool.query(`
    SELECT components_reference.component_name 
    FROM consumable_components JOIN components_reference ON consumable_components.reference_id = components_reference.reference_id
    WHERE stock_count = 0`);
  if (consumableComponents.length > 0) {
    throw new Error('Stock count is 0');
  }

  // Update the consumable components (decrement the stock count by 1 for each component)
  await pool.query(`UPDATE consumable_components SET stock_count = (stock_count - 1)`);
  
  // proceed to create the computer
  const [result] = await pool.query(`
    INSERT INTO computers(room_id, system_unit, monitor, has_mouse, has_keyboard, has_internet, has_software, computer_status, condition_id)
    VALUES (IFNULL((SELECT room_id FROM laboratories WHERE room = ? AND building_code LIKE ?), -1), ?, ?, 1, 1, 1, 1, 1, 0)`,
    [room, building_code, system_unit, monitor])
    
    // create the component condition
    await createComponentCondition(result.insertId)
    
    // update the non consumable components location
    const location = `${room}${building_code}`;
    await updateNonConsumableComponentLocation(location, system_unit, monitor);
    
    //update the room data
    await updateRoomData()
  }
  
  // create component condition
  async function createComponentCondition(computer_id){
    const [result] = await pool.query(`
     INSERT INTO components_condition(computer_id, system_unit_condition, monitor_condition, mouse_condition, keyboard_condition, network_condition, software_condition)
      VALUES (?, 0, 0, 0, 0, 0, 0)`,
      [computer_id])
}

// create non consumable component
export async function createNonConsumableComponent(component_id, reference_id, location, specs){
  const [result] = await pool.query(`
    INSERT INTO non_consumable_components(component_id, reference_id, location, specs, flagged)
    VALUES (?, ?, ?, ?, 0)`, 
    [component_id, reference_id, location, specs])

  }
  
  // create consumable component (just incase the client wants to add consumable components)
  export async function createConsumableComponent(reference_id, stock_count){
  /* 
    add a component in component reference
  */

  // add the consumable component
  const [result] = await pool.query(`
    INSERT INTO consumable_components(reference_id, stock_count)
    VALUES (?, ?)`, 
    [reference_id, stock_count])

    return getConsumableComponent()
  }
  
  // create report
  export async function createReport(room, building_code, computer_id, report_comment, date_submitted, submittee, reported_conditions){
    const [result] = await pool.query(`
    INSERT INTO reports(room, building_code, computer_id, report_comment, date_submitted, submittee)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [room, building_code, computer_id, report_comment, date_submitted, submittee])

  await pool.query(`
    INSERT INTO reported_components(report_id, mouse, keyboard, system_unit, monitor, software, internet, other)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    //if the conversion is made in the front end, remove the conversion here
    [result.insertId, 
     reported_conditions.mouse === "Minor Issue" ? 1 : reported_conditions.mouse === "Major Issue" ? 2 : reported_conditions.mouse === "Bad Condition" ? 3 : null,
     reported_conditions.keyboard === "Minor Issue" ? 1 : reported_conditions.keyboard === "Major Issue" ? 2 : reported_conditions.keyboard === "Bad Condition" ? 3 : null,
     reported_conditions.system_unit === "Minor Issue" ? 1 : reported_conditions.system_unit === "Major Issue" ? 2 : reported_conditions.system_unit === "Bad Condition" ? 3 : null,
     reported_conditions.monitor === "Minor Issue" ? 1 : reported_conditions.monitor === "Major Issue" ? 2 : reported_conditions.monitor === "Bad Condition" ? 3 : null,
     reported_conditions.software === "Minor Issue" ? 1 : reported_conditions.software === "Major Issue" ? 2 : reported_conditions.software === "Bad Condition" ? 3 : null,
     reported_conditions.internet === "Minor Issue" ? 1 : reported_conditions.internet === "Major Issue" ? 2 : reported_conditions.internet === "Bad Condition" ? 3 : null,
     reported_conditions.other === "Minor Issue" ? 1 : reported_conditions.other === "Major Issue" ? 2 : reported_conditions.other === "Bad Condition" ? 3 : null])
     
     // update the computer and components condition
     await updateComponentsCondition()
     
     // return getReport()
    }
 
// create building
export async function createBuilding(building_code, building_name){
  const [result] = await pool.query(`
    INSERT INTO building_reference(building_code, building_name) 
    VALUES (? ,?)`,
  [building_code, building_name])

}

// create account
export async function createAdmin(admin_id, password, first_name, last_name){
  const [result] = await pool.query(`
    INSERT INTO admin(admin_id, password, first_name, last_name) 
    VALUES (?, ?, ?, ?)`,
    [admin_id, password, first_name, last_name])
  }

  //[UPDATE QUERY]
  
  // update room (call this when any updates are made e.g. adding a computer, updating a computer, etc.)
  export async function updateRoomData(){
    
    //get the list of rooms
    const [room_list] = await pool.query(`SELECT room, building_code FROM laboratories`)
    
    for (const { room, building_code } of room_list) {
      const [[room_data]] = await pool.query(`
      SELECT 
        COUNT(*) AS total_pc,
        COUNT(CASE WHEN computers.computer_status = 1 THEN 1 END) AS total_active_pc,
        COUNT(CASE WHEN computers.computer_status = 0 THEN 1 END) AS total_inactive_pc,
        COUNT(CASE WHEN computers.condition_id = 2 THEN 1 END) AS total_major_issue,
        COUNT(CASE WHEN computers.condition_id = 1 THEN 1 END) AS total_minor_issue
        FROM computers INNER JOIN laboratories ON computers.room_id = laboratories.room_id
        WHERE room = ? AND building_code = ?`, [room, building_code])

        const [[{ total_reports }]] = await pool.query(`
      SELECT COUNT(*) AS total_reports
      FROM reports
      WHERE room = ? AND building_code = ?`, [room, building_code])
    
    await pool.query(`
      UPDATE laboratories SET total_pc = ?, total_active_pc = ?, total_inactive_pc = ?, total_major_issue = ?, total_minor_issue = ?, total_reports = ?
      WHERE room = ? AND building_code = ?`,
      [room_data.total_pc, room_data.total_active_pc, room_data.total_inactive_pc, room_data.total_major_issue, room_data.total_minor_issue, total_reports, room, building_code])
    }
}

// update room name
export async function updateRoomName(room, building_code, room_id){
  const [update_room] = await pool.query(`
    UPDATE laboratories
    SET room = ?, building_code = ?
    WHERE room_id = ?`, [room, building_code ,room_id])
      
    await updateRoomData()
}

// update non consumable component (this occurs when a computer is added or removed)
async function updateNonConsumableComponentLocation(location, system_unit, monitor){
  await pool.query(`
    UPDATE non_consumable_components
    SET location = ? WHERE component_id = ? OR component_id = ?`,
    [location, system_unit, monitor])
}

// update non consumable component
export async function updateNonConsumableComponent(old_component_id, new_component_id, location, specs){
  await pool.query(`
    UPDATE non_consumable_components
    SET component_id = ?, location = ?, specs = ?
    WHERE component_id = ?`, [new_component_id, location, specs, old_component_id])
}

// update consumable component
export async function updateConsumableComponent(component_name, stock_count){
  // tentative code, will be change if will update multiple consumable components
  await pool.query(`
    UPDATE consumable_components
    JOIN components_reference ON consumable_components.reference_id = components_reference.reference_id
    SET consumable_components.stock_count = ?
    WHERE components_reference.component_name LIKE ?`,
    [stock_count, component_name])

}

// update non consumable component flag
export async function updateNonConsumableComponentFlag(component_list, flag){
  let query = `UPDATE non_consumable_components SET flagged = ? WHERE component_id LIKE ?`;

  for (let i = 1; i < component_list.length; i++){
    query += ` OR component_id LIKE ?`;
  }
  
  await pool.query(query, [flag, ...component_list])
}

// update computer based on reports
async function updateComponentsCondition(){
  // Get distinct computer IDs from reports
  const [pcIds] = await pool.query(`SELECT DISTINCT computer_id FROM reports`);
  const pcIdList = pcIds.map(pc => pc.computer_id);
  
  // Update component conditions and computer status for each computer
  for (const pcId of pcIdList) {
    // Get average condition of each component
    const [reportedComponents] = await pool.query(`
      SELECT
        ROUND(AVG(system_unit)) AS system_unit_condition,
        ROUND(AVG(monitor)) AS monitor_condition,
        ROUND(AVG(mouse)) AS mouse_condition,
        ROUND(AVG(keyboard)) AS keyboard_condition,
        ROUND(AVG(internet)) AS network_condition,
        ROUND(AVG(software)) AS software_condition
      FROM reported_components
      JOIN reports ON reported_components.report_id = reports.report_id
      WHERE reports.computer_id = ?`, [pcId]);

      const conditions = reportedComponents[0];
      
      // Update component conditions
      await pool.query(`
      UPDATE components_condition
      SET
        system_unit_condition = IFNULL(?, 0),
        monitor_condition = IFNULL(?, 0),
        mouse_condition = IFNULL(?, 0),
        keyboard_condition = IFNULL(?, 0),
        network_condition = IFNULL(?, 0),
        software_condition = IFNULL(?, 0)
      WHERE computer_id = ?`, 
      [conditions.system_unit_condition, conditions.monitor_condition, conditions.mouse_condition,
       conditions.keyboard_condition, conditions.network_condition, conditions.software_condition, pcId]);

    // Calculate the condition of the computer
    const avgCondition = (
      (conditions.system_unit_condition * Math.pow(10, 2)) + // coefficient for system unit: 10
      (conditions.monitor_condition * Math.pow(10, 2)) + // coefficient for monitor: 10
      (conditions.mouse_condition * Math.pow(5, 2)) + // coefficient for mouse: 5
      (conditions.keyboard_condition * Math.pow(8, 2)) +  // coefficient for keyboard: 8
      (conditions.network_condition * Math.pow(6, 2)) +  // coefficient for network: 6
      (conditions.software_condition * Math.pow(10, 2)) // coefficient for software: 10
    ) / 6;
    
    await pool.query(`
      UPDATE computers SET condition_id = 
      CASE
        WHEN ? = 0 THEN 0
        WHEN ? BETWEEN 1 AND 49 THEN 1
        WHEN ? BETWEEN 50 AND 99 THEN 2
        ELSE 3
        END
        WHERE computer_id = ?`,
      [avgCondition, avgCondition, avgCondition, pcId]);
      
  }
}

// update computer
export async function updateComputer(new_monitor, new_system_unit, room, building_code,
  has_mouse, has_keyboard, has_internet, has_software, computer_id){

  // get the old system unit and monitor
  const [component_id] = await pool.query(`SELECT system_unit, monitor FROM computers WHERE computer_id = ?`, [computer_id])
  const old_system_unit = component_id[0].system_unit
  const old_monitor = component_id[0].monitor
  
  // check if the computer has reports
  const [reports] = await pool.query(`SELECT report_id FROM reports WHERE computer_id = ?`, [computer_id])
  if (reports.length > 0) {
    throw new Error('Computer has reports');
  }

  // update the computer
  const [update_computer] = await pool.query(`
    UPDATE computers
    SET room_id = IFNULL((SELECT room_id FROM laboratories WHERE room = ? AND building_code LIKE ?), -1),
    system_unit = ?, monitor = ?, has_mouse = ?, has_keyboard = ?, has_internet = ?, has_software = ?
    WHERE computer_id = ?`, [room, building_code, new_system_unit, new_monitor, has_mouse, has_keyboard, has_internet, has_software, computer_id])

  // update the old non consumable components location (default location: "Storage Room")
  await updateNonConsumableComponentLocation("Storage Room", old_system_unit, old_monitor);

  // update the new non consumable components location
  await updateNonConsumableComponentLocation(`${room}${building_code}`, new_system_unit, new_monitor);
  
  // update the room data
  await updateRoomData()
}

//update computer status
export async function updateComputerStatus(computer_id, status){
  await pool.query(`
    UPDATE computers
    SET computer_status = ?
    WHERE computer_id = ?`, [status, computer_id])
    
    // update the room data
    await updateRoomData()
  }

  //[DELETE QUERY]
  
  // delete non consumable component
  export async function deleteNonConsumableComponent(component_list){
    let query = `DELETE FROM non_consumable_components WHERE component_id IN (${component_list.map((c)=>'?').join(', ')})`;
    
  await pool.query(query, component_list)
}

// delete rooms
export async function deleteRoom(rooms) {
  const roomConditions = rooms.map(() => '(room = ? AND building_code = ?)').join(' OR ');
  const queryParams = rooms.flatMap(room => [room.room, room.building_code]);

  await pool.query(`DELETE FROM laboratories WHERE ${roomConditions}`, queryParams);
}

// delete computer
export async function deleteComputer(computer_id){
  // check if the computer has reports
  const computerIdCondition = computer_id.map(() => 'computer_id = ?').join(' OR ');
  
  let component_list = []
  
  const [system_unit] = await pool.query(`SELECT system_unit FROM computers WHERE ${computerIdCondition}`, computer_id)
  const [monitor] = await pool.query(`SELECT monitor FROM computers WHERE ${computerIdCondition}`, computer_id)
  
  // convert the object to array
  const system_unit_array = system_unit.map(su => su.system_unit)
  const monitor_array = monitor.map(m => m.monitor)
  
  component_list.push(...system_unit_array)
  component_list.push(...monitor_array)
  
  // delete the computer
  await pool.query(`DELETE FROM computers WHERE ${computerIdCondition}`, computer_id)
  
  // if component list is not empty, then update each non consumable components location
  if (component_list.length > 0) {
    await pool.query(`UPDATE non_consumable_components SET location = 'Storage Room' WHERE component_id IN (${component_list.map((c)=>'?').join(', ')})`, component_list)
  }

  // update the room data
  await updateRoomData()
}

// delete report
export async function deleteReport(report_id){
    await pool.query(`DELETE FROM reported_components WHERE report_id = ?`, [report_id])
    await pool.query(`DELETE FROM reports WHERE report_id = ?`, [report_id])

  // update the data
  await updateComponentsCondition()
  await updateRoomData()
}

export async function archiveReport(report, archived_by, report_status, archive_comment, date_archived) {
  const { report_id, room, building_code, computer_id, report_comment, date_submitted, submittee, components } = report;
  // report_status: 1 - resolved, 0 - rejected

  // archive the report
  await pool.query(`
    INSERT INTO archived_reports(report_id, room, building_code, computer_id, report_comment, resolve_comment, report_status, date_submitted, date_resolve, resolve_by, submittee)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [report_id, room, building_code, computer_id, report_comment, archive_comment, report_status, date_submitted, date_archived, archived_by, submittee])

  // archive the reported components
  await pool.query(`
    INSERT INTO archived_reported_components(report_id, mouse, keyboard, system_unit, monitor, software, internet, other)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [report_id, components.mouse, components.keyboard, components.system_unit, components.monitor, components.software, components.internet, components.other])

  // update the components condition in the reported components if the report is resolved
  if (report_status === 1) {
    // get first the components condition  that was reported (columns that is not NULL)
    const reported_components = Object.keys(components).filter(key => components[key] !== null);

    // // update the components condition
    for (const component of reported_components) {
      await pool.query(`
        UPDATE reported_components
        JOIN reports ON reported_components.report_id = reports.report_id
        SET ${component} = null
        WHERE computer_id = ?`, [computer_id])
    }
  }

  await deleteReport(report_id)

  // update
  await updateComponentsCondition()
  await updateRoomData()
}