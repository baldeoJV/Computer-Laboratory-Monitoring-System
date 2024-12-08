/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ITable from './components/ITable';
import computers_data from './assets/computers_data.json'
import rooms_data from './assets/rooms_data.json'
import { Accordion, AccordionDetails, Button, CardContent, Grid2, Paper, Stack, Typography, Box } from '@mui/material';
import StatBox from './components/StatBox';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types'
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DrawerMenu from './components/DrawerMenu'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import palette from './assets/palette';
import NavSetting from './components/NavSetting';


function createData(computer_id, room, system_unit, monitor, status, condition, pending_reports){
    return {room, computer_id, system_unit, monitor, condition, status, pending_reports}
}

function getRoomData(room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issues, total_minor_issues, total_reports){
    return {room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issues, total_minor_issues, total_reports}
}
function getBuildingData(building_code, building_name){
    return {building_code, building_name}
}

function LabelTop() {
    return <div className="label">
    <div className="text-wrapper">Laboratory</div>
    </div>
}
function RoomBox({rooms}) {
    const stacksx = {
        textAlign: 'left', 
        width: '100%', 
        paddingTop: 1.2,
        paddingBottom:0.2, 
        borderTopLeftRadius: '16px', 
        borderTopRightRadius: '16px',
        transition: 'background-color 0.15s ease-in-out', 
    }
    const typographysx = {
        color: palette.txtStrong, 
        fontFamily: 'Inter, sans-serif', 
        fontWeight: 600, 
        width: '100%',
        marginLeft: 2,
        marginBottom: 1,
    }
    const res = () => {
        
        return rooms.map(r => {

            return (
                <Grid2 item="true" md={6} lg={6} xl={6} key={r.room}>
                    <CardContent 
                        key={r.room} 
                        sx={{
                            border: `1.5px solid ${palette.strokeMain}`, 
                            borderRadius: '16px',
                            width: '270px', 
                            padding:0,
                        }}
                    >
                        <Checkbox 
                            disableRipple
                            sx={{ 
                                borderBottom: `1px solid ${palette.strokeMain}`,
                                borderRadius: 0,
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                transition: 'all 0.2s ease-in-out',
                            }}
                            icon={
                                <Stack 
                                    direction="row" 
                                    sx={{
                                        ...stacksx
                                    }}
                                >
                                    <Typography
                                        variant='button'
                                        sx={{ 
                                            ...typographysx
                                        }}
                                    >
                                    <Typography
                                            sx={{letterSpacing:1.3, fontSize:'14px'}}
                                        >
                                            {`Room ${r.room}-${r.building_code}`}
                                        </Typography>
                                    </Typography>
                                </Stack>
                            }
                            checkedIcon={
                                <Stack 
                                    direction="row" 
                                    sx={{
                                        ...stacksx,
                                        backgroundColor: '#4681f4', 
                                    }}
                                >
                                    <Typography
                                        variant="button"
                                        sx={{ 
                                            ...typographysx,
                                            color: 'white', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between', 
                                            width: '100%', 
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                letterSpacing: 1.3, 
                                                fontSize: '14px',
                                                whiteSpace: 'nowrap', 
                                            }}
                                        >
                                            {`Room ${r.room}-${r.building_code}`}
                                        </Typography>

                                        <Typography
                                            sx={{ 
                                                lineHeight: 1.2,
                                                fontSize: '0.75rem', 
                                                fontWeight: 700,
                                                display: { xs: 'none', md: 'none', lg:'inline-block' }, 
                                                marginLeft: '6px', 
                                                marginRight:2,
                                                color: '#4681f4',
                                                backgroundColor: 'white',
                                                padding: 0.3,
                                                paddingRight: 0.5,
                                                paddingLeft: 0.5,
                                                borderRadius: '16px',
                                            }}
                                        >
                                            {"selected"}
                                        </Typography>
                                    </Typography>
                                </Stack>

                            }
                        />


                        <Box sx={{margin:2, marginBottom:0}}>
                            <Stack>
                                <Stack direction={'row'} width={1} textAlign={'center'} paddingBottom={1}>
                                    <Stack width={1/3}>
                                        <Typography variant='caption' sx={{color: palette.txtStrong, fontFamily: 'Inter, sans-serif' }}>Active</Typography>
                                        <Typography variant='h6'>{r.total_active_pc}</Typography>
                                    </Stack>
                                    <Stack width={1/3}>
                                        <Typography variant='caption' sx={{color: palette.txtStrong, fontFamily: 'Inter, sans-serif' }}>Inactive</Typography>
                                        <Typography variant='h6'>{r.total_inactive_pc}</Typography>
                                    </Stack>
                                    <Stack width={1/3}>
                                        <Typography variant='caption' sx={{color: palette.txtStrong, fontFamily: 'Inter, sans-serif' }}>Reports</Typography>
                                        <Typography variant='h6' sx={{color: palette.bad}} >{r.total_reports}</Typography>
                                    </Stack>
                                </Stack>

                                <Button variant='outlined' size='small' sx={{borderRadius: '16px', marginTop: 1}}>
                                    View Table
                                </Button>
                            </Stack>

                        </Box>

                    </CardContent>
                </Grid2>
            );
            
        })
    }


    return res()
}
RoomBox.propTypes = {
    rooms: PropTypes.array
}
function Laboratory() {
    const [isCompTableOpen, setIsCompTableOpen] = useState(false);
    const headCells = [
        {
            id: "computer_id",
            numeric: false,
            disablePadding: true,
            label: "Computer ID",
        },
        {
            id: "room",
            numeric: false,
            disablePadding: true,
            label: "Room",
        },
        {
            id: "system_unit",
            numeric: false,
            disablePadding: true,
            label: "System Unit Tag",
        },
        {
            id: "monitor",
            numeric: false,
            disablePadding: true,
            label: "Monitor Tag",
        },
        {
            id: "condition",
            numeric: false,
            disablePadding: true,
            label: "Condition",
        },
        {
            id: "status",
            numeric: false,
            disablePadding: true,
            label: "Status",
        },
        {
            id: "pending_reports",
            numeric: true,
            disablePadding: false,
            label: "Pending Reports",
        },
    ]
    const rows = computers_data.rows.map((cd)=> createData(
        cd.computer_id,
        cd.room,
        cd.system_unit,
        cd.monitor,
        cd.status,
        cd.condition_id,
        40 //total pending reports
    ))
    const roomCards = rooms_data.map((rd) => getRoomData(
        rd.room,
        rd.building_code,
        rd.total_pc,
        rd.total_active_pc,
        rd.total_inactive_pc,
        rd.total_major_issues,
        rd.total_minor_issues,
        rd.total_reports
    ))
    const building_data = [{building_code: 'MB', building_name:'Main Building'}, {building_code: 'ANB', building_name:'Annex Building'}, {building_code: 'MND', building_name:'Mendiola Building'}]
    const buildings = building_data.map((bd) => getBuildingData(bd.building_code, bd.building_name))



    return <div style={{display: 'flex', height:'100vh'}}>
        <DrawerMenu/>
        <Stack width={'100vw'}>
        <NavSetting/>
        <div className='mx-4'>
        <Stack direction={'row'}>
            <LabelTop/>
            <Button variant='outlined' onClick={() => setIsCompTableOpen(!isCompTableOpen)}>
                Hello
            </Button>
        </Stack>
        {isCompTableOpen ?
        <Grid2 container spacing={2}>
            <Grid2 size={9}>
                <ITable headCells={headCells} rows={rows} type="computerTable"/>
            </Grid2>
            <Grid2 size={3}>
                <div style={{height:'100%'}}>
                    <StatBox sx={{height :'38%'}} head={'Status'}/>
                    <StatBox sx={{height:'38%', marginTop:'24px'}} head={'Condition'}/>
                    <StatBox sx={{height:'15%', marginTop:'24px'}} head={'Reports'}/>
                </div>
            </Grid2>
        </Grid2> :
        <Stack sx={{marginTop:2}}>
            {buildings.map((bdt, i) => {
                const filtered_rooms = roomCards.filter((rc) => rc.building_code === bdt.building_code)
                return <div key={`${bdt.building_code}-${i}`} style={{marginBottom: '4px', border:'1px solid #CCCCCC', borderRadius:'2px'}}>
                    <Accordion sx={{paddingTop:1, paddingBottom:2}} defaultExpanded={(i === 0) ? true : false}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            {bdt.building_name}
                        </AccordionSummary>
                        <AccordionDetails>
                        <Grid2 container spacing={2}>
                            <RoomBox rooms={filtered_rooms}/>
                        </Grid2>
                    </AccordionDetails>
                    </Accordion>
                </div>
            })}
        </Stack>
        
        }
        </div>
        </Stack>



        
    </div>
}

export default Laboratory;