/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
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
function Non_Consumable() {
    const [nonConsumData, setNonConsumData] = useState([]);
    function createData(component_id, reference_id, location, specs, flagged){
        return {component_id, reference_id, location, specs, flagged}
    }
    const navigate = useNavigate()
    useEffect(()=> {
        axios.get('/api/non_consum_comp').then( res => {
            const data = res.data
            const rows = data.map((ncd) => createData( 
                ncd.component_id,
                ncd.component_name,
                ncd.location,
                ncd.specs,
                ncd.flagged,
            ))
            setNonConsumData(rows)
            
        }).catch(err => handleErrorFetch(err, navigate))
    }, [navigate])
    const headCellsV2 = useMemo(() => [
        {
            accessorKey: "component_id",
            header: "Component ID",
            size:10,

        },
        {
            accessorKey: "reference_id",
            header: "Type",
            size:10,
        },
        {
            accessorKey: "location",
            header: "Location",
            size:10,
        },
        {
            accessorKey: "specs",
            header: "Specs",
            grow: true,
            size:200,
        },
        {
            accessorKey: "flagged",
            header: "Flag",
        },
    ], []);

    return <div style={{display: 'flex', height:'100vh'}}>
    <DrawerMenu menuType={'inventory'}/>
    <Stack width={'100vw'}>
        <NavSetting/>
        <div className='mx-4'>
            <div className="label">
                <div className="text-wrapper">Inventory</div>
            </div>
            {/* <ITable headCells={headCells} rows={nonConsumData} type='non_consumableTable'/> */}
            <ITableV2 
                    columns={headCellsV2} 
                    data={nonConsumData} 
                    type={'non_consumableTable'} 
                    extraActionsTable={{
                        initialState: { density: 'comfortable' },
                        enableRowSelection: true,
                        enableRowActions: true, 
                        positionActionsColumn:'last',
                        muiTableContainerProps: { sx: { maxHeight: '600px', minHeight:'600px' } },
                        renderRowActionMenuItems:({row, table})=>{
                            const menuRow = row.original
                            return [
                            <MRT_ActionMenuItem
                                key={"resolve"}
                                label='Resolve'
                                table={table}
                                icon={<CheckIcon/>}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"reject"}
                                label='Reject'
                                table={table}
                                icon={<CloseIcon/>}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />
                        ]}
                    }}
                />
        </div>
    </Stack>

</div>;
}

export default Non_Consumable;