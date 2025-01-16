/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Grid2, Stack } from '@mui/material';
import { Accordion, AccordionDetails,CardContent,Paper,Typography, Box, Menu, Chip, ListItemIcon } from '@mui/material';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ITableV2 from './components/ITableV2';
import {handleErrorFetch} from './customMethods';
import palette from './assets/palette';
import { useNavigate } from 'react-router-dom';
const reports_condition_indication = ["Good", "Minor issue", "Major issue", "Bad"]

function createData(report_id, computer_id, room, building_code, components, date_submitted, submittee,  comment, date_archived, status){
    return {report_id, computer_id, room,  building_code, status, components, date_submitted, submittee,  comment, date_archived, }
}
function Archived() {
    const [archivedReportsData, setArchivedReportsData] = useState([]);

    const navigate = useNavigate()
    useEffect(()=> {
        axios.get('/api/archived_report').then( res => {
            const data = res.data
            const rows = data.map((rd) => createData( 
                rd.report_id, 
                rd.computer_id,
                rd.room, 
                rd.building_code,
                rd.components,
                rd.date_submitted,
                rd.submittee,
                rd.report_comment,
                rd.date_resolve,
                rd.report_status,
            ))
            setArchivedReportsData(rows)
        }).catch(err => handleErrorFetch(err, navigate))
    }, [navigate])

    const headCellsV2 = useMemo(() => [
        {
            accessorKey: "report_id",
            header: "Report ID",
            size:20,

        },
        {
            accessorKey: "computer_id",
            header: "Computer ID",
            size:20,
        },
        {
            accessorKey: "room",
            header: "Room",
            size:20,
        },
        {
            accessorKey: "building_code",
            header: "Building",
            size:20,
        },
        {
            accessorKey: "status",
            header: "Report Status",
            size:20,
            Cell: ({cell}) => {
                const status_data  = cell.getValue()
                const label = status_data === 1 ? "Resolved" : "Rejected"
                return <Typography 
                    sx={{
                        m: 0.5,
                        p: 0.5,
                        fontWeight:'600',
                        color: status_data === 1 ? palette.goodFont : palette.badFont
                    }}
                >
                    {label}
                </Typography>
            }
        },
        {
            accessorKey: "components",
            header: "Reported Components",
            Cell: ({cell}) => {
                const componentsList = useMemo(() => {
                    return Object.entries(cell.getValue())
                        .filter(([k, v]) => v)
                        .map(([k, v], i) => ({
                            key: i,
                            label: `${k.charAt(0).toUpperCase() + k.replace("_", " ").slice(1)}: ${reports_condition_indication[v]}`,
                        }));
                }, [cell]);
                // console.log(componentsList)
                return componentsList.map(({key, label, theme}, i)=> (
                        <React.Fragment key={key}> 
                        {i % 2 === 0 && <br/>}
                        <Chip
                            sx={{
                                m: 0.5,
                                p: 0.5,
                                fontWeight:'600',
                            }}
                            label={label}
                        />
                        </React.Fragment>

                ))
            }
        },
        {
            accessorKey: "date_submitted",
            header: "Date Submitted",

        },
        {
            accessorKey: "date_archived",
            header: "Date Archived",

        },
        {
            accessorKey: "submittee",
            header: "Submittee",

        },
    ], []);

    return <div style={{display: 'flex', height:'100vh'}}>
    <DrawerMenu menuType={'reports'}/>
    <Stack width={'100vw'}>
        <NavSetting/>
        <div className='mx-4'>
            <div className="label">
                <div className="text-wrapper">Archived Reports</div>
            </div>
            <ITableV2 
                    columns={headCellsV2} 
                    data={archivedReportsData} 
                    type={'archivedTable'} 
                    extraActionsTable={{
                        initialState: { density: 'compact' },
                        positionActionsColumn:'first',
                        // enableColumnOrdering: true,
                        muiTableContainerProps: { sx: { maxHeight: '600px', minHeight:'600px' } },
                        renderDetailPanel:(({row}) => {
                            const menuRow = row.original
                            return <Box
                                sx={{
                                    display: 'grid',
                                    margin: 'auto',
                                    gridTemplateColumns: '1fr 1fr',
                                    width: '100%',
                                }}
                            >
                                <Typography>{menuRow.comment}</Typography>    
                            </Box>
                        }),
                    }}
                />
        </div>
    </Stack>

</div>;
}

export default Archived;