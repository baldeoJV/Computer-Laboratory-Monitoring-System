import express from 'express'

import { getRoom, createRoom, getComputer, createComputer, getRoomComputer } from './be_comlab.js'

const app = express()

app.use(express.json())

//[GET]

//getRoom
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

//get room code of a room (tentative)
app.get("/laboratories/:room_id/room_code", async (req, res) => {
    
    const room_id = req.params.room_id
    const get_room = await getRoom(room_id)

    // Check if room exists
    if (!get_room) {
        return res.status(404).send(`Room ID: ${room_id} doesn't exist.`);
    }

    const {room_code} = get_room
    res.send(`Room ID: ${room_id} \n Room Code: ${room_code}`)
    
})

//get computer
app.get("/computer", async (req, res) => {
    const get_computer = await getComputer()

    res.send(get_computer)
})

//get computer in a specific room
app.get("/computer/:room", async (req, res) => {
    const room = req.params.room

    //check if the format of the room is correct
    const format = /^\d+[a-zA-Z]+$/;

    if (!format.test(room)) {
        return res.status(400).send("Invalid room. Perhaps you forgot to include the building code (e.g. '510MB')");
    }

    const result = room.match(/(\d+)([a-zA-Z]+)/); //split the numbers and letters

    const room_number = result[1]; // first three numbers
    const building_code = result[2];   // letters

    const get_computer = await getRoomComputer(room_number, building_code)

    if (!get_computer.length) {
        // No records found
        return res.status(404).send(`Room ${room} doesn't have computers.`);
    }

    res.send(get_computer)
})



//[POST]

//create room
app.post("/laboratories", async (req, res) => {
    const {room, building_code} = req.body
    const create_room = await createRoom(room, building_code)
    res.status(201).send(create_room)
})

//create computer
app.post("/computer", async (req, res) => {
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




app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () =>{
    console.log('Server is running on port 8080')
})