/* eslint-disable no-unused-vars */
import { Button, Grid2, Stack } from '@mui/material';
import reports_data from './assets/reports_data.json'
import ITable from './components/ITable';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AddCircleIcon from '@mui/icons-material/AddCircle';function Reports() {
    function createData(report_id, room, computer_id, components, date_submitted, submittee, building, comment){
        return {report_id, room, computer_id, components, date_submitted, submittee, building, comment}
    }
    
    const rows = reports_data.rows.map((rd) => createData( 
        rd.report_id, 
        rd.room, 
        rd.computer_id,
        rd.components,
        rd.date_submitted,
        rd.submittee,
        rd.building,
        rd.comment
    ))
    const headCells = [
        {
            id: "report_id",
            numeric: false,
            disablePadding: true,
            label: "Report ID",
        },
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
            label: "Room - Bd",
        },
        {
            id: "components",
            numeric: false,
            disablePadding: false,
            label: "Reported Components",
        },
        {
            id: "date_submitted",
            numeric: false,
            disablePadding: true,
            label: "Date Submitted",
        },
        {
            id: "submittee",
            numeric: false,
            disablePadding: true,
            label: "Submittee",
        },

    ]
    return <div style={{display: 'flex', height:'100vh'}}>
        <DrawerMenu/>
        <Stack width={'100vw'}>
            <NavSetting/>
            <div className='mx-4'>
                <div className="label my-3">
                    <Stack direction={'row'}>
                        <div className="text-wrapper">Reports</div>
                        <Button 
                            startIcon={<DownloadForOfflineIcon/>}
                            variant='outlined'
                            color='primary'
                            sx={{ 
                                textTransform: 'none', 
                                borderRadius:'4px', 
                                fontSize:'14px', 
                                fontFamily: 'Inter, sans-serif',
                                borderWidth:'2px',
                                mx:1,
                            }}
                        >
                            Download
                        </Button>
                        <Button 
                            startIcon={<AddCircleIcon/>}
                            variant='outlined'
                            color='error'
                            sx={{ 
                                textTransform: 'none', 
                                borderRadius:'4px', 
                                fontSize:'14px', 
                                fontFamily: 'Inter, sans-serif',
                                borderWidth:'2px',
                                mx:1,
                            }}
                        >
                            Add Report
                        </Button>
                        
                    </Stack>

                </div>
                
                <ITable headCells={headCells} rows={rows} type='reportTable'/>
            </div>
        </Stack>

    </div>;
}

export default Reports;