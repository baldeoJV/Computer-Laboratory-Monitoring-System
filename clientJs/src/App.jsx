/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import './App.css'
import axios from "axios";
import DrawerMenu from './components/DrawerMenu'
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SideMenu } from './components/SideMenu'
import Laboratory from './Laboratory'
import { Box, Card, CardActions, CardContent, Grid, Grid2, IconButton, Link, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import palette from './assets/palette';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import NavSetting from './components/NavSetting';
import StatBox from './components/StatBox';

import { getValueToPositionMapper } from '@mui/x-charts';

// FAKE DATA
// import computersData from './assets/computers_data.json';
// import rooms_data from './assets/rooms_data.json'
// import reports_data from './assets/reports_data.json'

import building_names from './assets/building_names.json'

// 
import { Button } from 'bootstrap';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import { IoIosWarning } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';

function LabelTop() {
  return <div className="label">
  <div className="text-wrapper">Dashboard</div>
  </div>
}
function DashboardReportTable({rows}){
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const a_sx = {fontSize:'small', fontWeight:'600', py:2}
  return <Stack sx={{border:'1px solid #DADADA', mt:2}}>
    <TableContainer component={Paper} sx={{overflow:'auto', maxHeight:'430px', minHeight:'430px'}}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell sx={a_sx}>Room</TableCell>
            <TableCell align='left' sx={a_sx}>Computer</TableCell>
            <TableCell align='left' sx={a_sx}>Comments</TableCell>
            <TableCell sx={a_sx}>Components</TableCell>
            <TableCell sx={a_sx}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
            : rows
            ).map((rr,i) => {
              const orr= Object.keys(rr.components)
              
              const comp_filter = orr.filter(r => rr['components'][r] !== null).join(', ')
              return <TableRow key={'rr - '+i}>
                <TableCell component={'th'}>{`${rr.room}${rr.building_code}`}</TableCell>
                <TableCell align='left'>{rr.computer_id}</TableCell>
                <TableCell align='left' sx={{}}>{rr.report_comment}</TableCell>
                <TableCell >{comp_filter}</TableCell>
                <TableCell >{rr.date_submitted}</TableCell>
              </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      sx={{
          backgroundColor: 'white',
          '.MuiInputBase-root':{
              marginRight:'1em'
          },
          '.MuiTablePagination-displayedRows': {
              marginTop: '1em', 
          },
          '.MuiTablePagination-selectLabel': {
              marginTop: '1em', 
          }
      }}
      rowsPerPageOptions={[5,10,20,30]}
      component={'div'}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Stack>
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

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard').then(res => {
      const data = res.data
      console.log(data.formatted_report)

      let totalrep = 0;
      let roomcount = 0

      data.rooms.forEach(rd => {
        totalrep += rd.total_reports;
        roomcount++
      });

      setRoomsData(data.rooms)
      setComputersData(data.computers)
      setReportsData(data.formatted_report)
      setTotalReports(totalrep);
      setTotalRooms(roomcount)



    }).catch(err => console.error('Error: ', err))

  }, []);


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
    elms.push(<Card key={`rd - ${rd.room}`} sx={{border:'1px solid '+palette.strokeMain , m:0, p:1.5, borderRadius: '12px', width:'136px', cursor:'pointer'}}>
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
    </Card>)
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
            <Grid2 item size={{xs: 12, md:12, lg:9}}>
              {/* Statboxes */}
              <Grid2 container spacing={2}>
                <Grid2 item size={{xs: 12, md:12,lg:6}}>
                  <StatBox head={"Computers Condition"} sx={statboxStyle} data={dataset_condition} type="condition" keys={['good', 'minor', 'major', 'bad']}/>
                </Grid2>
                <Grid2 item size={{xs: 12, md:12, lg:6}}>
                  <StatBox head={"Computers Status"} sx={statboxStyle} data={dataset_status} type="status" keys={['inactive', 'active']}/>
                </Grid2>
              </Grid2>
              {/* Report */}
              <DashboardReportTable rows={reportsData}/>
            </Grid2>
            {/* TYPE B for the room summary, and two buttons below */}
            <Grid2 item size={{xs:12, md:12, lg:3}}>
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

