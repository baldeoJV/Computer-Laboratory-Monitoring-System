/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import './App.css'
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import DrawerMenu from './components/DrawerMenu'
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SideMenu } from './components/SideMenu'
import { Box, Card, CardActions, CardContent, Grid, Grid2, IconButton, Link, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import palette from './assets/palette';
import NavSetting from './components/NavSetting';
import StatBox from './components/StatBox';
import building_names from './assets/building_names.json'
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import { IoIosWarning } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import ITableV2 from './components/ITableV2';
import { handleErrorFetch} from './customMethods';
import useStore from './useStore';
import { SnackbarProvider, useSnackbar } from 'notistack';

function createData(report_id, computer_id, room,  building_code, components, date_submitted, submittee, comment){
  return {report_id, computer_id, room,  building_code, components, date_submitted, submittee,  comment}
}
function LabelTop() {
  return <div className="label">
  <div className="text-wrapper">Dashboard</div>
  </div>
}

const clickableStyle = {
  borderRadius: '16px', 
  border: `0.5px solid ${palette.strokeMain}`,
  color: '#000626',
  backgroundColor: 'white',
  width: '100%',
  padding: '14px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  alignContent:'center',
  mt:2,
  cursor:'pointer',
  minHeight:'110px'
}
const statboxStyle = {
  width:'500px',
  height:'25vh',
  minHeight:'267px',
  minWidth:'328px',
  marginRight:'20px',
}
function App()  {
  const [totalReports, setTotalReports] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0)
  const [roomsData, setRoomsData] = useState([]);
  const [computersData, setComputersData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [showUi, setShowUi] = useState(false);
  const navigate = useNavigate()
  const {errorMessage} = useStore()
  


  useEffect(() => {
    axios.get('/api/dashboard').then(res => {
      const data = res.data
      

      let totalrep = 0;
      let roomcount = 0

      data.rooms.forEach(rd => {
        totalrep += rd.total_reports;
        roomcount++
      });
      const reportRows = data.formatted_report.map((rd) => createData( 
        rd.report_id, 
        rd.computer_id,
        rd.room, 
        rd.building_code,
        rd.components,
        rd.date_submitted,
        rd.submittee,
        rd.report_comment
    ))
      setShowUi(true)
      setRoomsData(data.rooms)
      setComputersData(data.computers)
      setReportsData(reportRows)
      setTotalReports(totalrep);
      setTotalRooms(roomcount)
    }).catch(err => handleErrorFetch(err, navigate))
  }, [navigate]);

  const headCellsV2 = useMemo(() => [
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
        accessorKey: "components",
        header: "Reported Components",
        Cell: ({cell}) => {
            const componentsList = useMemo(() => {
                return Object.entries(cell.getValue())
                    .filter(([k, v]) => v)
                    .map(([k, v]) => k).join(', ');
            }, [cell]);
            return <Typography sx={{fontFamily:'Inter'}}>{componentsList}</Typography>
        }
    },
    {
        accessorKey: "date_submitted",
        header: "Date Submitted",

    },
], []);


  const bdMap = building_names.reduce((m, bd) => {
    m[bd.building_code] = bd.building_name
    return m
  }, {})
  const ComputersSummary = ()=> {
    let dataPc = new Map();
    for (let obj of computersData) {
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
    return [dataset_condition, dataset_status];
  }



  let elms = []
  for (let i = 0; i < 8; i++){
    if (i > roomsData.length -1 ) break;
    let rd = roomsData[i]
    let mr = rd.total_reports > 0
    let iconsx= {
      color: mr? palette.badFont : palette.darkBlueFont, 
      borderRadius:'16px', 
    }
    let reportLabel = mr ? rd.total_reports+" pending reports" : "No pending reports"
    let bdLabel = bdMap[rd.building_code].replace("Building", "Bd.")
    elms.push(
      <NavLink
      key={`nl - ${rd.room} - ${rd.building_code}`} 
      to={'/laboratory'}
      state={{
        urlRoom: rd.room, 
        urlBuilding: rd.building_code
      }}
      style={{ textDecoration: 'none' }}
      >
      <Card  sx={{border:'1px solid '+palette.strokeMain , m:0, p:1.5, borderRadius: '12px', width:'136px', cursor:'pointer'}}>
        <Stack direction={'row'} width={'100%'}>
        <Stack mb={0.4}>
        <Typography sx={{color: 'text.secondary', fontSize:'12px',fontFamily:'Inter'}}>
          {bdLabel}
        </Typography>
        <Typography variant='h6' component='div' sx={{fontFamily:'Inter'}} >
          {`${rd.room}${rd.building_code}`}
        </Typography>
        </Stack>
        <div style={{width:'100%', textAlign:'right'}}>
        {mr ? <GppMaybeRoundedIcon sx={iconsx} fontSize='medium'/>:<GppGoodRoundedIcon sx={iconsx} fontSize='medium'/>}
        </div>
        
        </Stack>


        <Typography fontSize={'11px'} sx={{color:mr? palette.badFont : palette.darkBlueFont,fontFamily:'Inter'}}>
        {reportLabel}
        </Typography>
      </Card>
      </NavLink>
    )
  }
  

  const [dataset_condition, dataset_status] = ComputersSummary()

  return (
    <div style={{display: 'flex', height:'100vh',}}>
      <DrawerMenu menuType={'dashboard'}/>
      <Stack width={'100vw'} overflow={'auto'}>
        <NavSetting/>
        <div className='mx-4'>
          <LabelTop/>
          {/* CONTAINER OF THE WHOLE THING */}
          <Grid2 container spacing={4} sx={{mt:2}} >
            {/* TYPE A for the 2 statbox and report table */}
            <Grid2 size={{xs: 12, md:12, lg:9}}>
              {/* Statboxes */}
              <Grid2 container spacing={2}>
                <Grid2 size={{xs: 12, md:12,lg:6}}>
                  <StatBox head={"Computers Condition"} sx={statboxStyle} data={dataset_condition} type="condition" keys={['good', 'minor', 'major', 'bad']}/>
                </Grid2>
                <Grid2 size={{xs: 12, md:12, lg:6}}>
                  <StatBox head={"Computers Status"} sx={statboxStyle} data={dataset_status} type="status" keys={['inactive', 'active']}/>
                </Grid2>
              </Grid2>
              {/* Report */}
              {/* <DashboardReportTable rows={reportsData}/> */}
              <ITableV2 
                    columns={headCellsV2} 
                    data={reportsData} 
                    type={'dashboardTable'} 
                    extraActionsTable={{
                        initialState: { density: 'compact' },
                        muiTableContainerProps: { sx: { maxHeight: '400px', minHeight:'400px'} },
                    }}
                />
            </Grid2>
            {/* TYPE B for the room summary, and two buttons below */}
            <Grid2 size={{xs:12, md:12, lg:3}}>
              {/* room */}
              <Box 
                style={{
                  borderRadius: '16px', 
                  border: `0.5px solid ${palette.strokeMain}`,
                  color: '#000626',
                  backgroundColor: 'white',
                  width: '100%',
                  padding: '16px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              > 
                <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
                  <Typography variant='h6' sx={{fontWeight:700, fontFamily:'Inter'}}>
                    Rooms - <b>{totalRooms}</b>
                  </Typography>
                  
                  {totalRooms > 8 && 
                    <NavLink to={'/laboratory'}>
                      <Link component={'button'} variant='body2'>
                        View more <IoIosArrowForward />
                      </Link>
                    </NavLink>
                  }


                </Box>
                <Grid2 spacing={2} container sx={{justifyContent:'center'}}>
                  {elms}
                </Grid2>
              </Box>
              {/* CLICKABLES */}
              <Box sx={clickableStyle}> 
                
                <Stack direction={'row'} sx={{alignContent:'center'}}>
                  <div style={{alignContent:'center', padding:'2px', marginRight:10}}>
                    <IoIosWarning size={30}/>
                  </div>
                  
                  <Box sx={{fontFamily:'Inter',textAlign:'left'}} width={'100%'}>
                    <Typography sx={{fontSize:'16px', fontWeight:600, fontFamily:'Inter'}}>Total pending reports</Typography>
                    <Typography sx={{fontSize:'14px', fontWeight:400, fontFamily:'Inter', textAlign:'justify'}} >                    {totalReports === 0 
                    ? "There are currently no pending reports. Click here to submit a report" 
                    : <>The system detected <b style={{color:palette.badFont}}>{totalReports} pending report/s</b>. To submit a report, please click here or instead go to the reports section </>
                    }</Typography>
                  </Box>
                </Stack>

              </Box>
              <Box sx={clickableStyle}> 
                
                <Stack direction={'row'} sx={{alignContent:'center'}}>
                  <div style={{alignContent:'center', padding:'2px', marginRight:10}}>
                    <IoMdDownload size={30}/>
                  </div>
                  
                  <Box sx={{fontFamily:'Inter',textAlign:'left'}} width={'100%'}>
                    <Typography sx={{fontSize:'16px', fontWeight:600, fontFamily:'Inter'}}>Downloads available</Typography>
                    <Typography sx={{fontSize:'14px', fontWeight:400, fontFamily:'Inter', textAlign:'left'}} >
                      Components, computers, and reports summary are available for download 
                    </Typography>

                  </Box>
                </Stack>

              </Box>
            </Grid2>
          </Grid2>
        </div>
      </Stack>
    </div>
  )
}

export default App

