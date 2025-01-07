/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ITable from './components/ITable';

// FAKE DATA
// import computers_data from './assets/computers_data.json'
// import rooms_data from './assets/rooms_data.json'

// 
import { Accordion, AccordionDetails, Button, CardContent, Grid2, Paper, Stack, Typography, Box, Menu } from '@mui/material';
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
import axios from 'axios'
import { MenuItem } from 'react-pro-sidebar';

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
function RoomBox({rooms, setSelectedRooms, selectedRooms, handleOpenPCTable}) {
    const handleCheckRoomBox = (e, r)=> {
        if (e.target.checked){
            setSelectedRooms([...selectedRooms, {"roomnum": r.room, "building_code": r.building_code}])
            console.log("checked room: ", r.room)
            console.log(r.building_code)
        } else {
            console.log("unchecked room: ", r.room)
            setSelectedRooms(selectedRooms.filter(sr => sr.roomnum !== r.room && sr.building_code !== r.building_code))
        }
    }
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
                <Grid2 md={6} lg={6} xl={6} key={r.room}>
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
                            onChange={(e) => handleCheckRoomBox(e, r)}
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

                                <Button variant='outlined' size='small' sx={{borderRadius: '16px', marginTop: 1}} onClick={()=> handleOpenPCTable("single", [{"roomnum": r.room, "building_code": r.building_code}])}>
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
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [roomcards, setRoomcards] = useState([]);
    const [allRooms, setAllRooms] = useState([])
    const [computersData, setComputersData] = useState([])
    const [pcDCond, setPcDCond] = useState([]);
    const [pcDStat, setPcDStat] = useState([]);
    const [totalReports, setTotalReports] = useState(0)
    const [roomCardAnchorElement, setRoomCardAnchorElement] = useState(null)
    const [roomCardAnchorData, setRoomCardAnchorData] = useState(null)
    const [pcIds, setPcIds] = useState([]);

    const fetchLabRooms = () => {
        axios.get('http://localhost:8080/laboratories').then(res => {
            const roomsData = res.data
            const roomCards_data = roomsData.map((rd) => getRoomData(
                rd.room,
                rd.building_code,
                rd.total_pc,
                rd.total_active_pc,
                rd.total_inactive_pc,
                rd.total_major_issue,
                rd.total_minor_issue,
                rd.total_reports
            ))
            setRoomcards(roomCards_data)
            setAllRooms(roomCards_data.map(r => {return {roomnum: r.room, building_code: r.building_code}}))
        }).catch(err => console.error('Error: ', err))
    }
    useEffect(() => {
        fetchLabRooms()
      }, []);

    
    // const roomCards = rooms_data.map((rd) => getRoomData(
    //     rd.room,
    //     rd.building_code,
    //     rd.total_pc,
    //     rd.total_active_pc,
    //     rd.total_inactive_pc,
    //     rd.total_major_issues,
    //     rd.total_minor_issues,
    //     rd.total_reports
    // ))

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
    const ComputersSummary = (data)=> {
        let dataPc = new Map();
        for (let obj of data) {
          if (!dataPc.has(obj['building_code'])) {
            dataPc.set(obj['building_code'], {
              active: 0,
              inactive: 0,
              good: 0,
              minor: 0,
              major: 0,
              bad: 0,
            });
          }
      
          const buildingData = dataPc.get(obj['building_code']);
      
          // Update condition counts
          if (obj['condition_id'] === 0) buildingData.good++;
          else if (obj['condition_id'] === 1) buildingData.minor++;
          else if (obj['condition_id'] === 2) buildingData.major++;
          else if (obj['condition_id'] === 3) buildingData.bad++;
      
          // Update status counts
          if (obj['computer_status'] === 1) buildingData.active++;
          else if (obj['computer_status'] === 0) buildingData.inactive++;
      
          dataPc.set(obj['building_code'], buildingData);
        }
      
        const dataset_condition = [];
        const dataset_status = []
        for (let [bd, values] of dataPc) {
          dataset_condition.push({ 
            building: bd, 
            good: values['good'],
            minor: values['minor'],
            major: values['major'],
            bad: values['bad'],
          });
          dataset_status.push({
            building: bd,
            active: values['active'],
            inactive: values['inactive']
          })
        }
        setPcDCond(dataset_condition)
        setPcDStat(dataset_status)
      }
    const getPcRows = async (type_sel, singleRoom) => {
        const pcIds_tmp =[]
        // FETCH
        let targetRooms = []
        if (type_sel === "single"){
            targetRooms =singleRoom
        } else if (type_sel === "all") {
            targetRooms = allRooms
        } else {
            targetRooms = selectedRooms
        }
        try {
            const fetched_computers = await axios({
                    url: "http://localhost:8080/rooms/computers",
                    method: 'POST',
                    headers: {
                        // Authorization if meron
                    },
                    data: {rooms: targetRooms},
                })
            const dataPc= fetched_computers.data
               
            dataPc.forEach(dpc => {
                pcIds_tmp.push(dpc.computer_id)
            });
            console.log(dataPc)
            setComputersData(dataPc)
            ComputersSummary(dataPc)
                
            setSelectedRooms([])
            console.log("pcidTmp", pcIds_tmp.length)

            const total_reports_fetched= await axios({
                url: "http://localhost:8080/report/selected",
                method: 'POST',
                headers: {
                    // Authorization if meron
                },
                data: {pcIds: pcIds_tmp},
            })

            const dataTotalReps= total_reports_fetched.data.report_count
            setTotalReports(dataTotalReps)
            
        } catch (error) {
            console.error("error ", error)
        }
    }

    const pcRows = computersData.map((cd)=> createData(
        cd.computer_id,
        cd.room,
        cd.system_unit,
        cd.monitor,
        cd.computer_status,
        cd.condition_id,
        cd.report_count
    ))

    const handleOpenPCTable = (type_sel = "all", singleRoom = []) => {
        
        getPcRows(type_sel, singleRoom)
        setIsCompTableOpen(true)
    }
    const handleRoomCardMenuOpen = () => {
        setRoomCardAnchorElement(null)
    }

    const building_data = [{building_code: 'MB', building_name:'Main Building'}, {building_code: 'ANB', building_name:'Annex Building'}, {building_code: 'MND', building_name:'Mendiola Building'}]
    const buildings = building_data.map((bd) => getBuildingData(bd.building_code, bd.building_name))



    return <div style={{display: 'flex', height:'100vh'}}>
        <DrawerMenu menuType={'laboratory'}/>
        <Stack width={'100vw'} overflow={'auto'}>
        <NavSetting/>
        <div className='mx-4'>
        <Stack direction={'row'} justifyContent={'space-between'} marginTop={2}>
            <LabelTop/>
            <div>
            {!isCompTableOpen && <>
                <Button variant='outlined' style={{marginLeft:12, borderRadius:'24px',fontSize:'14px', textTransform: 'inherit', borderColor:'black', color:'black'}} onClick={()=> handleOpenPCTable("all")}>
                View all
            </Button>
            <Button variant='outlined' style={{marginLeft:12, borderRadius:'24px',fontSize:'14px', textTransform: 'inherit', borderColor:palette.darkBlueFont, backgroundColor:palette.darkBlueFont, color:"white"}} onClick={()=> handleOpenPCTable("select")}>
                View selected
            </Button>
            </>}

            {isCompTableOpen && <Button variant='outlined' color="primary" style={{marginLeft:12, borderRadius:'24px',fontSize:'16px', textTransform: 'inherit'}} onClick={()=> setIsCompTableOpen(false)}>
                View Rooms List
            </Button>}

            </div>

        </Stack>
        {isCompTableOpen ?
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, md:12, lg:9}}>
                <ITable headCells={headCells} rows={pcRows} type="computerTable"/>
            </Grid2>
            <Grid2 size={{xs: 12, md:12, lg:3}}>
                
                    <StatBox sx={{height :'38%'}}  data={pcDCond} type="condition" keys={['good', 'minor', 'major', 'bad']}/>
                    <StatBox sx={{height:'38%', marginTop:'24px'}} data={pcDStat} type="status" keys={['inactive', 'active']}/>
                    <Box sx={{fontFamily:'Inter',textAlign:'left', border: '1px solid '+palette.strokeWeak, p:2, borderRadius:'16px'}} width={'100%'}>
                        <Typography sx={{fontSize:'16px', fontWeight:600, fontFamily:'Inter'}}>Total pending reports</Typography>
                        <Typography sx={{fontSize:'14px', fontWeight:400, fontFamily:'Inter', textAlign:'justify'}} > 
                            {totalReports === 0 
                                ? "There are currently no pending reports. Click here to submit a report" 
                                : <>The system detected <b style={{color:palette.badFont}}>{totalReports} pending report/s</b>. To submit a report, please click here or instead go to the reports section </>
                            }
                        </Typography>
                  </Box>
                
            </Grid2>
        </Grid2> :
        <Stack sx={{marginTop:2}}>
            {buildings.map((bdt, i) => {
                const filtered_rooms = roomcards.filter((rc) => rc.building_code === bdt.building_code)
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
                            <RoomBox rooms={filtered_rooms} selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms} handleOpenPCTable={handleOpenPCTable}/>
                        </Grid2>
                    </AccordionDetails>
                    </Accordion>
                </div>
            })}
        </Stack>
        
        }
        </div>
        </Stack>
        <Menu
            anchorEl={roomCardAnchorElement}
            open={Boolean(roomCardAnchorElement)}
            onClose={handleRoomCardMenuOpen}
        >
            <MenuItem>
                1
            </MenuItem>
            <MenuItem>
                2
            </MenuItem>
        </Menu>


        
    </div>
}

export default Laboratory;