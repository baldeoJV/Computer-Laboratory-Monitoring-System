/* eslint-disable no-unused-vars */
import axios from "axios"
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import palette from "./assets/palette";
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";




function handleErrorLogin (err, navigate) {
    navigate('/')
}
export const handleErrorFetch = (err, navigate) => {
    // const rs = err.response.data
    // const isForcedLogin = rs.forceLogin
    // const err_msg = rs.error_message
    // const err_status = rs.status
    if (err.response.data.forceLogin)  {
    handleErrorLogin(err, navigate)
    }
    else {
    console.error("ERROR DB: ", err)
    }
}
// export const handleErrorDb = ()


// REPORT MODAL.JSX
export const getRoomsByBuilding = (reportedBuildingInner, setTargetedRooms, permissionType = "admin") =>{
    try {
        const url = (permissionType === "admin") ? `/api/laboratories`: '/api/guest/laboratories'
        console.log(url);
        axios.get(url).then(d => {
            const roomsData = d.data
            setTargetedRooms(roomsData.filter(room => room.building_code === reportedBuildingInner)
            .map(room => String(room.room)))
        })
    } catch (error) {
        console.error("ERROR: ",error)
    }
}
export const getComputersByRoom = (reportedRoom, setTargetedComputerIDs, reportedBuilding, permissionType, setReportedRoom) => {
    if (reportedRoom === '' || reportedRoom === null) {
        // console.log("NULL ROOM");
        setTargetedComputerIDs([]);
    } else {
        // console.log("reportedRoom: ", [{ roomnum: Number(reportedRoom), building_code: reportedBuilding }]);
        const url = (permissionType === "admin") ? "/api/rooms/computers" : "/api/guest/rooms/computers"
        console.log(url);
        
        axios.post(url, {rooms: [
            { roomnum: Number(reportedRoom), building_code: reportedBuilding }
        ]}).then(d => {
            const computersData = d.data;
            // console.log(reportedRoom);
            // console.log(computersData.map(c=> c));
            
            
            // console.log(computersData.filter(cd => cd.room === reportedRoom).map(cdf => String(cdf.computer_id)));
            
            setTargetedComputerIDs(computersData.filter(cd => String(cd.room) === String(reportedRoom)).map(cdf => String(cdf.computer_id)));
        }).catch(err => {
            alert(err.response.data)
            setReportedRoom('')
            setTargetedComputerIDs([]);
        });
    }
}
// ////////////////////////////////////////////////

// EXPORTERTS ALL TABLES
export const handleExportRows = (rows, columns, name, downloadType, optionalIndications) => {
    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });
    // console.log(rows.map(r=>r.original))
    const tableHeaders = columns.map((c) => c.header);    
    const tableData = rows.map((row) => 
        columns.map((col) => {
            // if a column of a row is an object, join all the value of that object.
            let rowVal = row.original[col.accessorKey || col.id]
            
            if ((typeof rowVal) === "object"){
                rowVal = Object.entries(rowVal)
                            .filter(([k, v])=> v)
                            .map(([k, v], i) => {
                                const res = k.charAt(0).toUpperCase() + k.replace("_", " ").slice(1) + ": " + optionalIndications[v]
                                return res
                            })
            }
            return rowVal
        })
    );
    

    if (downloadType.toLowerCase() === 'pdf'){
        const doc = new jsPDF();
        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
        });

        doc.save(`${name}.pdf`);
    } else if (downloadType.toLowerCase() === 'csv'){
        const csv = generateCsv(csvConfig)(tableData);
        download(csvConfig)(csv);
    }
};


// DESIGNS
export const getChipTheme_condition = (condition) => {
    const baseColor = condition === 0 ? palette.goodBg :
                      condition === 1 ? palette.minorBg :
                      condition === 2 ? palette.majorBg :
                      condition === 3 ? palette.badBg : palette.darkBlue;
    const fontColor = condition === 0 ? palette.goodFont :
                        condition === 1 ? palette.minorFont :
                        condition === 2 ? palette.majorFont :
                        condition === 3 ? palette.badFont : "#333333";
    // console.log("Condition: " +condition)
    return createTheme({
        palette: {
            custom: {
                main: baseColor,
                contrastText: getContrastRatio(baseColor, '#fff') > 4.5 ? '#fff' : '#111',
                fontColor: fontColor,
            },
        },
    });
};

export const getChipTheme_resolve_reject = (s) => {
    const baseColor = s === 1 ? palette.goodBg :palette.badBg;
    const fontColor = s === 1 ? palette.goodFont : palette.badFont;
    return createTheme({
        palette: {
            custom: {
                main: baseColor,
                contrastText: getContrastRatio(baseColor, '#fff') > 4.5 ? '#fff' : '#111',
                fontColor: fontColor,
            },
        },
    });
};