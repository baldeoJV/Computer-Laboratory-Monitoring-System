/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Button, Grid2, Stack } from '@mui/material';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
import { Accordion, AccordionDetails,CardContent,Paper,Typography, Box, Menu, Chip, ListItemIcon } from '@mui/material';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ITableV2 from './components/ITableV2';
import { createTheme, ThemeProvider, alpha, getContrastRatio, styled } from '@mui/material/styles';
import { getChipTheme_condition, handleErrorFetch} from './customMethods';
import {MRT_ActionMenuItem,} from 'material-react-table';
import ReportModal from './components/ReportModal';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import palette from './assets/palette';
import {SnackbarProvider, enqueueSnackbar} from 'notistack'
const reports_condition_indication = ["Good", "Minor issue", "Major issue", "Bad"]
function createData(report_id, computer_id, room,  building_code, components, date_submitted, submittee, comment){
    return {report_id, computer_id, room,  building_code, components, date_submitted, submittee,  comment}
}
function Reports() {
    const [reportsData, setReportsData] = useState([]);
    const navigate = useNavigate()
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const fetchReport = useCallback(()=>{
        axios.get('/api/report').then( res => {
            const data = res.data
            const rows = data.map((rd) => createData( 
                rd.report_id, 
                rd.computer_id,
                rd.room, 
                rd.building_code,
                rd.components,
                rd.date_submitted,
                rd.submittee,
                rd.report_comment
            ))
            setReportsData(rows)
        }).catch(err => handleErrorFetch(err, navigate))
    }, [navigate])
    useEffect(()=> {
        fetchReport()
    }, [])
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
            accessorKey: "components",
            header: "Reported Components",
            Cell: ({cell}) => {
                const componentsList = useMemo(() => {
                    return Object.entries(cell.getValue())
                        .filter(([k, v]) => v)
                        .map(([k, v], i) => ({
                            key: i,
                            label: `${k.charAt(0).toUpperCase() + k.replace("_", " ").slice(1)}: ${reports_condition_indication[v]}`,
                            theme: getChipTheme_condition(v),
                        }));
                }, [cell]);
                return componentsList.map(({key, label, theme}, i)=> (
                    <ThemeProvider theme={theme} key={key}>
                        {i % 2 === 0 && <br/>}
                        <Chip
                            variant='filled'
                            sx={{
                                m: 0.5,
                                p: 0.5,
                                backgroundColor:theme.palette.custom.main,
                                color: theme.palette.custom.fontColor,
                                fontWeight:'600',
                            }}
                            label={label}
                        />
                    </ThemeProvider>
                ))
            }
        },
        {
            accessorKey: "date_submitted",
            header: "Date Submitted",

        },
        {
            accessorKey: "submittee",
            header: "Submittee",

        },
    ], []);

    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    } 

    return <div style={{display: 'flex', height:'100vh'}}>
        <DrawerMenu menuType={'reports'}/>
        <Stack width={'100vw'} overflow={'auto'}>
            <NavSetting/>
            <div className='mx-4'>
                <div className="label my-3">
                    <Stack direction={'row'}>
                        <div className="text-wrapper">Reports</div>
                        <Button
                            color='error'
                            sx={{border:'1px solid '+palette.bad}}
                            onClick={()=>setReportModalOpen(true)}
                        >
                            Submit a report
                        </Button>
                    </Stack>

                </div>
                <ITableV2 
                    columns={headCellsV2} 
                    data={reportsData} 
                    type={'reportTable'} 
                    extraActionsTable={{
                        initialState: { density: 'compact' },
                        enableRowSelection: true,
                        enableRowActions: true, 
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
                        
                        renderRowActionMenuItems:({row, table})=>{
                            const menuRow = row.original
                            return [
                            <MRT_ActionMenuItem
                                key={"resolve"}
                                label='Resolve'
                                table={table}
                                icon={<CheckIcon/>}
                                onClick={() => {
                                    if (confirm(`Do you want to resolve Report ID: ${menuRow.report_id}`)){
                                        console.log('resolve')
                                        // axios.post('/api/resolve/report', {reportId: menuRow.report_id})
                                        // .then(res => {
                                        //     fetchReport()
                                        //     handleSnackBarClick("success", "Successfully resolved the report")
                                        // }).catch(err =>{
                                        //     console.error("Error resolving: ", err)
                                        //     handleSnackBarClick("error", err.response.data || err.response)

                                        // })
                                    }else {
                                        console.log('not resolved')
                                    }
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"reject"}
                                label='Reject'
                                table={table}
                                icon={<CloseIcon/>}
                                onClick={() => {
                                    if (confirm(`Do you want yo reject Report ID: ${menuRow.report_id}`)){
                                        console.log('resolve')
                                        // axios.post('/api/reject/report', {reportId: menuRow.report_id})
                                        // .then(res => {
                                        //     fetchReport()
                                        //     handleSnackBarClick("success", "Successfully rejected the report")
                                        // }).catch(err =>{
                                        //     console.error("Error rejecting: ", err)
                                        //     handleSnackBarClick("error", err.response.data || err.response)

                                        // })
                                    }else {
                                        console.log('not rejected')
                                    }
                                }}
                            />
                        ]}
                    }}
                />
            </div>
        </Stack>
        <ReportModal
            open={reportModalOpen}
            setOpen={setReportModalOpen}
            permissionType={"admin"}
            toRefresh={true}
            fetchReport={fetchReport}
        />
        <SnackbarProvider maxSnack={2} autoHideDuration={2000}/>
    </div>;
}

export default Reports;