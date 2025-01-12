/* eslint-disable no-unused-vars */
import axios from "axios"
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import palette from "./assets/palette";
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';





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

// EXPORTERTS ALL TABLES
export const handleExportRows = (rows, columns, name, downloadType, optionalIndications) => {
    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    const tableHeaders = columns.map((c) => c.header);
    const tableData = rows.map((row) => 
        columns.map((col) => {
            // if a column of a row is an object, join all the value of that object.
            let rowVal = row.original[col.accessorKey]
            if ((typeof rowVal) === "object"){
                rowVal = Object.entries(rowVal)
                            .filter(([k, v])=> v)
                            .map(([k, v], i) => k.charAt(0).toUpperCase() + k.replace("_", " ").slice(1) + ": " + optionalIndications[v])
            }
            return rowVal
        })
    );
    console.log(rows)

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