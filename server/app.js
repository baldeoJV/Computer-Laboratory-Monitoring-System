import express from 'express'

import { getTable, getRoom } from './be_comlab.js'

const app = express()

app.get("/:table", async (req, res) => {
    const {table} = req.params

    const get_room = await getTable(table)

    res.send(get_room)
})

app.get("/laboratories", async (req, res) => {
    const get_room = await getRoom()

    console.log("Table: ")

    res.send(get_room)
})

app.get("/laboratories/:room_id", async (req, res) => {
    const {room_id} = req.params

    const get_room = await getRoom(room_id)

    res.send(get_room ? get_room : `Room id: ${room_id} doesn't exist`)
})

app.get("/laboratories/:room_id/room_code", async (req, res) => {

    const {room_id} = req.params
    const get_room = await getRoom(room_id)

    // Check if room exists
    if (!get_room) {
        return res.status(404).send(`Room ID: ${room_id} doesn't exist.`);
    }

    const {room_code} = get_room
    res.send(`Room ID: ${room_id} \n Room Code: ${room_code}`)
    
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () =>{
    console.log('Server is running on port 8080')
})