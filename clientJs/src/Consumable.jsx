/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Button, Grid2, Stack } from '@mui/material';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ITableV2 from './components/ITableV2';
import {handleErrorFetch,  } from './customMethods';
import {MRT_ActionMenuItem,} from 'material-react-table';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function Consumable() {
    const [consumData, setConsumData] = useState([]);
    const navigate = useNavigate()
    function createData(reference_id, stock_count){
        return {reference_id, stock_count}
    }

    useEffect(()=> {
        axios.get('/api/consum_comp').then( res => {
            const data = res.data
            console.log(data)
            const rows = data.map((cd) => createData( 
                cd.component_name,
                cd.stock_count
            ))
            setConsumData(rows)
            
        }).catch(err => handleErrorFetch(err, navigate))
    }, [navigate])
    const headCellsV2 = [
        {
            accessorKey: "reference_id",
            header: "Type",
            size:10,
        },
        {
            accessorKey: "stock_count",
            header: "Stock Count",
            size:10,
        },
    ]


    return <div style={{display: 'flex', height:'100vh'}}>
    <DrawerMenu menuType={'inventory'}/>
    <Stack width={'100vw'}>
        <NavSetting/>
        <div className='mx-4'>
            <div className="label">
                <div className="text-wrapper">Inventory</div>
            </div>
            <ITableV2 
                    columns={headCellsV2} 
                    data={consumData} 
                    type={'consumableTable'} 
                    extraActionsTable={{
                        initialState: { density: 'compact' },
                        enableRowSelection: true,
                        enableRowActions: true, 
                        positionActionsColumn:'last',
                        muiTableContainerProps: { sx: { maxHeight: '600px', minHeight:'600px' } },
                        renderRowActionMenuItems:({row, table})=>{
                            const menuRow = row.original
                            return [
                            <MRT_ActionMenuItem
                                key={"Delete"}
                                label='Delete'
                                table={table}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"edit"}
                                label='Edit'
                                table={table}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                        ]}
                    }}
                />
        </div>
    </Stack>
</div>;
}

export default Consumable;