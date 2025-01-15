import express from 'express'
import cors from 'cors'
import { getRoom, createRoom,
    getComputer, createComputer, getRoomComputer,
    getNonConsumableComponent, createNonConsumableComponent,
    getReport, createReport, getReportCount,
    getBuilding, createBuilding, getConsumableComponent,getArchivedReport, selectedReportAll, } from './be_comlab.js'

const app = express()

app.use(express.json())
app.use(cors())

// Function to format date
function formatDate(dateString) { 
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
}

// [DASHBOARD RELATED QUERY]

// fetch data for dashboard
app.get("/dashboard", async (req, res) => {
    console.log("hellooo");
    
    try {
        // Fetch all required data
        const rooms = await getRoom()   //select all rooms
        const computers = await getComputer()   //select all computers
        const reports = await getReport()   //select all reports
        const buildings = await getBuilding()   //select all buildings
        const pending_report_count = await getReportCount()    //get the count of pending reports


        //format the date (example: from "2024-12-12T16:00:00.000Z" to "2024-12-13")
        const formatted_report = reports.map(report => ({
            ...report, date_submitted: formatDate(report.date_submitted) 
        }))

        // Store all data in a dictionary
        const dashboard_dictionary = {
            rooms,
            computers,
            formatted_report,
            buildings,
            pending_report_count
        };

        // Respond with the dictionary
        res.status(200).json(dashboard_dictionary);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

//[LABORATORIES TABLE RELATED QUERY]

//get all rooms
app.get("/laboratories", async (req, res) => {
    const get_room = await getRoom()

    res.send(get_room)
})

//get specific room
app.get("/laboratories/:room_id", async (req, res) => {
    const room_id = req.params.room_id

    const get_room = await getRoom(room_id)

    res.send(get_room ? get_room : `Room id: ${room_id} doesn't exist`)
})

//create room
app.post("/create/room", async (req, res) => {
    const {room, building_code} = req.body
    const create_room = await createRoom(room, building_code)
    res.status(201).send(create_room)
})


//[COMPUTERS TABLE RELATED QUERY]

//get all computers
app.get("/rooms/all_computers", async (req, res) => {
    const get_computer = await getComputer()

    res.send(get_computer)
})

//create computer

app.post("/create/computer", async (req, res) => {
    const {room, building_code, system_unit, monitor} = req.body

    try{    
        const create_computer = await createComputer(room, building_code, system_unit, monitor)
        res.status(201).send(create_computer)
    }catch(error) {
        // Check for duplication error (probably in 'system_unit' and 'monitor' column)
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`System unit tag '${system_unit}' or monitor tag '${monitor}' already in use.`);
        }
        // Check if 'system_unit' or 'monitor' doesn't exist
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).send(`System unit tag '${system_unit}' or monitor tag '${monitor}' doesn't exists.`);
        }
    }
})
 
//get all computers in specific rooms based in req.body (array format)
app.post("/rooms/computers", async (req, res) => {
    const { rooms } = req.body;
    // console.log("BACKEND ROOMS: ", rooms)
    //check if the input is an array
    if (!Array.isArray(rooms)) {
        return res.status(400).send("Invalid array format.");
    }
    
    try {
        const results = await Promise.all(
            rooms.map(async ({ roomnum, building_code }) => {
                const roomData = await getRoomComputer(roomnum, building_code);
                
                return roomData;
            })
        );

        if (results.flat().length === 0) {
            return res.status(404).send("No computers in the given room/s.");
        }

        res.status(200).json(results.flat());// .flat() make 2d array into 1d
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching room data.");
    }
});


//[NON-CONSUMABLE-COMPONENT TABLE RELATED QUERY]

//get non consumable component
app.get("/non_consum_comp", async (req, res) => {
    const get_non_consumable_component = await getNonConsumableComponent()

    res.send(get_non_consumable_component)
})

//create non_consumable_component
app.post("/create/non_consum_comp", async (req, res) => {
    const {component_id, reference_id, location, specs} = req.body

    try{    
        const create_non_consumable_component = await createNonConsumableComponent(component_id, reference_id, location, specs)
        res.status(201).send(create_non_consumable_component)
    }catch(error) {
        // Check for duplication error (probably in 'system_unit' and 'monitor' column)
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Component id '${component_id}' already exist`);
        }
    }
})


//[CONSUMABLE-COMPONENT TABLE RELATED QUERY]

//get consumable component
app.get("/consum_comp", async (req, res) => {
    const get_consumable_component = await getConsumableComponent()

    res.send(get_consumable_component)
})

//create non_consumable_component
// app.post("/create/consum_comp", async (req, res) => {
//     const {component_id, reference_id, location, specs} = req.body

//     try{    
//         const create_non_consumable_component = await createNonConsumableComponent(component_id, reference_id, location, specs)
//         res.status(201).send(create_non_consumable_component)
//     }catch(error) {
//         // Check for duplication error (probably in 'system_unit' and 'monitor' column)
//         if (error.code === "ER_DUP_ENTRY") {
//             return res.status(409).send(`Component id '${component_id}' already exist`);
//         }
//     }
// })



//[REPORT TABLE RELATED QUERY]

// get reports
app.get('/report', async (req, res) => {
    const get_report = await getReport()

    //format the date (example: from "2024-12-12T16:00:00.000Z" to "2024-12-13")
    const formatted_report = get_report.map(report => ({
        ...report, date_submitted: formatDate(report.date_submitted) 
    }))
    res.send(formatted_report)
})

// RAINNAND POST SELECTED REPORT
app.post('/report/selected', async (req, res) => {
    const { pcIds } = req.body;
    //check if the input is an array
    if (!Array.isArray(pcIds)) {
        return res.status(400).send("Invalid array format.");
    }

    const report_count = await selectedReportAll(pcIds)
    res.send({report_count: report_count})
})

// RAINNAND: ARCHIVED REPORT
app.get('/archived_report', async (req, res) => {
    const get_report = await getArchivedReport()
 
    //format the date (example: from "2024-12-12T16:00:00.000Z" to "2024-12-13")
    const formatted_report = get_report.map(report => ({
        ...report, date_submitted: formatDate(report.date_submitted), date_resolve: formatDate(report.date_resolve)
    }))
    res.status(200).send(formatted_report)
})


// create report
app.post("/create/report", async (req, res) => {
    const {room, building_code, computer_id, components, report_comment, reported_condition, submittee} = req.body

    try{    
        const create_report = await createReport(room, building_code, computer_id, components, report_comment, reported_condition, submittee)
        res.status(201).send(create_report)
    }catch(error) {
        // Check if 'computer_id' doesn't exist
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).send(`Submit report failed. Computer id '${computer_id}' doesn't exists.`);
        }
    }
})

// get number of report based in status
app.get('/report_count/:status', async (req, res) => {
    const report_status = req.params.status
    const get_report = await getReportCount(report_status)

    res.send(get_report)
})


// [REFERENCES TABLE RELATED QUERY]

// get building
app.get("/building", async (req, res) => {
    const get_building = await getBuilding()

    res.send(get_building)
})

// create building
app.post("/create/building", async (req, res) => {
    const {building_code, building_name} = req.body

    try{    
        const create_building = await createBuilding(building_code, building_name)
        res.status(201).send(create_building)
    }catch(error) {
        // Check for duplication error.
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Building code '${building_code}' already exist`);
        }
    }
})



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(process.env.PORT || 8080, () =>{
    console.log('Server is running on port 8080 ' + process.env.PORT)
})