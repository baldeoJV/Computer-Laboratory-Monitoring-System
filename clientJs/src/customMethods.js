import axios from "axios"

// REPORT MODAL.JSX
export const getRoomsByBuilding = (reportedBuildingInner, setTargetedRooms) =>{
    try {
        axios.get('http://localhost:8080/laboratories').then(d => {
            const roomsData = d.data
            setTargetedRooms(roomsData.filter(room => room.building_code === reportedBuildingInner)
            .map(room => String(room.room)))
        })
    } catch (error) {
        console.error("ERROR: ",error)
    }
}
export const getComputersByRoom = (reportedRoom, setTargetedComputerIDs, reportedBuilding) => {
    if (reportedRoom === '' || reportedRoom === null) {
        // console.log("NULL ROOM");
        setTargetedComputerIDs([]);
    } else {
        // console.log("reportedRoom: ", [{ roomnum: Number(reportedRoom), building_code: reportedBuilding }]);

        axios.post("http://localhost:8080/rooms/computers", {rooms: [
            { roomnum: Number(reportedRoom), building_code: reportedBuilding }
        ]}).then(d => {
            const computersData = d.data;
            setTargetedComputerIDs(computersData.filter(cd => cd.room === reportedRoom).map(cdf => String(cdf.computer_id)));
        }).catch(err => console.error("ERROR: ", err));
    }
}
// ////////////////////////////////////////////////

